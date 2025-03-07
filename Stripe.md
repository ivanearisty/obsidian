---
theme: night
highlightTheme: monokai
---
%% 
- Look into limit on product catalogue
- Find out proper catalogue etiquette from stripe
- Tax jar integrated by Stripe helps you do all fifty states
- Should we limit Stripe visibility into product catalogue? Can this be done? Concern over security on manipulating product catalogue.
- Look about account provisioning in Stripe
- Likely not need Form -> Jira if we can get this out by next week 
- Including customer care info
- Look into dynamic pricing through stripe
- Blocking shipping based on zip
- Add checkbox to order flow (checkbox) input email so it is sent to their email
- make bruce admin on goog
%%

# Current Tests

%% ## Webhooks
Stripe will send these events to your destination. 

You can use these events to create your own workflows or to update your local database.

stripe listen --forward-to localhost:3000/api/webhook/stripe
> Ready! You are using Stripe API Version [2025-02-24.acacia].  %%

---

## Captured Data
```json
{
  "id": "ppage_1QzYOQPU48Lk0PKLI9Vkm6b2",
  ...,
  "customer": {
    "id": "cus_RtL5MZntbrw8MK",
    "address": {
      "country": "US",
      "postal_code": "11747",
      ...
    },
    "email": "ivanearisty@gmail.com"
  },
  "customer_email": "ivanearisty@gmail.com",
  ...,
  "line_item_group": {
    "line_items": [
      {
        "id": "li_1QzYOQPU48Lk0PKLAOrFBm4K",
        "description": "Test for MiFi Mobile Router",
        "price": {
          "id": "price_1QzXbqPU48Lk0PKLsc9GCi8O",
          "currency": "usd",
          "unit_amount": 100,
          "product": {
            "id": "prod_RtKGAuBhJ8ypBc",
            "name": "MiFi — WaveLink Mobile Router (test)",
            "description": "Test for MiFi Mobile Router"
          }
        },
        "quantity": 1,
        "total": 100
      }
    ],
    "subtotal": 100,
    "total": 100
  },
  ...,
  "payment_intent": {
    "id": "pi_3QzYPFPU48Lk0PKL2eT3pQCB",
    "amount": 100,
    "created": 1741244385,
    "payment_method": "pm_1QzYPZPU48Lk0PKLY71yhZtR",
    "payment_method_types": [
      "card"
    ],
    "status": "succeeded"
  },
  "payment_status": "paid",
  ...
}

```


---

## Checkout


[docs](https://docs.stripe.com/payments/checkout)


![[Screenshot 2025-03-06 at 1.10.40 AM.jpg | 500]]

---

# API or Manual

---

[Documentation Link](https://docs.stripe.com/products-prices/pricing-models?dashboard-or-api=api) (Managed by Engineering)

[Product Catalogue](https://dashboard.stripe.com/products) (Managed by Product)

---

# Internal Pricing

---

<grid drag="100 10" drop="center"  flow="row" pad="20px" align="center" >
<grid flow="col"  align="top" pad="10px" >
## Basic Plan
- 2.9% + 30 cents
</grid>
<grid flow="col" align="top" pad="10px">
	## Custom Plans
	- IC+ pricing
	- Volume discounts
	- Multi-product discounts
</grid>
</grid>

---

# External Pricing

---

## One-off Payments


---

## Recurring Payments

- recurring billing cycles with trials & proration
- tiered pricing and **usage-based** options available (can be very useful for MiFi)


[docs](https://docs.stripe.com/products-prices/pricing-models)

---

### Customer Portal

[Dashboard](https://dashboard.stripe.com/test/settings/billing/portal)

[Portal Example](https://billing.stripe.com/p/login/test_9AQg121oVgpm2o84gg)

Pros and Cons...
### Automations

[Automation](https://dashboard.stripe.com/settings/billing/automations) --> Business rules for when payments fail.

---

## Invoicing

- Automated invoice generation via whs
- Customizable templates
- Supports one-off, partial, and recurring
- CRM syncs with jobs

[Dashboard](https://dashboard.stripe.com/test/invoices)

[Invoice Example](https://invoice.stripe.com/i/acct_1QzVHaPU48Lk0PKL/test_YWNjdF8xUXpWSGFQVTQ4TGswUEtMLF9SdEtMYkV6Zm9adkloakQ3ZHNPM2JrWEUyZXA2bVJnLDEzMTc4MjUzNw0200hC3PUv1w?s=db)


---

## Direct Payments (POC)

https://dashboard.stripe.com/test/payment-links


---

# Next Steps

---

## Business Verification & Accounts Setup 

[Onboarding](https://dashboard.stripe.com/profile/account/onboarding/business-structure)

---
## Taxes

- Need verified account for tests

[Dashboard](https://dashboard.stripe.com/test/tax/overview)

[Monitoring](https://docs.stripe.com/tax/monitoring)

---

## Dashboard / Mgmt

- Manage Subscription
- Jira connection
- 

---

# Disputes

---

**New Stripe accounts are vulnerable and can get permanently banned for one dispute.** 

 - A dispute (or chargeback) occurs when your customer tells their bank they didn’t make/authorize the payment.
- The payment amount along with a $15 dispute fee is deducted from account.
- There is a dispute resolution process through which we have to prove the payment was valid. A dispute rate above 0.75% is punishable by Visa & MasterCard. Stripe will react before that. 

---

### Policies
- Refund Policies Clearly Stated 
- Guarantees Clearly Stated
- [3DS](https://docs.stripe.com/payments/3d-secure)
- Block if CVC fails?
	- The default Stripe configuration allowed anyone with a card number to pay on a Stripe Checkout, even without the correct CVC.
- Refund links on checkout + portal

---

## Pre-Service Reqs

1. **Client Agreement**  
   - Ensure the client has signed an agreement **before** granting any logins or access to services.


2. **Payment Plan + Access Confirmation**  
   - Always confirm the payment schedule and access details in writing (email is preferred).  
    
---

## Early Engagement

3. **48-Hour Check-In**  

> "How is everything going with your program so far? Please let us know if you have any concerns or need any assistance."

4. **Educate Team**  
   - Relevant articles (e.g., [Stripe Dispute Article](#)).

---

## Document Mgmt

5. **Create a Folder for Proof** (critical files)
     1. Files Stripe specifically requests  
     2. Signed agreements (essential)  
     3. Preferably written text evidence rather than audio/video  
     4. Store all proof in structured documents (instead of scattered screenshots)  
     5. Avoid uploading too many files—keep it easy to review

---

## Dispute Prep

6. **Sub-Folder for Sales & Delivery Proof**  
   - Have Sales & Delivery teams record 1-on-1 conversations and store them in a dedicated sub-folder.

7. **Dispute File Preparation**  
   - Base your dispute files on the dispute type.  
   - Pre-make templates.

---

## Post-Dispute Steps

8. **Maintain Access**  
   - **Do NOT** revoke clients’ access during a dispute.  

9. **Post-Dispute Documentation**  
   - If you **win** a chargeback, store all relevant documentation in Knowledge Base.  
   - This allows us to reference successful dispute strategies for future cases.

---

## Messaging Flows

<grid flow="row" align="left" >
<grid >
> "Hi [Client], I noticed you initiated a chargeback, and I’m surprised we didn’t have a chance to discuss this beforehand....
</grid>

<grid flow="col" >
Use empathetic yet firm communication to invite dialogue.  

Attempt to resolve the dispute amicably before escalating through official channels.
</grid>
</grid> 