# Tasks: textbook-generation

**Branch**: `main` | **Date**: 2025-12-04 | **Plan**: specs/textbook-generation/plan.md

**Objective**: Breakdown of specific tasks for the implementation of the AI-native textbook with RAG chatbot and bonus features, ensuring alignment with free-tier constraints and project principles.

## Phases and User Stories

*   **Phase 1: Setup & Environment**
    *   Initialize Docusaurus project
    *   Setup GitHub repo & Pages
    *   Configure FastAPI + Neon + Qdrant
*   **Phase 2: Content Development**
    *   Write Chapter 1–6 content
    *   Add diagrams/images within size limits
    *   Code blocks with collapsible sections
    *   Ensure clarity, minimalism, and accuracy
*   **Phase 3: RAG Chatbot Core**
    *   Embed FastAPI + Qdrant + Neon backend
    *   Implement select-text → Ask AI functionality
    *   Test RAG responses for correctness and free-tier compatibility
*   **Phase 4: Bonus Features - Claude Subagents**
    *   Implement reusable agents for summarizing, explaining code, troubleshooting
*   **Phase 5: Bonus Features - Better-Auth**
    *   Integrate Signup/Signin and collect user background/preferences
*   **Phase 6: Bonus Features - Chapter Personalization**
    *   Implement button toggles for beginner/advanced, simple/technical examples
*   **Phase 7: Bonus Features - Urdu Translation**
    *   Implement toggle button, cache translations
*   **Phase 8: Testing & QA**
    *   Unit test chatbot and RAG responses
    *   Test personalization & Urdu translation
    *   Validate free-tier resource usage
*   **Phase 9: Deployment**
    *   Push to GitHub Pages or Vercel
    *   Verify links, formatting, and chatbot functionality

## Task List

### Phase 1: Setup & Environment

*   [ ] T001 Initialize Docusaurus project in `frontend/docusaurus-book`
*   [ ] T002 Configure Docusaurus `docusaurus.config.js` for auto-generated sidebar, dark mode, analytics, and search
*   [ ] T003 Set up GitHub repository for Docusaurus deployment to GitHub Pages via GitHub Actions workflow in `.github/workflows/deploy-docusaurus.yml`
*   [ ] T004 Create `backend` directory and initialize Python project with `requirements.txt` for FastAPI, Qdrant client, Neon client in `backend/`
*   [ ] T005 Define Dockerfile for FastAPI backend in `backend/Dockerfile`
*   [ ] T006 Configure environment variables for Neon DB, Qdrant, Embedding API, LLM API in `backend/.env.example`
*   [ ] T007 Set up Neon PostgreSQL database (manual external step, document connection string requirements)
*   [ ] T008 Configure Qdrant Cloud collection `textbook_chunks` with 384-dimensional vector in `backend/src/services/qdrant_service.py`

### Phase 2: Content Development

*   [ ] T009 [P] [US2] Write Chapter 1: Introduction to Physical AI in `docusaurus-site/docs/intro.md`
*   [ ] T010 [P] [US2] Write Chapter 2: Basics of Humanoid Robotics in `docusaurus-site/docs/humanoid-basics.md`
*   [ ] T011 [P] [US2] Write Chapter 3: ROS 2 Fundamentals in `docusaurus-site/docs/ros2.md`
*   [ ] T012 [P] [US2] Write Chapter 4: Digital Twin Simulation (Gazebo + Isaac) in `docusaurus-site/docs/digital-twin.md`
*   [ ] T013 [P] [US2] Write Chapter 5: Vision-Language-Action Systems in `docusaurus-site/docs/vla.md`
*   [ ] T014 [P] [US2] Write Chapter 6: Capstone Project in `docusaurus-site/docs/capstone.md`
*   [ ] T015 [P] [US2] Integrate ASCII diagrams and compressed images into chapters in `docusaurus-site/docs/`
*   [ ] T016 [P] [US2] Implement collapsible code blocks within Docusaurus theme in `docusaurus-site/src/theme/CodeBlock/` (example path)
*   [ ] T017 [US2] Review all chapters for clarity, minimalism, accuracy, and adherence to BUNS rules in `docusaurus-site/docs/`

### Phase 3: RAG Chatbot Core

*   [ ] T018 [P] [US3] Create Pydantic models for `TextChunk`, `User`, `LLMResponseCache` in `backend/src/models/data_models.py`
*   [ ] T019 [P] [US3] Implement `TextChunk` metadata storage and retrieval in Neon PostgreSQL in `backend/src/services/neon_service.py`
*   [ ] T020 [P] [US3] Implement Qdrant client and vector search logic in `backend/src/services/qdrant_service.py`
*   [ ] T021 [P] [US3] Implement Embedding API endpoint `POST /embed` (internal) in `backend/src/api/embeddings.py`
*   [ ] T022 [P] [US3] Implement Query API endpoint `POST /query` (internal) for vector search in `backend/src/api/query.py`
*   [ ] T023 [P] [US3] Implement Chatbot API endpoint `POST /chat` in `backend/src/api/chatbot.py`
*   [ ] T024 [US3] Develop RAG pipeline orchestration (embedding query, Qdrant search, Neon retrieval, LLM invocation) in `backend/src/services/rag_orchestrator.py`
*   [ ] T025 [US3] Implement caching mechanism for LLM responses using Neon in `backend/src/services/cache_service.py`
*   [ ] T026 [US3] Create Chatbot UI (floating bubble, chat panel) in `docusaurus-site/src/components/ChatbotBubble/` and `docusaurus-site/src/components/ChatbotPanel/`
*   [ ] T027 [US3] Implement "Select-text → Ask AI" functionality (JavaScript plugin and UI button) in `docusaurus-site/src/components/HighlightAskAI/`
*   [ ] T028 [US3] Ensure chatbot strictly answers ONLY from book text (backend logic) in `backend/src/services/rag_orchestrator.py`
*   [ ] T029 [US3] Test RAG responses for accuracy, relevance, and source attribution in `backend/tests/integration/test_chatbot.py`

### Phase 4: Bonus Features - Claude Subagents

*   [ ] T030 [P] [US4] Implement summarization Claude Subagent in `backend/src/services/claude_subagents.py`
*   [ ] T031 [P] [US4] Implement code explanation Claude Subagent in `backend/src/services/claude_subagents.py`
*   [ ] T032 [P] [US4] Implement ROS2/Python troubleshooting Claude Subagent in `backend/src/services/claude_subagents.py`
*   [ ] T033 [US4] Integrate Claude Subagents with chatbot UI/backend for specific contexts in `backend/src/api/chatbot.py` and `docusaurus-site/src/components/ChatbotPanel/`

### Phase 5: Bonus Features - Better-Auth

*   [ ] T034 [P] [US5] Implement User signup endpoint in `backend/src/api/auth.py`
*   [ ] T035 [P] [US5] Implement User signin endpoint in `backend/src/api/auth.py`
*   [ ] T036 [P] [US5] Implement user profile update/retrieval endpoints in `backend/src/api/profile.py`
*   [ ] T037 [US5] Integrate Better-Auth library for user authentication and session management in `backend/src/services/auth_service.py`
*   [ ] T038 [US5] Develop frontend UI for signup, signin, and profile management in `docusaurus-site/src/components/Auth/` and `docusaurus-site/src/pages/profile.js`

### Phase 6: Bonus Features - Chapter Personalization

*   [ ] T039 [P] [US6] Implement database schema for personalization preferences in Neon (`backend/src/models/data_models.py`, `backend/src/services/neon_service.py`)
*   [ ] T040 [P] [US6] Develop backend logic for serving personalized content (beginner/advanced, simple/technical examples) based on user preferences in `backend/src/services/personalization_service.py`
*   [ ] T041 [US6] Create UI button toggles for personalization options per chapter in `docusaurus-site/src/components/PersonalizationToggle/`
*   [ ] T042 [US6] Integrate frontend personalization toggles with backend service to dynamically fetch/display content in `docusaurus-site/src/theme/DocItem/Content/`

### Phase 7: Bonus Features - Urdu Translation

*   [ ] T043 [P] [US7] Integrate free-tier Translation API (e.g., LibreTranslate) in `backend/src/services/translation_service.py`
*   [ ] T044 [P] [US7] Implement caching for Urdu translations in Neon in `backend/src/services/cache_service.py`
*   [ ] T045 [US7] Create UI toggle button for Urdu translation per chapter in `docusaurus-site/src/components/TranslationToggle/`
*   [ ] T046 [US7] Develop frontend logic to dynamically fetch and display Urdu translations for chapter content in `docusaurus-site/src/theme/DocItem/Content/`

### Phase 8: Testing & QA

*   [ ] T047 [P] [US8] Write unit tests for FastAPI backend services (`qdrant_service.py`, `neon_service.py`, `rag_orchestrator.py`, `auth_service.py`, `personalization_service.py`, `translation_service.py`) in `backend/tests/unit/`
*   [ ] T048 [P] [US8] Write integration tests for Chatbot API (`/api/chat`, `/api/embed`, `/api/query`) in `backend/tests/integration/`
*   [ ] T049 [P] [US8] Write end-to-end tests for Docusaurus build and deployment in `docusaurus-site/tests/e2e/`
*   [ ] T050 [US8] Manual QA: Test "Select-text → Ask AI" functionality
*   [ ] T051 [US8] Manual QA: Test Claude Subagents integration
*   [ ] T052 [US8] Manual QA: Test Better-Auth signup/signin and profile management
*   [ ] T053 [US8] Manual QA: Test Chapter Personalization toggles and content display
*   [ ] T054 [US8] Manual QA: Test Urdu Translation toggle and accuracy (70-85% acceptable)
*   [ ] T055 [US8] Validate free-tier resource usage and implement monitoring/alerts (backend/deployment configuration)

### Phase 9: Deployment

*   [ ] T056 [US9] Configure GitHub Actions workflow for Docusaurus deployment to GitHub Pages in `.github/workflows/deploy-docusaurus.yml`
*   [ ] T057 [US9] Configure Railway deployment for FastAPI backend (service definition, environment variables)
*   [ ] T058 [US9] Configure Railway deployment for Qdrant (service definition)
*   [ ] T059 [US9] Verify all links, formatting, and chatbot functionality post-deployment
*   [ ] T060 [US9] Establish content ingestion pipeline for new textbook content and RAG knowledge base re-indexing

## Dependencies

- **Phase 1: Setup & Environment** must be completed before all other phases.
- **Phase 2: Content Development** must be substantially complete (at least initial chapter content written) before **Phase 3: RAG Chatbot Core** can be fully tested.
- **Phase 3: RAG Chatbot Core** must be completed before **Phase 4-7: Bonus Features** which depend on core RAG functionality.
- **Phase 4-7: Bonus Features** can be developed in parallel, but depend on **Phase 3** completion.
- **Phase 8: Testing & QA** depends on the completion of all other development phases.
- **Phase 9: Deployment** depends on successful completion of all development and testing.

## Parallel Execution Examples

*   **During Content Development (Phase 2):** Tasks T009-T014 (writing individual chapters) can be executed in parallel.
*   **During RAG Chatbot Core (Phase 3):** Tasks T018-T023 (Pydantic models, Neon service, Qdrant service, API endpoints) can be initiated in parallel once initial setup is done.
*   **During Bonus Features (Phase 4-7):** Once core RAG is stable, the implementation of Claude Subagents (T030-T032), Better-Auth (T034-T036), Personalization (T039-T040), and Translation (T043-T044) can largely proceed in parallel.
*   **During Testing & QA (Phase 8):** Unit and integration tests (T047-T048) can be developed and run in parallel.

## Implementation Strategy

The implementation will follow an MVP-first approach, focusing on delivering the core AI-Native Textbook with functional RAG chatbot (Phases 1-3) as the initial deliverable. Bonus features (Phases 4-7) will be incrementally delivered thereafter. Each phase is designed to be a complete, independently testable increment.
