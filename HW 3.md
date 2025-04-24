To find highest version of TLS offered by the client:
```
extensions:supported versions
```

To find chosen version of TLS by the server:
Server Hello -> Version in handshake protocol 

Common name = SNI (like domain)

Certificates:
![[Screenshot 2025-04-24 at 2.44.05 PM.png]]

- The **first** certificate listed is intermediary
- The **second** certificate listed is root CA certificate

Why is the “Finished” message missing?
	Because the finished message is encrypted

