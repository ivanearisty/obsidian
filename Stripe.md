---
theme: night
highlightTheme: monokai
---

# Current Tests

---

## Webhooks
Stripe will send these events to your destination. 

You can use these events to create your own workflows or to update your local database.

stripe listen --forward-to localhost:3000/api/webhook/stripe
> Ready! You are using Stripe API Version [2025-02-24.acacia]. 

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



---

## Recurring Payments

- recurring billing cycles with trials & proration
- tiered pricing and **usage-based** options available (can be very useful for MiFi)


[docs](https://docs.stripe.com/products-prices/pricing-models)

---

### Customer Portal
https://dashboard.stripe.com/test/settings/billing/portal
https://billing.stripe.com/p/login/test_9AQg121oVgpm2o84gg
### Automations
https://dashboard.stripe.com/settings/billing/automations

---

## Invoicing

- Automated invoice generation via whs
- Customizable templates
- Supports one-off, partial, and recurring
- CRM syncs with jobs

[Dashboard](https://dashboard.stripe.com/test/invoices)

[Invoice Example](https://invoice.stripe.com/i/acct_1QzVHaPU48Lk0PKL/test_YWNjdF8xUXpWSGFQVTQ4TGswUEtMLF9SdEtMYkV6Zm9adkloakQ3ZHNPM2JrWEUyZXA2bVJnLDEzMTc4MjUzNw0200hC3PUv1w?s=db)

---

## Checkout
https://docs.stripe.com/payments/checkout
![[Screenshot 2025-03-06 at 1.10.40 AM.jpg]]

---

## Direct Payments (POC)

https://dashboard.stripe.com/test/payment-links

---

# Taxing
https://dashboard.stripe.com/test/tax/overview
# Invoicing
https://dashboard.stripe.com/test/invoices

---

# Next Steps

---

## Business Verification & Accounts Setup 

[Onboarding](https://dashboard.stripe.com/profile/account/onboarding/business-structure)

---
## Taxes

- Need verified account for tests

[Monitoring](https://docs.stripe.com/tax/monitoring)

---

## Dispute Protection

---

**New Stripe accounts are vulnerable and can get permanently banned for one dispute.** 

<grid align="center" ">

</grid>
 - A dispute (or chargeback) occurs when your customer tells their bank they didn’t make/authorize the payment.
- The payment amount along with a $15 dispute fee is deducted from account.
- There is a dispute resolution process through which we have to prove the payment was valid. A dispute rate above 0.75% is punishable by Visa & MasterCard. Stripe will react before that. 

---

### Policies
- Refund Policies Clearly Stated 
- Guarantees Clearly Stated
- 3DS https://docs.stripe.com/payments/3d-secure
- Block if CVC fails
	- The default Stripe configuration allowed anyone with a card number to pay on a Stripe Checkout, even without the correct CVC.
- Refund links
	- ![[Pasted image 20250306013413.png]]
- 
### Pre-Refund
### Fraud Radar
### Contact-Us Forms
### Timelines (24HR Dispute Flows)
Before
![[Screenshot 2025-03-06 at 1.29.30 AM.jpg]]
After
![[Screenshot 2025-03-06 at 1.29.46 AM.jpg]]
![[Screenshot 2025-03-06 at 1.30.08 AM.jpg]]![[Screenshot 2025-03-06 at 1.30.36 AM.jpg]]