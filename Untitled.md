Totally—you can make this **much simpler** with a single “omnivorous” agent + one tiny mapper. Here’s the lean pattern that works in Agent Builder even when tools have different input shapes.

# Minimal 3-node layout

1. **Agent (Planner/Executor)** — one LLM that decides _what tool to call next and with what args_.
    
2. **Universal Tool Proxy (Transformer)** — a tiny mapper that:
    
    - injects constants/secrets (e.g., `projectId`, `connectionString`)
        
    - normalizes the planner’s generic args into the exact schema the chosen MCP op expects.
        
3. **MCP Node** — executes the requested op.
    

You loop Agent → Proxy → MCP until the Agent declares `done: true`, then answer.

---

# 1) Agent (Planner/Executor)

**System instructions (drop-in):**

> You can call ANY MCP tool available. For each step, emit a JSON action with:
> 
> ```json
> { "op": "<mcp_tool_name>", "args": { ... }, "expect": "<what you need back>", "done": false }
> ```
> 
> Use Atlas for canonical order data; Gmail for recent updates/tracking. Prefer minimal projections and small limits. Stop when the user’s question is fully answered and return:
> 
> ```json
> { "done": true, "answer": { ...final structured result... } }
> ```
> 
> Never include secrets; the proxy will inject them.

**Agent output schema** (single schema for all steps):

```json
{
  "type": "object",
  "properties": {
    "op":   { "type": "string" },
    "args": { "type": "object" },
    "expect": { "type": "string" },
    "done": { "type": "boolean" },
    "answer": { "type": "object" }
  },
  "required": ["done"]
}
```

**Few-shot examples**

- **Connect to live DB (Atlas):**
    

```json
{ "op": "atlas-connect-cluster", "args": { "clusterName": "Cluster0" }, "expect": "connected", "done": false }
```

- **Find order by number:**
    

```json
{
  "op": "find",
  "args": {
    "database": "wavelink-web-portal",
    "collection": "orders",
    "filter": { "orderNumber": "WL-783211-Q5RZ" },
    "projection": { "_id": 0, "orderNumber": 1, "email": 1, "orderStatus": 1, "paymentStatus": 1, "trackingNumber": 1, "trackingUrl": 1, "totalAmount": 1, "currency": 1, "updatedAt": 1 },
    "limit": 1
  },
  "expect": "order doc",
  "done": false
}
```

- **Gmail search for tracking (14d):**
    

```json
{
  "op": "search_email_ids",
  "args": { "query": "\"WL-783211-Q5RZ\" newer_than:14d", "max_results": 8 },
  "expect": "ids",
  "done": false
}
```

- **Finish:**
    

```json
{ "done": true, "answer": { "orderNumber": "WL-783211-Q5RZ", "status": "equipment_shipped", "trackingUrl": "https://…", "sources": ["atlas:orders","gmail:2"] } }
```

---

# 2) Universal Tool Proxy (Transformer)

**Input:** the Agent’s JSON.  
**Output:** exactly what the MCP node expects for the chosen `op`.

**Mapping logic (conceptual):**

- Read `input.op`.
    
- If it’s an **Atlas** op that requires `projectId`, add it:
    
    - `args.projectId = secrets.ATLAS_PROJECT_ID` (you set this secret once).
        
- If it’s the **generic Mongo `connect`** op, supply:
    
    - `args.connectionString = secrets.MONGODB_URI_RO`
        
- If it’s a DB `find/aggregate`, pass through as-is.
    
- If it’s Gmail: pass through `search_email_ids`/`batch_read_email` args.
    
- Return `{ tool: input.op, payload: args }` (whatever your MCP node’s input shape is; many builders let you bind `tool` and `payload` separately).
    

**Why this helps:** You don’t hard-wire separate mappers per tool. One proxy injects **projectId** or **connectionString** automatically and forwards everything else untouched.

> Secrets to add once in the builder:
> 
> - `ATLAS_PROJECT_ID = 68648903a7ba104152f97581`
>     
> - `MONGODB_URI_RO = <rotated read-only URI>`
>     

---

# 3) MCP Node

Configure it to accept `{toolName, args}` (or however your builder binds op/args). It runs the call and returns raw results.

Feed the MCP result back to the **Agent** so it can plan the next step or finish.

---

# Guardrails the single agent should enforce

- Default **env = live**; allow “sandbox” keyword to switch cluster: `Cluster0` vs `Sandbox`.
    
- Gmail `newer_than:14d` by default; max 90d unless user asks.
    
- Only reveal data for the matched identifier (order number, email, or full address).
    
- Cap result sets: orders (≤3), address search (≤5), emails read (≤8).
    

---

# What you gain

- **One agent** uses **all tools** dynamically—no spaghetti of edges.
    
- Only **one small transformer** that injects secrets and normalizes schemas.
    
- You keep the nice “agent can choose any tool” behavior you want.
    

If your builder requires the MCP node to have a fixed input schema, set the proxy’s **output schema** to a union-y shape like:

```json
{
  "type": "object",
  "properties": {
    "op": { "type": "string" },
    "args": { "type": "object" }
  },
  "required": ["op","args"]
}
```

…and bind `op` to the MCP tool name, `args` to its payload.

Want me to draft the exact Transformer mapping code for your builder (with env switch + regex escaping + tracking extraction hints)? I can write that now.