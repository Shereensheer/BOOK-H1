---
id: 001
title: Implement RAG Chatbot Backend
stage: implement
date: 2025-12-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-chatbot-backend
branch: 002-ai-native-textbook
user: srt
command: /sp.implement
labels: ["rag", "chatbot", "backend", "fastapi"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
tests:
---

## Prompt

/sp.implement
Goal: Build the RAG Chatbot backend for the Physical AI & Humanoid Robotics textbook.

Requirements:
1. Framework: FastAPI
2. Database: Neon Serverless Postgres
3. Vector Store: Qdrant Cloud Free Tier
4. Agents: OpenAI / Claude Agents SDK
5. Functionality:
   - Users can ask questions about textbook content
   - RAG retrieves context only from text selected by the user
   - Generates answers using AI agents
   - Support multi-chapter queries
6. Endpoints:
   - /query → receives user question + optional selected text
   - /status → health check
7. Storage:
   - Chapter text should be indexed into Qdrant vectors
   - Store user sessions in Neon Postgres
8. Modular code:
   - app/main.py → FastAPI app
   - app/routes/query.py → query endpoints
   - app/agents/chat_agent.py → AI agent logic
   - app/db/qdrant_client.py → Qdrant integration
   - app/db/postgres_client.py → Neon Postgres integration
9. Error handling:
   - Validate queries
   - Handle empty results
   - Log errors

Instructions:
- Set up environment and dependencies (FastAPI, Qdrant, Psycopg2, Agents SDK)
- Initialize Qdrant collection for textbook chapters
- Index all chapter text into Qdrant
- Connect Neon Postgres for session management
- Implement AI agent to answer queries using retrieved context
- Ensure endpoints are ready for integration with Docusaurus frontend

Output:
- Fully functional RAG backend
- FastAPI app running on local server
- Qdrant collection populated with textbook content
- AI agent answering questions with context
- Clean modular code ready for frontend integration

## Response snapshot

Created PHR for "Implement RAG Chatbot Backend". Now creating a todo list for the implementation steps.

## Outcome

- ✅ Impact: PHR created.
- 🧪 Tests:
- 📁 Files: history/prompts/rag-chatbot-backend/001-implement-rag-chatbot-backend.implement.prompt.md
- 🔁 Next prompts: Create todo list and start implementation.
- 🧠 Reflection: Successfully created PHR.

## Evaluation notes (flywheel)

- Failure modes observed:
- Graders run and results (PASS/FAIL):
- Prompt variant (if applicable):
- Next experiment (smallest change to try):
