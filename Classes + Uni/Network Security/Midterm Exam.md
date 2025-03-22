---
tags:
  - ns
---
# iae225

## Q1.1 Quantitative Risk
ACME Corporation recently perform a risk assessment and identified several risks.

- Risk 1: The server farm has a 40% chance of failing each year due to hardware malfunction. The replacement cost for the server, including labor and downtime losses, is estimated at $50,000 per incident.
- - Risk 2: There’s also a risk of a security breach, 50% probability every 24 months, which would leak sensitive client data and it is estimated that it would be $400,000 to secure the breach and repair the PR damage.

40% chance of failing eahc year
50,000 replacement cost

security breach 50% every 24 months -> 
400,000 to secure it

Single Loss Expectancy (**SLE**: Asset Value x Exposure Factor)
Annualized Rate of Occurrence (**ARO**: chance every year that there will be breach)
Annualized Loss Expectancy (**ALE**: SLE $\times$ ARO)
 
 1 - 0.5625 = 0.4375, or 43.75%

ACME is considering implementing a vulnerability management system to mitigate Risk 2. The system would have an initial cost of $200,000 and will require one full-time engineer to manage it (annual salary + benefits of $200,000/year). Given your calculations for Risk 2, would this be a good investment? Provide your rationale with clear supporting calculations. Explain why or why not.

The annualized loss expectancy is 100,000 if we just let things be.

If we hire the engineer and setup the system it's 200,000k to setup and 200k every year to maintain the engineer there.

We don't have to do much calculations since the cost of keeping the engineer is higher than the cost of the loss that we calculated above (the 100k)

## 2.1

sS means that w edo a tcp syn scan
-p just indicates the port 443

in a syn scan, the attacker sent a syn packet to the victim at 443 port and doesnt complete the handshake

since we determined that the port is closed, it means we got a rst/ack  (reset) from the victim.

## 2.2

sU is the udp flag

This happens in a udp scan when we get no response. 

Since udp doesn't really confirm things like tcp does, the port could be filtered or improperly formatted package.

Nmap characterizes this as you don't know, so it says that it's "OPEN FILTERED" 

## 2.3
This could be a tcp syn scan trying to be performed on the server by an attacker, since no connections being established is what nmap sS does. But i could also be some sort of attack trying to flood the 

## Q4
### A
Alice is the client
Bob is server


### B 
It would definitely be useful since, if alice is taken down, trudy can now pretend to be alice and respond in her behalf.

### C
Trudy can continue guessing forever I think, it's just a matter of how hard it is to be guessing the seq and ack numbers.
The difficulty in this instance does not come from the fact that you can get "banned" from the server.
It comes from the fact that it's nearly impossible to actually guess those numbers (seq ack) right if you cannot see the packets
