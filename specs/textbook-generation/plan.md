## Execution Plan for AI-Native Textbook with RAG Chatbot

### Objective

Generate a complete execution plan for building the AI-Native textbook exactly as defined in the constitution and specification, incorporating the clarified decisions. This plan will serve as a detailed blueprint for the `/sp.tasks` command.

### 1. Chapter-by-Chapter Blueprint

For each of the 6 chapters, the content will adhere to the principles of simplicity, minimalism, and accuracy for a **beginner GIAIC student audience**, with a target **reading time of 3-5 minutes per chapter**.

#### Chapter 1: Introduction to Physical AI
*   **Learning Goals:** Understand the fundamental concept of Physical AI, its components, and real-world applications.
*   **Section Breakdown:**
    *   What is Physical AI? (Definition, scope)
    *   Why Physical AI matters (Impact, future)
    *   Key components (Sensors, Actuators, Compute)
    *   Brief examples (Robotics, IoT, Autonomous Systems)
*   **Sentence-level Outline:** Define Physical AI as the integration of AI with physical systems. Explain its importance in automation and real-world interaction. List sensors, actuators, and computation as core components. Provide simple examples like robotic arms or smart home devices. (2000–2500 chars)
*   **ASCII Diagrams:** Simple block diagram showing "Physical AI = AI + Physical System". (Max 2-3 per chapter, ~100-200 KB, captions <50 words)
*   **Code Blocks:** Collapsible if longer than 50-60 lines.
*   **Reading Time:** ~4 minutes
*   **Mini Reflection Prompts:** "How does Physical AI differ from purely software AI?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

#### Chapter 2: Basics of Humanoid Robotics
*   **Learning Goals:** Grasp basic concepts of humanoid robot structure, movement, and interaction.
*   **Section Breakdown:**
    *   What makes a robot "humanoid"? (Form factor, functions)
    *   Anatomy of a Humanoid (Joints, degrees of freedom, end-effectors)
    *   Basic locomotion (Walking, balancing)
    *   Interaction principles (Vision, force feedback)
*   **Sentence-level Outline:** Describe humanoid robots as machines resembling humans for interaction in human environments. Outline basic components like torso, limbs, and joints, highlighting degrees of freedom. Explain fundamental movements and how humanoids sense and interact with their surroundings. (2000–2500 chars)
*   **ASCII Diagrams:** Simple stick figure humanoid showing joints/DOF. (Max 2-3 per chapter, ~100-200 KB, captions <50 words)
*   **Code Blocks:** Collapsible if longer than 50-60 lines.
*   **Reading Time:** ~5 minutes
*   **Mini Reflection Prompts:** "What are the main challenges in designing humanoid locomotion?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

#### Chapter 3: ROS 2 Fundamentals
*   **Learning Goals:** Understand the core concepts and architecture of ROS 2.
*   **Section Breakdown:**
    *   What is ROS 2? (Middleware, ecosystem)
    *   Key concepts (Nodes, topics, services, actions)
    *   ROS 2 Architecture (DDS, RMW)
    *   Minimal ROS 2 commands (e.g., `ros2 run`, `ros2 topic list`)
*   **Sentence-level Outline:** Introduce ROS 2 as a flexible framework for robot application development. Explain nodes as computational units, topics for data streaming, services for request/reply, and actions for long-running tasks. Briefly describe the DDS-based communication. Provide a few essential ROS 2 commands.
*   **ASCII Diagrams:** Basic diagram showing two nodes communicating via a topic.
*   **Reading Time:** ~5 minutes
*   **Mini Reflection Prompts:** "How does ROS 2 facilitate modular robot development?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

#### Chapter 4: Digital Twin Simulation (Focus on Gazebo)
*   **Learning Goals:** Learn the basics of digital twin simulation, with a primary focus on Gazebo.
*   **Section Breakdown:**
    *   What is a Digital Twin and why simulate? (Concept, benefits)
    *   Introduction to Gazebo (Features, use cases)
    *   Basic Gazebo workflow (World files, robot models - URDF)
    *   Running a simple simulation (command-line)
*   **Sentence-level Outline:** Define digital twins and their importance in testing and development. Introduce Gazebo as a widely used robot simulator. Explain how to define simulation environments with world files and robot structures with URDF. Show a basic command to launch a Gazebo simulation.
*   **ASCII Diagrams:** Simple representation of a robot model in a simulated environment.
*   **Reading Time:** ~6 minutes (due to focus on Gazebo)
*   **Mini Reflection Prompts:** "What are the advantages of simulating a robot before deploying it in the real world?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

#### Chapter 5: Vision-Language-Action Systems (VLA)
*   **Learning Goals:** Comprehend the high-level principles of Vision-Language-Action systems.
*   **Section Breakdown:**
    *   What are VLA Systems? (Definition, integration of modalities)
    *   Vision Component (Image processing, object recognition)
    *   Language Component (Natural Language Understanding, instruction parsing)
    *   Action Component (Robot control, task execution)
    *   Small Code Snippet Example (conceptual, Python, free-tier, no GPU)
*   **Sentence-level Outline:** Introduce VLA systems as AI that understands visual and linguistic inputs to perform physical actions. Explain how computer vision interprets the scene, NLP processes commands, and robot control executes movements. Include a very small, conceptual Python snippet illustrating a basic "if object seen, move" logic without heavy dependencies or GPU requirements.
*   **ASCII Diagrams:** Flowchart: Vision → Language → Action.
*   **Reading Time:** ~5 minutes
*   **Mini Reflection Prompts:** "How can VLA systems improve human-robot collaboration?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

#### Chapter 6: Capstone Project
*   **Learning Goals:** Integrate knowledge from previous chapters to conceptualize a Physical AI project.
*   **Section Breakdown:**
    *   Project Overview (Goal, scope)
    *   System Design (Physical AI, ROS 2, Simulation, VLA integration)
    *   Pseudocode Implementation (High-level logic)
    *   Evaluation Metrics (Success criteria)
*   **Sentence-level Outline:** Describe a capstone project that ties together Physical AI principles, ROS 2 for robot communication, Gazebo for simulation, and VLA for intelligent interaction. Provide pseudocode outlining a simplified pipeline: sense environment (Physical AI/Vision), interpret command (Language), plan movement (ROS 2/Simulation), execute action (Physical AI/Action).
*   **ASCII Diagrams:** High-level system architecture diagram of the capstone.
*   **Reading Time:** ~6 minutes
*   **Mini Reflection Prompts:** "What challenges might arise when implementing this capstone project in a real-world scenario?"
*   **Optional Urdu Notes:** Placeholder for future Urdu translation.

### 2. Docusaurus Structure Plan

The Docusaurus site will have a clean, minimalist UI with both Light and Dark themes, and an auto-generated sidebar.

#### File/Folder Map:
```
docusaurus-site/
└── docs/book/
    ├── intro.md
    ├── humanoid-basics.md
    ├── ros2.md
    ├── digital-twin.md
    ├── vla.md
    └── capstone.md
├── src/
│   └── components/
│       └── ChatbotBubble/
│           └── index.js
│           └── styles.module.css
│       └── ChatbotPanel/
│           └── index.js
│           └── styles.module.css
│       └── HighlightAskAI/
│           └── index.js
│           └── styles.module.css
├── docusaurus.config.js
└── sidebar.js
```

#### Configuration Details:

*   **`docusaurus.config.js`**:
    *   Configure `presets` for `@docusaurus/preset-classic` to enable default features.
    *   Set `navbar` to be minimalist, including links to docs and potentially a theme toggle.
    *   Enable `darkmode` support.
    *   Configure `algolia` or similar for search (as per clarification: *Add analytics + search*).
    *   Integrate Google Analytics or a similar free-tier solution for analytics (as per clarification: *Add analytics + search*).
*   **`sidebar.js`**:
    *   Utilize Docusaurus's automatic sidebar generation feature. The `docs` folder structure will directly inform the sidebar.
    *   Specifically, use `createSidebarItemsGenerator` or similar Docusaurus API to scan the `/docs` directory and create navigation links automatically.

### 3. RAG Architecture Plan

The RAG backend will be built with FastAPI, using Qdrant for vector storage and Neon PostgreSQL for metadata, leveraging free-tier components.

*   **Qdrant:**
    *   **Collections:** A single collection will be created, e.g., `textbook_chunks`, with a vector dimension of 384 (as per clarification: *Use 384-dim free-tier model*).
    *   **Indexing:** Content from the Docusaurus markdown files will be chunked, embedded, and indexed into this collection.
*   **Neon PostgreSQL:**
    *   **Usage (Metadata):** Store metadata for each chunk, such as:
        *   `chunk_id` (UUID, primary key)
        *   `text_content` (original text chunk)
        *   `chapter_title`
        *   `section_title`
        *   `file_path`
        *   `start_line`, `end_line`
        *   `embedding_vector` (optional, for redundancy/debug, but primary in Qdrant)
*   **Embedding Model:**
    *   Utilize a **384-dimensional free-tier embedding model** (e.g., a suitable model from Hugging Face via a public API endpoint, or a free-tier offering from a major cloud provider) (as per clarification: *Use 384-dim free-tier model*).
*   **Chunk Size + Overlap:**
    *   **Chunk Size:** 350–450 tokens (as per clarification: *Chunk size 350–450 tokens*).
    *   **Overlap:** 80–100 tokens (as per clarification: *Overlap 80–100*).
*   **FastAPI Endpoints:**
    *   **`POST /embed`**:
        *   **Input:** Raw text content from a chapter/section.
        *   **Output:** Embedding vector.
        *   **Functionality:** Takes text, chunks it, generates embeddings, and stores both text and embeddings in Qdrant/Neon.
    *   **`POST /query`**:
        *   **Input:** User's raw query string.
        *   **Output:** Ranked list of relevant text chunks (metadata + content) from the book.
        *   **Functionality:** Embeds the user query, performs vector search in Qdrant, and retrieves corresponding metadata/content from Neon.
    *   **`POST /chat`**:
        *   **Input:** User's query, conversation history (optional).
        *   **Output:** AI-generated response and sources.
        *   **Functionality:** Orchestrates the full RAG pipeline (embedding query, retrieving chunks, feeding to LLM, generating response, attributing sources, applying hallucination rules).
*   **Retrieval Pipeline:**
    *   **User query → Embed:** User's natural language query is converted into a 384-dimensional vector using the chosen embedding model.
    *   **→ Search:** The query vector is used to perform a similarity search in the Qdrant `textbook_chunks` collection.
    *   **→ Rerank:** Retrieved chunks might be reranked based on additional heuristics or a smaller, faster reranking model (if free-tier available and beneficial) to optimize relevance.
    *   **→ Final Answer:** The top `N` reranked chunks, along with the user's query and (optional) conversation history, are sent to a free-tier LLM (e.g., from Anthropic or OpenAI) to generate a concise answer.
*   **Select-Text → Ask AI Workflow Plan:**
    *   **UI Interaction:** When a user highlights text in the Docusaurus site, a "Ask AI" button appears (mandatory as per clarification).
    *   **Frontend Action:** Clicking "Ask AI" sends the highlighted text as a query to the `/query` endpoint (or directly to `/chat` with highlighted text as context).
    *   **Backend Processing:** The backend treats the highlighted text as a highly relevant context for the RAG query.
    *   **Chatbot Response:** The chatbot provides an answer, strictly based on the book text, using the highlighted text as primary context.

### 4. Chatbot UI Plan

The chatbot UI will be clean, minimalist, and directly integrated into the Docusaurus site, ensuring strict adherence to "answers only from book text".

*   **Floating Bubble:** A small, unobtrusive floating chat bubble icon will be present on all textbook pages, typically in the bottom-right corner.
*   **Panel Layout:** Clicking the floating bubble will expand a chat panel, either as an overlay or a sidebar, providing the conversation interface.
*   **Highlight → Ask AI Plugin:**
    *   A JavaScript plugin will detect text selection events on the Docusaurus pages.
    *   Upon selection, a small, transient "Ask AI" button will appear near the highlighted text (mandatory, as per clarification).
    *   Clicking this button will open the chat panel, pre-populating the input with the highlighted text, or directly sending it as a query to the RAG backend.
*   **Urdu Toggle Options:** (Future Enhancement)
    *   A language toggle will be implemented within the Docusaurus theme for switching between English and Urdu content. This will apply to the textbook content itself.
    *   The chatbot will initially respond in English, but the architecture will consider future expansion for multilingual responses.
*   **Strict "Answers Only From Book Text":**
    *   The chatbot UI will prominently display a disclaimer stating that answers are strictly derived from the textbook content.
    *   The RAG backend will enforce this rule via hallucination-blocking rules and by only using retrieved document snippets as context for the LLM.

### 5. Deployment Plan

The deployment strategy focuses on leveraging free-tier services for both the Docusaurus frontend and the FastAPI/Qdrant backend.

*   **GitHub Pages for Textbook:**
    *   **Static Site Generation:** Docusaurus will build the static HTML, CSS, and JavaScript files.
    *   **Deployment:** These static assets will be deployed to GitHub Pages (or a similar static site hosting service like Vercel/Netlify) via a GitHub Actions workflow triggered on pushes to the `main` branch.
    *   **Auto-generate sidebar:** Configured in `docusaurus.config.js` to automatically generate based on the `docs` folder structure.
    *   **Analytics + Search:** Integrated with Docusaurus's configuration using Google Analytics for basic tracking and Algolia DocSearch for in-site search (both have free tiers for open-source projects or low usage).
*   **Railway Free-tier for Backend:** (as per clarification: *Prefer Railway free-tier for FastAPI + Qdrant.*)
    *   **FastAPI Service:** The FastAPI application will be deployed as a service on Railway.
    *   **Qdrant:** Qdrant will be deployed as a separate service on Railway, utilizing its free-tier offerings.
    *   **Neon PostgreSQL:** The Neon database will be connected to the FastAPI service via an external connection string.
*   **Environment Variables:**
    *   All sensitive information (API keys for LLM/embedding providers, Qdrant API key, Neon connection string) will be stored as environment variables on Railway and GitHub Actions.
    *   No secrets will be hardcoded in the codebase.
*   **Build Optimization:**
    *   **Docusaurus:** Use Docusaurus's built-in build optimizations (e.g., minification, code splitting).
    *   **FastAPI:** Ensure Docker images are minimal and efficient.
*   **Free-tier Limitations Handling:**
    *   **Monitoring:** Implement monitoring for usage limits on all free-tier services (Railway, Neon, LLM/embedding APIs).
    *   **Alerting:** Set up alerts to notify if usage approaches limits.
    *   **Rate Limiting:** Implement basic rate limiting in the FastAPI application to prevent abuse and stay within API quotas for external services.

### 6. BUNS (Brief, Unambiguous, Narrative, Simple) Editing Rules (12-15 Rules)

These rules are designed to ensure the textbook content maintains simplicity, minimalism, accuracy, short paragraphs, consistency, lightweight ASCII diagrams, and zero fluff, tailored for **beginner GIAIC students** with **3-5 minute chapter reading times**.

1.  **Clarity First:** Each sentence must convey a single, clear idea. Avoid complex sentence structures and jargon where simpler terms suffice.
2.  **Conciseness is King:** Eliminate all superfluous words, phrases, and sentences. If a word or phrase can be removed without losing meaning, remove it.
3.  **Direct Language:** Use active voice and strong verbs. Avoid passive constructions.
4.  **Targeted Audience:** Write exclusively for beginner GIAIC students. Assume no prior robotics or advanced AI knowledge.
5.  **Single Concept Per Paragraph:** Each paragraph should introduce and explain only one core concept. Keep paragraphs short (2-4 sentences).
6.  **Minimalist Explanations:** Explain concepts sufficiently for understanding, but do not delve into exhaustive detail or edge cases. Prioritize "what" and "why" over intricate "how-to" unless absolutely necessary for fundamentals.
7.  **Accuracy Over Style:** All technical information must be factually correct. Double-check definitions, commands, and descriptions.
8.  **Consistent Terminology:** Use a consistent set of terms throughout the book. Define terms clearly upon first use and stick to those definitions.
9.  **ASCII-Only Diagrams:** Use only simple, text-based ASCII diagrams. These should illustrate core concepts visually without requiring complex rendering or external image dependencies.
10. **Zero Fluff:** Avoid anecdotes, analogies that add unnecessary length, or motivational rhetoric. Focus strictly on informative content.
11. **Short Chapters:** Structure content to be digestible within 3-5 minutes per chapter. This implies highly condensed information.
12. **Practical Examples (Minimal):** When examples are included (e.g., ROS 2 commands, VLA snippet), they must be the absolute minimum necessary to illustrate the concept, free-tier compatible, and require no special hardware (e.g., GPU).
13. **Reflection, Not Homework:** Mini reflection prompts should encourage thought, not require research or complex answers.
14. **No External Links (Internal References Only):** Avoid linking to external websites for core content. All essential information should be self-contained within the textbook. If referring to other parts of the textbook, use clear internal references (e.g., "See Chapter 1 for definition of...").
15. **Neutral Tone:** Maintain a professional, objective, and neutral tone throughout. Avoid overly enthusiastic or informal language.
