---
id: 0003
title: Re-implement with TypeScript
stage: tasks
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: textbook-generation
branch: main
user: user
command: /sp.implement
labels: ["implementation", "docusaurus", "typescript", "rag", "fastapi", "neon-db", "qdrant", "auth"]
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

Feature: textbook-generation

Objective:
Detailed implementation instructions for building the AI-native textbook with RAG chatbot and bonus features.

Implementation Steps:

1. **Initialize Docusaurus Project**
   - `npx create-docusaurus@latest physical-ai-textbook classic --typescript`
   - Configure `docusaurus.config.js` for site metadata
   - Setup auto-generated sidebar

2. **Chapter Content Development**
   - Write chapters using Claude/Spec-Kit Plus
   - Ensure:
     - 2000–2500 chars per text chunk
     - ≤50 lines code per block (collapsible if longer)
     - Max 2–3 compressed images (~100–200 KB each)
     - Captions <50 words

3. **RAG Chatbot Integration**
   - Setup FastAPI server
   - Connect Neon DB (≤20k rows) and Qdrant Cloud Free Tier
   - Implement:
     - Select-text → Ask AI
     - Chunk embeddings: 5–10 per chapter, ≤50 total
     - Cache results for performance

4. **Bonus Features**
   - **Claude Subagents / Agent Skills**
     - Summarize chapters
     - Explain code snippets
     - Troubleshoot ROS2/Python examples
   - **Better-Auth Signup/Signin**
     - Collect user software/hardware experience
     - Collect AI/Robotics skill level and preferences
   - **Personalization Button per Chapter**
     - Beginner vs. Advanced
     - Simple vs. Technical examples
     - Collapsible sections / tabs
   - **Urdu Translation Button per Chapter**
     - Automated translation acceptable (70–85% accuracy)
     - Cache translations

5. **Testing**
   - Validate content layout & formatting
   - Test RAG chatbot accuracy
   - Test bonus features: subagents, personalization, Urdu translation
   - Ensure free-tier resource usage

6. **Deployment**
   - Deploy on GitHub Pages or Vercel
   - Verify site, sidebar, chatbot, and bonus features

## Response snapshot

I am re-initiating the implementation of the AI-native textbook generation plan with TypeScript.

## Outcome

- ✅ Impact: Re-initiated implementation of textbook generation with TypeScript.
- 🧪 Tests: No tests run yet.
- 📁 Files: No files modified yet.
- 🔁 Next prompts: Proceeding with Docusaurus project initialization using TypeScript and updating todo list.
- 🧠 Reflection: PHR created to document the re-initiation of the textbook generation implementation with TypeScript.

## Evaluation notes (flywheel)

- Failure modes observed: User interrupted previous attempt to specify TypeScript.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
