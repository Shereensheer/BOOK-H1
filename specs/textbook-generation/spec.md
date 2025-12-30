## Feature Specification for AI-Native Textbook with RAG Chatbot

### 1. Scope and Dependencies

#### In Scope:
*   **Book Structure:** Generation of a comprehensive AI-native textbook following the defined 6-chapter structure (6 chapters, 2000–2500 characters per chunk, max 2–3 compressed images per chapter (~100–200 KB), code blocks ≤50–60 lines (collapsible if longer), captions <50 words):
    1.  Introduction to Physical AI
    2.  Basics of Humanoid Robotics
    3.  ROS 2 Fundamentals
    4.  Digital Twin Simulation (Gazebo + Isaac)
    5.  Vision-Language-Action Systems
    6.  Capstone
*   **RAG Chatbot:** Implementation of a Retrieval-Augmented Generation (RAG) chatbot that leverages the textbook content for informed responses. The chatbot will strictly answer ONLY from book text, with 5–10 chunks per chapter (~2000 chars each), and a total of ≤50 chunks for all 6 chapters.
*   **Frontend Framework:** Utilization of Docusaurus v3 for the textbook's static site generation and content presentation.
*   **Sidebar Generation:** Auto-generated sidebar.
*   **Search Plugin:** Docusaurus search plugin for enhanced navigation.
*   **RAG Backend:** Construction of a RAG backend utilizing Qdrant (Cloud free-tier ≤50k points total) for vector database capabilities and Neon Postgres (free-tier ≤20k rows for users + cache) for a PostgreSQL data store.
*   **Embeddings:** Integration of free-tier embedding models (Claude: short queries + cached results) for converting text into vector representations.
*   **Bonus Features:**
    *   **Claude Subagents:** Subagents capable of summarizing sections, explaining code, and troubleshooting ROS2/Python.
    *   **User Signup / Signin (Better-Auth):** Collects software/hardware experience, AI/robotics skill, and preferences during signup.
    *   **Personalized Content Button:** Per chapter, offering Beginner/Advanced levels, simple vs. technical examples, and collapsible tabs.
    *   **Urdu Translation Button:** Automated translation with ~70–85% accuracy acceptable for free-tier.
    *   **Extra Features:** Lightweight caching, multi-language toggle, offline-first mode.

#### Out of Scope:
*   **Real-time Updates:** Real-time content updates or interactive features beyond what Docusaurus's static site generation and the RAG backend inherently provide.

#### External Dependencies:
*   **Docusaurus v3:** Frontend framework for building documentation websites.
*   **Qdrant Cloud:** Vector database (free-tier).
*   **Neon Postgres:** Serverless PostgreSQL database (free-tier).
*   **Embedding Model Provider:** A service or API providing free-tier text embedding models (e.g., Hugging Face, specific Claude tiers).
*   **Large Language Model (LLM) Provider:** A service or API for generating chatbot responses (e.g., Anthropic Claude).
*   **Better-Auth:** User authentication and management library.
*   **Translation API:** A free-tier translation API for Urdu translation.

### 2. Key Decisions and Rationale

*   **Frontend Framework (Docusaurus):**
    *   **Options Considered:** Custom-built React/Next.js application, other static site generators (e.g., Gatsby, Jekyll).
    *   **Trade-offs:** Custom build offers maximum flexibility but higher development effort and maintenance. Other static site generators might lack Docusaurus's specialized features for documentation.
    *   **Rationale:** Docusaurus provides a robust, opinionated, and efficient framework specifically designed for documentation, offering built-in features like automatic sidebar generation, versioning, and search. This aligns well with the "textbook" format, allowing focus on content and RAG integration rather than complex UI development.
*   **RAG Backend Technology Stack (Qdrant + Neon):**
    *   **Options Considered:** Other vector databases (e.g., Pinecone, Weaviate, Milvus), traditional relational databases (e.g., PostgreSQL, MySQL), or NoSQL databases.
    *   **Trade-offs:** Proprietary vector databases might incur costs or vendor lock-in. Traditional databases require more operational overhead.
    *   **Rationale:** Qdrant is selected for its open-source nature, performance in vector search, and flexible deployment options, making it suitable for cost-effective RAG implementation. Neon is chosen as a serverless PostgreSQL solution, providing scalability, ease of management, and cost-efficiency for storing metadata and original text chunks alongside the vector embeddings. This combination supports the "free-tier" emphasis.
*   **Embedding and LLM Provider Strategy (Free-tier):**
    *   **Options Considered:** Various commercial and open-source embedding/LLM providers with different pricing structures.
    *   **Trade-offs:** Free-tier options may have limitations in model size, performance, or rate limits compared to paid tiers.
    *   **Rationale:** Prioritizing free-tier options minimizes initial development and deployment costs, aligning with the project's likely early-stage budget. This allows for proof-of-concept and initial deployment without significant financial commitment, with clear upgrade paths for scaling.

### 3. Interfaces and API Contracts

#### Public APIs (Chatbot):
*   **Endpoint:** `/api/chat` (POST)
*   **Request Body:**
    ```json
    {
      "query": "string",
      "conversation_history": [
        {
          "role": "user" | "assistant",
          "content": "string"
        }
      ]
    }
    ```
*   **Response Body (200 OK):**
    ```json
    {
      "response": "string",
      "sources": [
        {
          "title": "string",
          "url": "string"
        }
      ]
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: `{ "message": "Invalid input: [details]" }` (e.g., missing query, invalid history format).
    *   `500 Internal Server Error`: `{ "message": "An unexpected error occurred: [details]" }` (e.g., backend service unavailable, LLM API error).

#### Versioning Strategy:
*   API versioning will be managed via URL paths (e.g., `/v1/api/chat`).

#### Idempotency, Timeouts, Retries:
*   **Idempotency:** Chatbot queries are designed to be idempotent; repeated identical requests will yield the same response given the same knowledge base.
*   **Client-side Timeouts:** Clients should implement a reasonable timeout (e.g., 30-60 seconds) for API calls.
*   **Retry Mechanisms:** Clients should implement retry logic with exponential backoff for transient network or server errors (`5xx` status codes).

#### Error Taxonomy:
*   `4xx` Series: Client-side errors (e.g., `400 Bad Request` for invalid input, `404 Not Found` for non-existent resources if applicable).
*   `5xx` Series: Server-side errors (e.g., `500 Internal Server Error` for unhandled exceptions, `503 Service Unavailable` for dependencies down).

### 4. Non-Functional Requirements (NFRs) and Budgets

*   **Performance:**
    *   **Chatbot Latency:** P95 latency for chatbot responses to be under 5 seconds.
    *   **Throughput:** Initial target of 10-20 concurrent users for the RAG chatbot.
    *   **Resource Caps:** Adherence to free-tier limits:
    *   **FastAPI backend:** ≤512MB RAM, <1GB storage.
    *   **Qdrant Cloud:** ≤50k points total.
    *   **Neon DB:** ≤20k rows (for users + cache).
    *   **Claude:** Short queries + cached results.
    *   **GitHub Pages:** Static hosting.
*   **Reliability:**
    *   **SLOs:** 99% uptime for the RAG chatbot backend service.
    *   **Error Budgets:** Target an error rate of less than 1% for API requests to the chatbot.
    *   **Degradation Strategy:** In case of upstream LLM or embedding service outages, the chatbot will gracefully degrade by informing users of temporary unavailability or providing static fallback messages.
*   **Security:**
    *   **Authentication/Authorization:** User signup/signin via Better-Auth, collecting software/hardware experience, AI/robotics skill, and preferences for personalized content. API keys for external services (LLM, embeddings, translation) will be securely managed via environment variables.
    *   **Data Handling:** User background (software/hardware experience, AI/robotics skill, preferences) will be collected during signup and stored in Neon. Logged chatbot interactions will be anonymized. Personalized content and Urdu translations will be cached in Neon.
    *   **Secrets Management:** All API keys and sensitive configurations will be stored as environment variables and not hardcoded in the codebase.
    *   **Auditing:** Basic logging of API requests and responses for debugging and performance monitoring.
*   **Cost:** The primary objective is to leverage free-tier services for all components (embedding models, Qdrant Cloud free-tier, Neon free-tier, Docusaurus static hosting, Translation API free-tier) to minimize operational costs during initial development and deployment. Emphasis on lightweight caching to reduce Claude API cost.

### 5. Data Management and Migration

*   **Source of Truth:**
    *   **Textbook Content:** Markdown files within the Docusaurus project repository.
    *   **Chatbot Knowledge Base:** Qdrant will store vector embeddings, while Neon PostgreSQL will store corresponding text chunks and metadata, acting as the primary data store for the RAG system.
*   **Schema Evolution:**
    *   **Docusaurus Content:** Managed through Git version control.
    *   **Qdrant:** Collection schema changes will be managed through code or manual updates as needed.
    *   **Neon:** Database schema changes will be managed using database migration tools.
*   **Migration and Rollback:**
    *   **Docusaurus:** Continuous deployment to GitHub Pages triggered by Git pushes to the `main` branch. Rollback achieved by reverting Git commits.
    *   **RAG Backend:** Containerized deployment to Railway (or Fly.io) with automated builds and deployments. Rollback by deploying a previous stable container image.
*   **Data Retention:** Textbook content is retained indefinitely. Chatbot interaction logs (if any) will adhere to a defined retention policy (e.g., 30 days for debugging, then anonymized or deleted). Personalized user data will be retained as long as the user account is active.

### 6. Operational Readiness

*   **Observability:**
    *   **Logging:** Comprehensive application logs for the Docusaurus build process and the RAG chatbot backend, including request/response payloads, errors, and performance metrics.
    *   **Metrics:** Key performance indicators (KPIs) such as chatbot query count, response latency, and error rates will be collected and monitored.
    *   **Tracing:** Basic tracing implemented for the RAG pipeline to visualize the flow from user query through embedding, vector search, and LLM invocation.
*   **Alerting:** Automated alerts will be configured for critical issues such as chatbot backend service unavailability, high error rates, or significant latency spikes.
*   **Runbooks:** Clear, documented runbooks for common operational tasks, including:
    *   Deployment procedures for Docusaurus and the RAG backend.
    *   Process for updating textbook content and re-indexing the RAG knowledge base.
    *   Troubleshooting guides for common chatbot errors.
*   **Deployment and Rollback Strategies:**
    *   **Docusaurus:** Continuous deployment to GitHub Pages triggered by Git pushes to the `main` branch. Rollback achieved by reverting Git commits.
    *   **RAG Backend:** Containerized deployment to Railway (or Fly.io) with automated builds and deployments. Rollback by deploying a previous stable container image.
*   **Feature Flags and Compatibility:** Feature flags will be considered for optional features (e.g., Urdu translation, personalized chapters) to enable independent deployment and testing without affecting the core functionality.

### 7. Risk Analysis and Mitigation

*   **Top 3 Risks:**
    *   **Hallucinations/Inaccurate RAG Responses:**
        *   **Blast Radius:** Erosion of user trust, dissemination of incorrect information, negative user experience.
        *   **Mitigation:** Implement robust source attribution for chatbot responses, allow user feedback mechanisms for incorrect answers, fine-tune retrieval mechanisms, clearly communicate the "AI-generated" nature of responses.
    *   **Cost Overruns (Scaling Beyond Free-tier):**
        *   **Blast Radius:** Unexpected financial burden, project unsustainability if not managed.
        *   **Mitigation:** Implement strict usage monitoring and budget alerts for all external services. Design the architecture with scalability in mind to allow for cost-effective transitions to paid tiers. Implement API rate limiting where appropriate.
    *   **Data Freshness/Synchronization Issues:**
        *   **Blast Radius:** Chatbot providing outdated or irrelevant information due to a stale knowledge base.
        *   **Mitigation:** Establish automated content ingestion pipelines for new textbook content. Define clear processes and schedules for re-indexing the RAG knowledge base when content updates occur.

### 8. Evaluation and Validation

*   **Definition of Done:**
    *   **Textbook:** All 6 chapters structured and populated with initial content. The Docusaurus site is successfully built and deployable.
    *   **Chatbot:** The RAG pipeline is fully operational, capable of answering questions directly from the textbook content, and provides accurate source citations.
    *   **Testing:** Comprehensive unit tests for all RAG components, integration tests for the chatbot API, and end-to-end tests for Docusaurus deployment and basic chatbot functionality.
    *   **Security Scans:** Automated dependency vulnerability scans passed with no critical issues.
*   **Output Validation:** Chatbot responses will be validated for relevance, factual accuracy against the source documents (textbook content), and adherence to predefined response formats (e.g., inclusion of sources).

### 9. Architectural Decision Record (ADR)

📋 Architectural decision detected: Choice of Docusaurus for frontend. Document reasoning and tradeoffs? Run `/sp.adr "Docusaurus Frontend Selection"`
📋 Architectural decision detected: RAG Backend Technology Stack (Qdrant + Neon). Document reasoning and tradeoffs? Run `/sp.adr "RAG Backend Technology Stack"`
📋 Architectural decision detected: Embedding and LLM Provider Strategy (Free-tier). Document reasoning and tradeoffs? Run `/sp.adr "Free-tier Embedding and LLM Strategy"`
