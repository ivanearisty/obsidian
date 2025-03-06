# Pricing Models
https://docs.stripe.com/products-prices/pricing-models
## One-off Payments
## Recurring Payments

### Customer Portal
https://dashboard.stripe.com/test/settings/billing/portal
https://billing.stripe.com/p/login/test_9AQg121oVgpm2o84gg
### Automations
https://dashboard.stripe.com/settings/billing/automations
## Invoicing
https://dashboard.stripe.com/test/invoices
https://invoice.stripe.com/i/acct_1QzVHaPU48Lk0PKL/test_YWNjdF8xUXpWSGFQVTQ4TGswUEtMLF9SdEtMYkV6Zm9adkloakQ3ZHNPM2JrWEUyZXA2bVJnLDEzMTc4MjUzNw0200hC3PUv1w?s=db
# Checkout
https://docs.stripe.com/payments/checkout
![[Screenshot 2025-03-06 at 1.10.40 AM.jpg]]
# Direct Payments (POC)
https://dashboard.stripe.com/test/payment-links

# Taxing
https://dashboard.stripe.com/test/tax/overview
# Invoicing
https://dashboard.stripe.com/test/invoices

# Next Steps
## Business Verification & Accounts Setup 
https://dashboard.stripe.com/profile/account/onboarding/business-structure
## Taxes
### Monitoring
https://docs.stripe.com/tax/monitoringz

## Dispute Protection
New Stripe accounts are vulnerable and can get permanently banned for one dispute. 

 - A dispute (or chargeback) occurs when your customer tells their bank they didn’t make/authorize the payment on your site.
- The payment amount along with a $15 dispute fee is deducted from your Stripe account.
- There is a dispute resolution process through which you have to prove the payment was valid. A dispute rate above 0.75% is punishable by Visa & MasterCard. Stripe will react before that. 
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