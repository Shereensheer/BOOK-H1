---
id: 0002
title: Clarify specification for AI-native textbook
stage: spec
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: textbook-generation
branch: main
user: srt
command: /sp.clarify
labels: ["clarification", "specification", "textbook-generation", "RAG", "Docusaurus"]
links:
  spec: specs/textbook-generation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/textbook-generation/clarification_decisions.md
tests:
  - "No explicit tests for clarification generation"
---

## Prompt

/sp.clarify

Goal:
Resolve all missing details and ambiguities for the “Physical AI & Humanoid Robotics — Essentials” AI-Native textbook so the plan and implementation can be precise, minimal, and aligned with free-tier constraints.

Clarify these points:

1. Audience:
   - Beginner GIAIC students?
   - Mixed-level with some robotics familiarity?

2. Chapter Depth:
   - Very short fundamentals (3–5 min each) as per simplicity/minimalism?
   - Or medium depth (6–8 min max) without breaking “short textbook” principle?

3. ROS 2 Chapter:
   - Conceptual only?
   - Or minimal commands + one small diagram (without heavy examples)?

4. Simulation Chapter:
   - Keep it equal for both Gazebo + Isaac?
   - Or focus more on Gazebo since it’s lighter?

5. VLA Chapter:
   - High-level only?
   - Or include ONE extremely small code snippet (free-tier, no GPU)?

6. Capstone:
   - Should follow: Physical AI → ROS 2 → Simulation → VLA → Output?
   - Include pseudocode only (no runnable heavy pipeline)?

7. RAG Chatbot:
   - Should it strictly answer ONLY from book text? (As required)
   - Add hallucination-block rules?
   - Should Select-Text → Ask AI be mandatory in UI?

8. Languages:
   - English-only main book?
   - Optional Urdu toggle for each chapter?

9. UI + Theme:
   - Clean minimal UI (as constitution states)?
   - Light + Dark both?

10. Embeddings:
    - Use 384-dim free-tier model?
    - Chunk size 350–450 tokens?
    - Overlap 80–100?

11. Backend Deployment:
    - Prefer Railway free-tier for FastAPI + Qdrant?
    - Or Render free-tier?

12. GitHub Pages:
    - Should we auto-generate sidebar?
    - Add analytics + search?

Expected Output:
A finalized list of decisions used directly in /sp.plan textbook-generation.

## Response snapshot

Here is the finalized list of decisions to resolve the missing details and ambiguities for the “Physical AI & Humanoid Robotics — Essentials” AI-Native textbook:

1.  **Audience:** Beginner GIAIC students.
2.  **Chapter Depth:** Very short fundamentals (3–5 min each) to maintain simplicity and minimalism.
3.  **ROS 2 Chapter:** Minimal commands + one small diagram to provide practical context without heavy examples.
4.  **Simulation Chapter:** Focus more on Gazebo due to its lighter nature and alignment with free-tier constraints.
5.  **VLA Chapter:** High-level overview, including ONE extremely small code snippet (free-tier, no GPU) to illustrate concepts.
6.  **Capstone:** The capstone should follow the flow: Physical AI → ROS 2 → Simulation → VLA → Output, and include pseudocode only (no runnable heavy pipeline).
7.  **RAG Chatbot:**
    *   It should strictly answer ONLY from book text.
    *   Hallucination-blocking rules will be added.
    *   The "Select-Text → Ask AI" feature will be mandatory in the UI.
8.  **Languages:** English-only main book, with optional Urdu toggle as a future enhancement.
9.  **UI + Theme:** Clean minimal UI (as per the constitution) with both Light and Dark themes.
10. **Embeddings:** Use a 384-dim free-tier model, with a chunk size of 350–450 tokens and an overlap of 80–100 tokens.
11. **Backend Deployment:** Prefer Railway free-tier for FastAPI + Qdrant.
12. **GitHub Pages:** Auto-generate the sidebar and add analytics + search functionality.

## Outcome

- ✅ Impact: All clarification points for the textbook specification have been resolved.
- 🧪 Tests: No explicit tests for clarification generation.
- 📁 Files: specs/textbook-generation/clarification_decisions.md created.
- 🔁 Next prompts: Proceed to implementation planning using the clarified specification.
- 🧠 Reflection: The clarification process successfully addressed all ambiguities, providing a solid foundation for the next stages of the project.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
