---
company: <% tp.user.prompt("Company name") %>
position: <% tp.file.title %>
applied_date: <% tp.date.now("YYYY-MM-DD") %>
status: Applied
priority: 2
source: <% tp.user.prompt("Where did you find this job? (e.g. LinkedIn, referral)") %>
notes: ""
---

# <% tp.file.title %>

**Company:** [[<% tp.frontmatter.company %>]]  
**Applied:** <% tp.frontmatter.applied_date %>  
**Source:** <% tp.frontmatter.source %>  
**Status:** <% tp.frontmatter.status %>  
**Priority:** <% tp.frontmatter.priority %>

---

## 🧩 Role Summary
- 

## 🗓️ Next Steps
- [ ] Submit resume
- [ ] Follow-up email
- [ ] Schedule interview

---

## 📝 Notes
- <% tp.user.prompt("Any immediate notes about this application?") %>
