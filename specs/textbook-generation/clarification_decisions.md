## Finalized Decisions for AI-Native Textbook Specification

Based on the clarification points and project constraints, the following decisions have been made:

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
