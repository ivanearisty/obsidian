## June: Infrastructure & Core APIs

1. **GCP Setup**

   * **Backend Containerization**

     * Dockerize Spring Boot service and deploy to **Cloud Run** (autoscaling, IAM restrictions).
   * **Database Provisioning**

     * Create **Cloud SQL (Postgres)** dev/staging instances.
     * Define initial schema: Users, Profiles, Events, Bonds, Event\_Attendance.
     * Enable automated backups and a staging read replica.
   * **AI Scoring Function**

     * Build a **Cloud Function** to compute “similarity scores” between two users via AI API.
     * Secure it with service-to-service IAM roles.

2. **Backend APIs**

   * **Auth & User Management**

     * Implement JWT/OAuth2 signup, login, and “Profile as Moodboard” CRUD.
   * **Event Endpoints**

     * Create REST APIs for event: Create, List/Filter, Join/Leave, Details.
     * Enforce capacity limits and subscription-tier rules (e.g., 3 free events/month for Basic).
   * **Bonding Logic**

     * On attendance confirmation, trigger a bonding record and notify mutual friends.
     * Expose endpoint: `GET /users/{A}/compare/{B}` → `{score, mutual_friends}`.

3. **Analytics & Billing Prep**

   * **Logging & Metrics**

     * Enable Cloud Logging for key events (e.g., “event\_created,” “event\_joined”).
     * Stream sanitized data to BigQuery for usage analysis.
   * **Subscription Model Draft**

     * Define Basic (\$15/mo), City Explorer (\$20/mo), Global (\$25/mo) tiers.
     * Integrate Stripe (test mode) for handling payments.

---

## July: Mobile Alpha & Backend Completion

1. **iOS App Basic Build**

   * **UI Designs** (Figma/Sketch) for:

     * Home/Event Feed
     * Profile/Moodboard
     * Event Detail/Join
     * Bonding Feed & Notifications
   * **TestFlight Alpha**

     * Enable feature flags for “Events.”
     * Release internal build (Signup/Login, Profile, mock Event Feed) by mid-July.

2. **Backend Finalization & Staging**

   * **Complete Event APIs** & deploy to staging.
   * **Integrate AI Scoring**: ensure Cloud Function is called when two attendees join an event.
   * **QA & Testing**

     * Unit/integration tests for all new endpoints.
     * Staging load test: simulate multiple users joining events and verify bonding records.

3. **Stripe & Tier Enforcement**

   * **In-App Purchase Flow**

     * Integrate Stripe iOS SDK; handle subscription upgrades.
     * Webhooks for subscription events.
   * **Backend Logic**

     * Enforce Basic-tier limits (3 free events/month); prompt upgrade for overages.
     * Test with sandbox accounts.

4. **External Beta Preparation**

   * **Beta TestFlight Group** (\~100 users) by late July.
   * **Feature Testing**: allow real event creation/join; collect UX feedback via a Google Form.
   * **Monitoring Setup**: dashboards for API latency, function execution, Cloud SQL performance.

---

## August: Polish, Recommendations & GTM Prep

1. **UI/UX Refinements**

   * **Triaging Feedback** from beta: fix UI bugs, improve Event sorting, refine Bonding Feed (tagging, captions).
   * **Finish Remaining Screens**: Settings/Profile, Notifications Center, Referral Flow.

2. **Recommendation Engine**

   * Build `/recommendations/events` endpoint ranking events by:

     1. Mutual-connection strength (AI score)
     2. Recency
     3. Tier eligibility
   * **Performance Testing**: simulate 1,000 concurrent users; monitor Cloud Run, Cloud SQL, and Function scaling.

3. **GTM & Marketing Assets**

   * **Content Production**: finalize “Share Your Close Friends” TikTok hooks and social assets.
   * **App Store Prep**: write descriptions, capture screenshots, and record a short demo video.
   * **Partnership Onboarding**: sign at least two venues to co-host official WeBond events.

4. **Launch Readiness Checklist**

   * Verify App Store metadata, privacy policy, and compliance with user-generated content guidelines.
   * Plan countdown email drip to 250-user waitlist.

---

## Early September: v1 Launch & Stabilization

1. **Release v1**

   * **Final Testing**: smoke test all flows (signup, subscription, event creation/join, bonding posts, notifications).
   * **App Store Submission**:

     * iOS: TestFlight → App Store Connect.
     * Android: Internal → Production track.
   * **NYC Launch Event**: in-person gathering (≈400 guests) integrated as a live “Launch Party” event in-app.

     * Encourage on-the-spot event joining and bonding photo posts.
     * Promote via “#WeBondLaunch” social campaign.

2. **Post-Launch Monitoring & Feedback**

   * **Production Alerts**:

     * HTTP 5xx rate >1% triggers alert.
     * Cloud SQL CPU >70% over 5 min.
     * Cloud Function error rate >2%.
   * **User Feedback**: in-app survey for first 1,000 users; crash logs via Crashlytics and Xcode Organizer.
   * **v1.1 Backlog**:

     1. Direct Messaging between bonded users
     2. Enhanced Event Discovery (geofencing, filters)
     3. Localization (Spanish, French, Mandarin)
     4. Paid Events & Ticketing support

3. **Retention & Growth**

   * **Referral Program**: “Refer 5 friends → 1 month free.”
   * **Paid Ads**: Instagram/TikTok campaigns in launch cities (NYC, Miami, Boston).
   * **Push & Email Campaigns**:

     * Push: “Your friend Maya joined an event nearby—check it out!”
     * Email drip: “Congrats on your first bond—rate the app and share.”

---

### Notes on Alignment

* **Brand & Mission**:

  * Events gated by at least one mutual connection, reinforcing “serendipity” and trust (Brand Manual).
  * Prioritized “Profile as Moodboard,” Event Feed, Bonding Feed per Pitch Deck feature set.

* **Subscription Logic**:

  * Early Stripe integration and tier enforcement (Basic vs. City Explorer/Global) match the business model PDF.

* **GTM Sequence**:

  * Compressed “Build Awareness” (internal alpha), “Beta Rollout” (late July), and “NYC Launch” (early September) to hit launch goals.

* **Marketing & Partnerships**:

  * Social strategy (TikTok hooks, partnership venues) scheduled in August to feed into launch momentum.

This concise roadmap ensures clear milestones—GCP infrastructure, backend APIs, iOS alpha/beta testing, recommendation engine, and a coordinated launch—while maintaining alignment with your existing documents and an early-September v1 goal.
