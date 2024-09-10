---
tags:
  - Leap
cssclasses:
---
Hello Rahul — I hope you are doing well,

Looping in additional members from our tech team to this thread... They will share more details on what to cover. 
\
For now, the main subjects I would like to cover are the DOM and DMLD. Specifically, we did not have time to view the B2C Selfcare, and I also want to understand the order management capabilities as well as how it could connect to external systems.

Regarding the DMLD:
- Overview of the B2B, B2B2C, and B2C configurations.
- What level of customization is available for branding the platform to fit our company’s identity?
- What level of customization is available for modifying the platform's modules to our specific needs? Could we add additional components, and, if so, what framework was used to build it?
- What APIs are available for integrating the DMLD platform with existing systems within the Tecnotree solution and external (e.g., ERP, CRM, Self Hosted AI Chatbots)
- What security protocols and measures are implemented to protect sensitive customer data?
- Is there built-in fraud protection, whether it be within this platform or somewhere else?
- What are the benchmarks for processing times and uptime?
- How does the platform scale to support increasing volumes of transactions and users (deployment infra)?
- Can we go over data analytics and reporting for this platform?
- How does this solution fit within the deployment models discussed in the previous call?
- Finally, from a purely technical perspective:
	- Can you help me understand how you represent the different Objects that interact with this platform within your systems? 
	- What would the DTO for an external module accessing this platform look like, and how flexible are these DTOs in handling additional custom fields or business logic? 
	- How do you handle user authentication and login flows within the platform? Is it password-based only, or does the platform support OAuth or other social login methods?
	- How do you manage the user sign-up process and capture the necessary data? Is it within this platform or somewhere else? And, can we create new users via API?
	- How do you handle account deletion from both a user experience and compliance perspective?
	- How do you handle session management, especially for long-running sessions? Are there token-based mechanisms (e.g., JWTs) in place for session handling, and how are these tokens managed for security (e.g., expiration, refresh tokens)?
	- Can you elaborate on how the platform interacts with external modules via APIs? What kind of request and response structure do you follow, and what authentication mechanisms are in place for secure API access?

Regarding the DOM:
- What are the core functionalities and how does the DOM system integrate with the broader ecosystem?
- How customizable is the user interface for both internal users (e.g., customer service reps, admin) and external customers?
- Are external customers (e.g. Online Potential Customers) supposed to interact with this system, or **can/do** we communicate with the order manager through API to achieve this end?
- How does it handle order orchestration and fulfillment? 
- Can we go through an example order workflow?
- What integration capabilities are provided to interact with existing systems (e.g., CRM, billing, fulfillment systems), and particularly, payment processing (innate handling of Apple/Google Pay + PayPal or de we need a payment processor)?
- How does this solution connect with the DMLD, I am assuming that after placing an order we instantiate the new user and forward to the DMLD. 
- The same security compliance, scalability, analytics/reporting, and deployment questions as above...

Finally, and this is much more general:
1. How do you handle multi-language needs and accessibility in all your solutions?
2. Can you give us a run-through of the Digital Architecture presented in slide 8 of the Digital BSS Presentation shared on August 21st?
3. Regarding your standards for all solutions, it is my belief that you've adopted TM Forum's open APIs within all areas of your system. Any additional literature you can provide about how you conform with these standards would be appreciated.

Thank you for your help. Let me know if you need anything else from me.

Cordially,
Ivan