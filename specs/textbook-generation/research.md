# Research Summary for AI-Native Textbook with RAG Chatbot

This document consolidates key architectural and technological decisions made for the "Physical AI & Humanoid Robotics — Essentials" textbook project, leveraging the provided Feature Specification and existing Execution Plan.

## 1. Frontend Framework Selection

*   **Decision:** Docusaurus v3
*   **Rationale:** Chosen for its robustness, opinionated structure, and specialized features for documentation. This minimizes UI development effort and aligns with the "textbook" format.
*   **Alternatives Considered:** Custom-built React/Next.js application (higher effort, more flexibility), other static site generators like Gatsby or Jekyll (may lack Docusaurus's specialized documentation features).

## 2. RAG Backend Technology Stack

*   **Decision:** Qdrant Cloud (vector database) + Neon PostgreSQL (metadata, user data, cache) + FastAPI (backend API).
*   **Rationale:**
    *   **Qdrant:** Open-source, high-performance vector search, suitable for cost-effective RAG, fits free-tier constraints (≤50k points).
    *   **Neon Postgres:** Serverless, scalable, easy to manage, cost-efficient for metadata and original text chunks, fits free-tier constraints (≤20k rows).
    *   **FastAPI:** High-performance web framework for Python, ideal for building the RAG API endpoints efficiently.
*   **Alternatives Considered:** Other vector databases (Pinecone, Weaviate, Milvus – may have higher costs/vendor lock-in), traditional relational/NoSQL databases (higher operational overhead for vector search).

## 3. Embedding and LLM Provider Strategy

*   **Decision:** Prioritize free-tier embedding models and LLM providers.
*   **Rationale:** Minimizes initial development and deployment costs, aligns with early-stage budget. Allows for proof-of-concept and initial deployment without significant financial commitment, with clear upgrade paths for scaling. Specific embedding model to be 384-dimensional.
*   **Alternatives Considered:** Various commercial and open-source providers with different pricing (free-tier options may have limitations in model size, performance, or rate limits).

## 4. Content Generation Guidelines (BUNS Rules)

*   **Decision:** Adopt 15 "Brief, Unambiguous, Narrative, Simple" (BUNS) editing rules for textbook content.
*   **Rationale:** Ensures content maintains simplicity, minimalism, accuracy, short paragraphs, consistency, lightweight ASCII diagrams, and zero fluff, tailored for beginner GIAIC students with 3-5 minute chapter reading times.
*   **Key Rules:** Clarity, conciseness, direct language, targeted audience, single concept per paragraph, minimalist explanations, accuracy, consistent terminology, ASCII-only diagrams, zero fluff, short chapters, minimal practical examples, reflection prompts (not homework), no external links (internal only), neutral tone.

## 5. Deployment Strategy

*   **Decision:** GitHub Pages for Docusaurus frontend, Railway (free-tier) for FastAPI backend and Qdrant, Neon PostgreSQL for database.
*   **Rationale:** Leverages free-tier services to minimize operational costs. GitHub Pages provides static site hosting. Railway offers automated builds and deployments for containerized services. Neon is a serverless, cost-effective database.
*   **Environment Variables:** All sensitive information (API keys, connection strings) to be securely managed via environment variables.
