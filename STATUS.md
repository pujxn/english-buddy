# English Buddy — Project Status
> Last updated: 2026-04-27

---

## What's Been Built

### ✅ Phase 1 — Voice Engine
- **`useSpeechInput.js`** — Captures mic input via Web Speech API. Shows live transcription as the student speaks (interim results). Calls `onFinalResult(text)` automatically when the student pauses.
- **`useSpeechOutput.js`** — Speaks text aloud via Speech Synthesis API. Selects the best available voice per accent. Normalises punctuation (`!`, `,`, `;`, `-`, etc.) before speaking to prevent Chrome's mid-utterance stutter bug.
- **`VoiceButton.jsx`** — Large tap target with three states: idle / listening (pulsing red) / disabled (when Maya is speaking or thinking).

### ✅ Phase 2 — AI Conversation
- **`claudeService.js`** — Calls Groq API (llama-3.1-8b-instant, free tier). OpenAI-compatible format. Uses `response_format: { type: 'json_object' }` for guaranteed JSON output. Key in `VITE_GROQ_API_KEY`.
- **`useConversation.js`** — Manages full message history, sends to Groq, returns `{ reply, feedback }`. Has `sendMessage()` for student turns and `kickoff()` for Maya's opening greeting.
- **`ConversationView.jsx`** — Chat UI. User messages right (indigo), Maya messages left (slate). Shows live transcription while user speaks, animated loading dots while Maya thinks.
- **Auto voice loop** — After Maya finishes speaking, mic starts automatically. Hands-free conversation flow.
- **Start screen** — Scenario + accent picker before the session begins. "Start Practice" button triggers the kickoff.
- **Back button** — Returns to start screen from conversation screen.

### ✅ Phase 3 — Feedback Engine
- **`FeedbackCard.jsx`** — Shows after each student turn: fluency score bar, grammar issue + corrected version (strikethrough → green), vocabulary suggestion with example, filler word badges, overall encouraging note.
- **`feedbackParser.js`** — Validates and normalises Claude's feedback object. Prevents crashes if a field is missing or malformed.
- Feedback schema: `{ grammar: { issue, correction, tip }, vocabulary: { suggestion, example }, fluency_score, filler_words[], overall }`

### ✅ Phase 4 — Scenarios
- **Free Talk** — Open conversation, Maya picks relatable topics and asks follow-ups.
- **Job Interview** — Maya plays interviewer; gives feedback on both language and interview technique (STAR method, structure, etc.).
- **Workplace** — Maya sets a scene (standup, customer call, manager pitch) and plays the colleague/manager.
- **`system.js`** — Shared Maya persona imported by all three scenario prompts. Single place to update Maya's personality and rules.

### ✅ Topic Selector
- Each mode has 6 specific scenarios to choose from before starting (18 total).
- **Free Talk:** Introduce yourself, Hobbies, Hometown, Career goals, Favourite film/show, Typical day.
- **Interview:** Software Engineer, Customer Support, Business Analyst, Sales Executive, Bank Officer, HR Executive.
- **Workplace:** Daily standup, Customer complaint, Pitch an idea, Ask for help, New team intro, Explain a delay.
- Selected topic is passed to Maya's `kickoff()` trigger so she starts the right scenario immediately.
- Topic resets to first option when mode is changed.
- Active topic label shown as subtitle in conversation screen header.

### ✅ Assisted Mode (Script Reader)
- **📖 Script** toggle button in the conversation screen header.
- When on, shows a full pre-written script for the selected topic that the student can read aloud.
- Words colour from slate → indigo in real time as the student speaks them (karaoke-style).
- Uses forward-scanning fuzzy word matching against the live transcript — handles minor mispronunciations and skipped words without losing sync.
- Red pulse dot on the card confirms mic is active.
- Scripts written for all 18 topics, stored in `src/data/topics.js` alongside topic metadata.

### ✅ Accent Selector
- Four options: 🇮🇳 Indian (`en-IN`), 🇺🇸 American (`en-US`), 🇬🇧 British (`en-GB`), 🇦🇺 Australian (`en-AU`).
- Voice is selected at session start and held for the full session.
- Note: Indian (`en-IN`) is kept as a starting-point option despite sounding stereotyped — a natural Indian English voice would require a paid TTS API (e.g. ElevenLabs).

### ✅ PWA Setup
- `vite-plugin-pwa` installed and configured. Manifest generated automatically via `vite.config.js`.
- Installable on Android home screen from Chrome.
- Not yet deployed to Vercel.

---

## What's Pending

### Phase 5 — Polish
- [ ] Service worker offline fallback page
- [ ] Mic permission denied — friendly error UI
- [ ] Icons for PWA home screen install (currently using browser default)
- [ ] Deploy to Vercel

### Phase 6 — Progress Tracking
- [ ] `SessionSummary.jsx` — end-of-session report (turns taken, avg fluency, top errors)
- [ ] Wire up `localStorage.js` — session save and streak tracking (file written, not connected to UI yet)
- [ ] Streak display on start screen
- [ ] Supabase backend — cross-device progress, admin dashboard for NGO

### Scenarios — Pending
- [ ] Difficulty levels (Beginner / Intermediate / Advanced) within each mode

---

## Key Decisions Made

| Decision | What we chose | Why |
|---|---|---|
| AI model | Groq / llama-3.1-8b-instant | Free, fast, good enough for conversation |
| Response format | Pure JSON `{ reply, feedback }` | More reliable than two-block text format originally in PLAN.md |
| Speech input | Web Speech API | Free, no server, works on Chrome Android |
| Speech output | Web Speech Synthesis | Free, no server, no audio uploads |
| TTS stutter fix | Normalize punctuation to prevent Chrome chunk boundaries | Chrome stutters at `!`, `,`, `-` — replaced with spaces/periods |
| Voice selection | Prefer `localService: false` (Google network voices) | Local voices are robotic; Google network voices are natural |
| Filler word detection | Strict whitelist in prompt | Llama 3.1 8b over-flags legitimate words without strict constraints |
| Ambiguous input | Maya asks for clarification, doesn't guess | Guessing wrong (e.g. "computer learn English") is worse than asking |
| Indian accent option | Kept despite stereotyped sound | Good starting point for students new to any English audio |
| Tailwind config | No `tailwind.config.js` | Tailwind v4 doesn't require one |
| PWA manifest | Generated by vite-plugin-pwa | No separate `public/manifest.json` needed |

---

## Known Limitations

- **Occasional TTS stutter** — Chrome's Google voice chunks audio server-side; stitch points can land mid-word. Punctuation normalisation reduces but doesn't eliminate this. Real fix: paid TTS API (ElevenLabs, OpenAI TTS).
- **AI misinterpretation of broken English** — Llama 3.1 8b makes plausible but sometimes wrong inferences from broken sentences. Prompt instructs Maya to ask for clarification, but small models still slip. Fix: upgrade to Llama 3.1 70b on Groq (still free) or a stronger model.
- **Indian voice quality** — `en-IN` Chrome voice sounds stereotyped. Acceptable as a starting point; proper fix requires paid TTS.
- **API key exposed in browser** — `VITE_GROQ_API_KEY` is embedded in the JS bundle. Fine for NGO-controlled internal deployment; for public production, route through a Vercel Edge Function.

---

## Running the Project

```bash
cd english-buddy
npm run dev        # localhost:5173
npm run build      # production build
```

**Required env var** in `.env`:
```
VITE_GROQ_API_KEY=gsk_...
```

**Chrome only** — Firefox and Safari do not support the Web Speech API.
