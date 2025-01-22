
# Infrastructure

## Cost Breakdown

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

Total daily image storage: 50,000 users × 2 images × 500KB = 50GB

So we're looking at 50GB/day × 30 days = 1,500 GB -> 1,500 GB x 0.021 = $31.5/month

### Functions

Assume each user generates 10 API requests/day → Includes invocations for auth, posts, etc.

Total daily invocations: 50,000 users × 10 = 500,000
Monthly invocations: 500,000/day × 30 days = 15 million

2 million invocations included in Pro plan.
Additional 13 million → $2/million × 13 million = $26/month

### CDN and Edge Network

Average of 200KB per image
Monthly Total Requests: 250,000×30=7.5 million
Total Monthly Data Transfer: 250,000 × 200KB x 30 days = 1.5TB
Cache Hit Ratio: 80% (aka 20% of requests bypass the cache and go to Supabase)
- Cached Data: 80% of 1.5TB = 1.2TB
- Non-Cached Data: 20% of 1.5TB = 300GB

Cloudlfare CDN = $26/month
AWS = $106.50/month
Fastly = $148.50/month

Supabase Egress:
300GB - 250GB = 50GB x 0.09 = $4.50/month

### Realtime Messaging

| **Plan**      | **Included Messages** | **Extra Messages** | **Cost for Extra Messages** | **Total Cost** |
| ------------- | --------------------- | ------------------ | --------------------------- | -------------- |
| **Free Plan** | 2M                    | 15M−2M=13M         | 13M/1M x $2.50 = $32.50     | **$32.50**     |
| **Pro Plan**  | 5M                    | 15M−5M=10M         | 10M/1M x $2.50 = $25.00     | **$25.00**     |

| **Plan**      | **Included Connections** | **Extra Connections** | **Cost for Extra Connections** | **Total Cost** |
| ------------- | ------------------------ | --------------------- | ------------------------------ | -------------- |
| **Free Plan** | 200                      | 2,500−200=2,300       | 2.3 x $10 = $23.00             | **$23.00**     |
| **Pro Plan**  | 500                      | 2,500−500=2,000       | 2.0 x $10 = $20.00             | **$20.00**     |

Pro will be about ~45 Monthly

### Apple Developer Organization Cost

299/year

## Total 

246.25/month

# Security

$5,000–$15,000 for a comprehensive security review depending on our pockets.

# Maintance

Developer costs

# Design UI/UX

$3,000-$5,000 is what my friend told me he would charge us for the entire thing. Of course, it's hourly at aroun 70-ish dollars, but those hours rack up fast.