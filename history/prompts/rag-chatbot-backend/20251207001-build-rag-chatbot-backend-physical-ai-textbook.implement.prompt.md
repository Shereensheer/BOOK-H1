---
id: 20251207001
title: Build RAG Chatbot backend for Physical AI & Humanoid Robotics textbook
stage: implement
date: 2025-12-07
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-chatbot-backend
branch: 002-ai-native-textbook
user: user
command: /sp.implement
labels: ["backend", "rag", "fastapi"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - app/.python-version
  - app/README.md
  - app/agents/chat_agent.py
  - app/db/postgres_client.py
  - app/db/qdrant_service.py
  - app/main.py
  - app/pyproject.toml
  - app/routes/query.py
  - app/uv.lock
tests:
---

## Prompt

Goal: Build the RAG Chatbot backend for the Physical AI & Humanoid Robotics textbook.

Important:
- The backend folder ALREADY exists.
- Do NOT create a new backend folder.
- Implement everything inside the existing backend structure only.

Requirements:
1. Framework: FastAPI
2. Database: Neon Serverless Postgres
3. Vector Store: Qdrant Cloud Free Tier
4. Agents: OpenAI / Claude Agents SDK
5. Functionality:
   - Users can ask questions about textbook content
   - RAG retrieves context only from text selected by the user
   - AI agent generates final answers
   - Support multi-chapter queries
6. Endpoints:
   - /query  → receive user question + optional selected text
   - /status → health check
7. Storage:
   - Index textbook chapter text into Qdrant vectors
   - Store user sessions in Neon Postgres
8. Modular code (use the existing backend folder):
   - app/main.py → FastAPI app
   - app/routes/query.py → query endpoints
   - app/agents/chat_agent.py → AI agent logic
   - app/db/qdrant_client.py → Qdrant integration
   - app/db/postgres_client.py → Neon Postgres integration
9. Error handling:
   - Validate questions
   - Handle empty RAG results
   - Log errors

Instructions:
- Use the existing backend folder; do NOT create a new one.
- Install needed dependencies (FastAPI, Qdrant, Psycopg2, Agents SDK)
- Initialize Qdrant collection inside existing backend
- Index all textbook chapters into Qdrant
- Connect Neon Postgres for sessions
- Implement AI agent using retrieved context
- Prepare endpoints for Docusaurus frontend integration

Output:
- Fully functional RAG backend inside the existing backend folder
- Qdrant populated with chapter vectors
- Working FastAPI server
- AI agent producing contextual answers
- Clean modular code ready for frontend integration

## Response snapshot

I will implement the RAG Chatbot backend for the Physical AI & Humanoid Robotics textbook. I will use the existing 'app' folder, install dependencies, set up FastAPI, integrate Qdrant and Neon Postgres, implement AI agent logic, and define the required endpoints with error handling.

## Outcome

- ✅ Impact: null
- 🧪 Tests: null
- 📁 Files: null
- 🔁 Next prompts: null
- 🧠 Reflection: null

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
