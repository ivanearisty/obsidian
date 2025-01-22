Basing us off of:
https://supabase.com/docs/guides/platform/org-based-billing
https://supabase.com/pricing

And assuming **50,000 users.**
### Data Transfer

Assume each user sends/receives about 200KB per request
50,000 users × 200KB/request × 10 requests = 1GB
30GB < 250
**No additional Costs**

### Database Size

Assume 10MB of data per user (e.g., posts, metadata, etc.)
Total storage: 75,000 MAUs × 10MB = 750GB

We're over...

Only 8GB is included, so 742GB → $0.125/GB × 742GB = $92.75/month

### Storage Size

Assume each user uploads 2 images/day, averaging 500KB per image

Total daily image storage: 50,000 users × 2 images × 500KB = 50GB.

So we're looking at 50GB/day × 30 days = 1,500 GB -> 1,500 GB x 0.021 = $31.5/month

### Functions

Assume each user generates 10 API requests/day → Includes invocations for auth, posts, etc.

Total daily invocations: 50,000 users × 10 = 500,000.
Monthly invocations: 500,000/day × 30 days = 15 million.

2 million invocations included in Pro plan.
Additional 13 million → $2/million × 13 million = $26/month.

