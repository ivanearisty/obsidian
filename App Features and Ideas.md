# Start

This memo outlines our current features and, more importantly, the strategic thinking behind them. 

## Tests

1.  **Dev Tests (Functionality):** Does the feature work? Is it bug-free? This is the baseline for quality.
2.  **UI/UX Tests (Feel):** How does the app look and feel? We learn this by observing how people actually use it, identifying points of friction in the process.
3.  **Value Tests (The Why):** This is the most important test. Does this feature actually solve a real problem for our users? Is it valuable enough to bring them back day after day?

On that last point; my biggest thing right now is a fear that we haven't quite figured out our "secret sauce." We have cool features that add value, but for a social network to succeed, it needs a pattern that consistently provides value and keeps the app top-of-mind. *Habits*. Think streaks on snap or the BeReal moment.

I'm trying to figure out if we've already found something that will reliably provide that value and get us daily returning users, or if we need to keep searching for it. It's an interesting and uncertain spot to be in, but I'm betting we'll find the answers.

With that in mind, here is a breakdown of our current features:
## Core Features & Their Purpose

### 1. Home
*   **What it is:** A personalized dashboard showing upcoming activities, new "moments" from b0nds, and tailored recommendations for events and people.
*   **Why we have it:** This is our first and best chance to hook a user in each session. It immediately answers the question, "What's new and relevant to me and my circle?" and serves as a launchpad for deeper engagement.

### 2. Web0nd (Activities Feed)
*   **What it is:** The central discovery hub where users can browse, join, and manage participation in events created by the community.
*   **Why we have it:** This is the core utility of our app, solving the "what should I do?" problem. Unlike public event listings, our feed is built on trust. By showing mutual connections, we make discovery feel safer and more relevant, driving online connections into real-world interactions.

### 3. B0nd (Moments) Feed
*   **What it is:** An immersive, visual feed for sharing experiences, primarily created after users make a new "b0nd" or attend an activity together.
*   **Why we have it:** This is the emotional payoff. If the Activities Feed is about planning the future, the Moments Feed is about celebrating the past. It creates a powerful positive feedback loop: attend an activity -> make a b0nd -> share a moment -> get validation -> want more activities. This is a strong contender for our "secret sauce."

### 4. Chat
*   **What it is:** A messaging system for both one-on-one conversations and activity-specific group chats.
*   **Why we have it:** This is the logistical backbone of our platform. Automatically creating group chats for activities is a key differentiator that keeps coordination within our ecosystem.

### 5. Create
*   **What it is:** The simple, streamlined interface for users to create their own activities and post their own moments.
*   **Why we have it:** Currently, this feels like the engine of our ecosystem. The goal is maximum simplicity to make it frictionless for a user to turn an idea into a real-world event. Biggest question is: *Users will attend events, we know this; however, we don't know if they will proactively make them.*

### 6. Account & Profile
*   **What it is:** The user's digital identity, activity history, and settings hub, with distinct "public preview" and "bonded" views.
*   **Why we have it:** Duh.

### 7. Daily Prompt
*   **What it is:** A single, engaging question posed to users each day.
*   **Why we have it:** This is a direct attempt at creating a daily return habit. It's a low-friction way to increase engagement and gather unique data. Our strategic question here is about the content: should we ask deep, insightful questions, or fun, lighthearted ones like "What meme defines you?" to shape our algorithm?

## Algorithm Rethink

Our initial plan for personalization was to build a complex, three-axis algorithm based on:
1.  **Demographics:** Age, location, etc.
2.  **Social Characteristics:** Stated interests like sports, hobbies, etc.
3.  **Psychographics:** Data gathered from the Daily Prompt to create a more holistic user profile.

However, we are now considering a pivot. Instead of relying solely on an automated algorithm, we are exploring a more **human-driven, network-centric approach**. This means building features that empower users to be the matchmakers themselves, which aligns more closely with our core mission of trusted, real-world connections. This could look like a system that simply notifies you, *"Your friend Mona is traveling to NYC next week. You should introduce her to your friend Paul."* This approach prioritizes genuine social intelligence over machine intelligence.

## Other Ideas

Abstract ideas we're exploring. We need to test if any of these can become our "secret sauce."

### 1. Hotspots (Replaces Atlas)
*   **What it is:** A community-curated insider guide. Instead of a generic map, Hotspots would feature popular venues (cafes, bars, clubs, restaurants, etc...) that are trending within a user's extended network. Users could leave reviews and see which "b0nds" or "b0nds-of-b0nds" have recommended a place.
*   **Why we have it:** It solves the "where should we go?" problem with a powerful layer of social trust. It moves beyond simple check-ins to create a dynamic, word-of-mouth guide to a city, making discovery feel like getting a recommendation from a friend.

### 2. Matchmaker
*   **What it is:** A feature that allows a user to suggest a connection between two of their existing b0nds. For example, User A could send a private "You two should meet" notification to User B and User C, with a short note on why.
*   **Why we have it:** This operationalizes real-world networking. It leverages the social intelligence of our users and makes introductions feel personal and trusted, rather than random or algorithmic.

### 3. Proactive City & Likeness Notifications
*   **What it is:** An intelligent notification system that identifies serendipitous opportunities. It would trigger notifications for events like: "Your b0nd, Sarah, is visiting your city next week," or "Paul, a friend of Sarah's, is also in your city and shares your interest in vintage photography. Would you like an introduction?"
*   **Why we have it:** This makes the app feel like a proactive social assistant. It creates opportunities for connection that users would otherwise miss, providing immense and unexpected value.

### 4. Moments Feed Rethink

*   **Idea A: Expanded Moments**
    *   **What:** Loosening the rules to allow users to post any moment from their life, not just post-b0nding events, creating a "close friends TikTok" experience.
    *   **Why:** This could dramatically increase the volume of content and the reasons to open the app daily, broadening our use case.

*   **Idea A++: Co-Authored Moments**
    *   **What:** Everything in A, but making the rules *stricter* by requiring every moment to be co-authored by the two people who were there. Both must approve the post for it to go live.
    *   **Why:** This doubles down on our core mission. It makes every single post a verified testament to a real-world interaction, ensuring the feed is 100% about shared experiences. It's a high-friction, high-value proposition that no one else is doing. 

### 5. Birthdays and Other Reminders
- **What it is:** A notification system and dedicated section that alerts users to the birthdays of their "b0nds" and reminds them of their upcoming activities.
- **Why we have it:** To provide timely and actionable social prompts that drive engagement.