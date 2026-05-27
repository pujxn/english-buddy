# English Buddy — User Test Script
> For NGO staff / testers | Date: _____________ | Tester name: _____________

---

## Before You Start

**Requirements:**
- [ ] Google Chrome browser (not Safari, not Firefox)
- [ ] Headphones or speakers + a working microphone
- [ ] Open: `http://localhost:5173` (or the Vercel link if deployed)
- [ ] Speak naturally — don't rush, don't whisper

**How to use this script:**
- ✅ = working as expected
- ❌ = something went wrong — write what happened in the Notes column
- ⚠️ = partially working or unexpected behaviour

---

## Section 1 — Start Screen

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 1.1 | Open the app | A mic icon, "English Buddy" title, mode buttons (Free Talk / Interview / Workplace), a topic grid, accent buttons, and a "Start Practice" button | | |
| 1.2 | Tap **Interview** | The topic grid changes to show interview roles (Software Engineer, Customer Support, etc.) | | |
| 1.3 | Tap **Workplace** | The topic grid changes to workplace scenarios (Daily standup, Customer complaint, etc.) | | |
| 1.4 | Tap **Free Talk** | Topic grid returns to free talk topics | | |
| 1.5 | Tap a few different topics | The selected topic highlights in indigo/purple | | |
| 1.6 | Tap each accent button | Each one highlights when selected (Indian, American, British, Australian) | | |

---

## Section 2 — Starting a Session (Free Talk)

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 2.1 | Select **Free Talk** → **Introduce yourself** → **American** accent → tap **Start Practice** | Screen changes to the conversation view | | |
| 2.2 | Wait 3–5 seconds without doing anything | Maya's greeting message appears in the chat AND is spoken aloud | | |
| 2.3 | After Maya finishes speaking | The mic starts automatically (VoiceButton turns red and pulses) | | |
| 2.4 | Speak a short introduction: *"Hi, my name is [your name]. I am from [your city]."* | Your words appear as grey text in the chat while you speak | | |
| 2.5 | Stop speaking and pause for 2 seconds | The mic submits your speech, Maya starts thinking (animated dots appear) | | |
| 2.6 | Wait for Maya's reply | Maya's reply appears in the chat AND is spoken aloud | | |
| 2.7 | After Maya replies | A feedback card appears below the chat showing: a fluency score bar, and an overall comment | | |
| 2.8 | After Maya finishes speaking | The mic starts automatically again | | |

---

## Section 3 — Feedback Card

Run this after completing at least 2–3 conversation turns.

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 3.1 | Make a grammar mistake on purpose. Say: *"Yesterday I go to the market"* | Feedback card shows a grammar section with the mistake and a correction | | |
| 3.2 | Say something with a filler word: *"I um, basically like to read"* | Feedback card shows "um" or "basically" in the filler words section | | |
| 3.3 | Say a normal sentence correctly: *"I enjoy reading books in my free time"* | Grammar and vocabulary sections are empty or not shown — no false errors flagged | | |
| 3.4 | Say something off-topic or random: *"purple elephant dancing"* | Maya politely says she didn't understand and asks you to try again | | |
| 3.5 | Check filler word detection: say *"I like to read"* | "like" should NOT be flagged as a filler word | | |

---

## Section 4 — Voice & Audio

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 4.1 | While Maya is speaking, tap the mic button | Maya stops speaking immediately | | |
| 4.2 | Tap the mic button manually when it is idle | Mic activates (button turns red) | | |
| 4.3 | Tap the mic button again while it is red | Mic stops and submits what you said | | |
| 4.4 | Speak a long sentence without pausing | Live transcription keeps updating — mic does not cut off mid-sentence | | |
| 4.5 | Say nothing for 5 seconds after mic starts | Mic handles the silence gracefully (either waits or submits empty — no crash) | | |
| 4.6 | Switch accent to **British** via Back → change accent → Start again | Maya's voice noticeably sounds different | | |

---

## Section 5 — Assisted Mode (Script)

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 5.1 | Start a session, then tap **📖 Script** in the top-right corner | A card appears with the full script text for the selected topic | | |
| 5.2 | Read the script aloud | Script text is visible and readable | | |
| 5.3 | Tap **📖 Script** again | The script card disappears | | |
| 5.4 | Tap Back, choose a different topic, Start again, open Script | The script content matches the new topic | | |

---

## Section 6 — Interview Mode

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 6.1 | Go Back → select **Interview** → **Software Engineer** → Start | Maya introduces herself as an interviewer and asks you to introduce yourself | | |
| 6.2 | Answer: *"My name is [name] and I have two years of experience in software development"* | Maya asks a follow-up interview question | | |
| 6.3 | Answer 2–3 interview questions | Maya stays in interviewer character throughout | | |
| 6.4 | Try **Bank Officer** topic | Maya's first question is appropriate for a banking role (not a software role) | | |

---

## Section 7 — Workplace Mode

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 7.1 | Go Back → select **Workplace** → **Daily standup** → Start | Maya sets the scene as a standup meeting and asks for your update | | |
| 7.2 | Give your standup update | Maya responds as a colleague/manager would | | |
| 7.3 | Try **Customer complaint** topic | Maya plays an unhappy customer; you must respond professionally | | |
| 7.4 | Try **Explain a delay** topic | Maya plays a manager; you must explain why a project is late | | |

---

## Section 8 — Navigation & Edge Cases

| # | What to do | What you should see | Result | Notes |
|---|---|---|---|---|
| 8.1 | While Maya is speaking mid-sentence, tap **← Back** | Maya stops speaking immediately and the start screen appears | | |
| 8.2 | Start a session, have a full conversation, go Back, start again with a different topic | The new session starts fresh — no messages from the previous session carry over | | |
| 8.3 | Start a session and switch the topic mid-conversation using Back | New session starts with the correct new topic | | |

---

## Overall Impressions

After completing the tests, answer these:

**1. Did Maya sound like an encouraging coach or did she feel robotic/judgmental?**

_____________________________________________________________

**2. Was the feedback after each turn useful and accurate?**

_____________________________________________________________

**3. Which scenario felt most realistic and useful for students?**

_____________________________________________________________

**4. What was the most confusing or frustrating part of using the app?**

_____________________________________________________________

**5. Would a student be willing to use this for 10–15 minutes daily?**

_____________________________________________________________

**6. Anything missing that would make this significantly more useful?**

_____________________________________________________________

---

## Bugs Found

| # | Where | What happened | Reproducible? |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

*English Buddy — NGO pilot test | India | 2026*
