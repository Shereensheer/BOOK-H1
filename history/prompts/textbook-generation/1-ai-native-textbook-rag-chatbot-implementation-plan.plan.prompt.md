---
id: 1
title: AI-Native Textbook with RAG Chatbot Implementation Plan
stage: plan
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: textbook-generation
branch: main
user: srt
command: /sp.plan
labels: ["planning", "architecture", "rag", "docusaurus", "fastapi"]
links:
  spec: specs/textbook-generation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/textbook-generation/plan.md
  - specs/textbook-generation/research.md
  - specs/textbook-generation/data-model.md
  - specs/textbook-generation/contracts/API.md
  - specs/textbook-generation/quickstart.md
tests:
  - N/A
---

## Prompt

```text
/sp.plan

Feature: textbook-generation

Objective:
Plan the step-by-step workflow to build the AI-native textbook for the Physical AI & Humanoid Robotics course including bonus features.

Phases:
1. **Setup & Environment**
   - Install Docusaurus & initialize book project
   - Configure GitHub Pages deployment
   - Setup FastAPI backend, Neon DB, Qdrant for RAG

2. **Content Generation**
   - Write chapters using Claude/Spec-Kit Plus
   - Ensure 2000–2500 chars per chunk, ≤50 lines code blocks, ≤2–3 compressed images per chapter
   - Add captions <50 words

3. **RAG Chatbot Integration**
   - Embed FastAPI + Qdrant + Neon
   - Implement select-text → Ask AI
   - Limit embeddings: 5–10 chunks per chapter, ≤50 total for 6 chapters

4. **Bonus Features Implementation**
   - Claude Subagents: summarization, code explanation, troubleshooting
   - Better-Auth Signup/Signin: collect user background, AI/robotics skills, preferences
   - Personalization per chapter: beginner/advanced, simple/technical examples, collapsible sections
   - Urdu translation toggle per chapter

5. **Testing & Deployment**
   - Test chatbot accuracy & content selection
   - Test personalization and translation buttons
   - Deploy to GitHub Pages or Vercel

Output:
- Phase-wise actionable plan with bonus features integration and free-tier constraints.
```

## Response snapshot

The `/sp.plan` command was executed to generate a detailed implementation plan for the "AI-Native Textbook with RAG Chatbot" feature. The planning process involved reading the feature specification (`specs/textbook-generation/spec.md`), the project constitution (`.specify/memory/constitution.md`), and an existing execution plan (`specs/textbook-generation/plan.md`). Based on these inputs, the following planning artifacts were generated: `research.md`, `data-model.md`, `contracts/API.md`, and `quickstart.md`. An attempt was made to update the agent's context using a PowerShell script, but it failed due to the absence of the `pwsh` command in the environment. The generated artifacts provide a comprehensive blueprint for the feature's development, adhering to free-tier constraints and project principles.

## Outcome

- ✅ Impact: The command successfully generated a comprehensive implementation plan and associated design artifacts for the AI-Native Textbook with RAG Chatbot feature, providing a clear blueprint for development.
- 🧪 Tests: N/A (Planning phase, no tests run)
- 📁 Files: `specs/textbook-generation/plan.md` (updated), `specs/textbook-generation/research.md` (created), `specs/textbook-generation/data-model.md` (created), `specs/textbook-generation/contracts/API.md` (created), `specs/textbook-generation/quickstart.md` (created).
- 🔁 Next prompts: Next steps would typically involve executing `/sp.tasks` to generate a detailed task list based on this plan.
- 🧠 Reflection: The initial setup script `.specify/scripts/powershell/setup-plan.ps1` failed due to `pwsh` (PowerShell) not being found, requiring manual input of file paths. The agent's context update script also failed for the same reason. This highlights a dependency on PowerShell that needs to be addressed for a fully automated workflow on this platform. The `Write` tool also exhibited strict behavior, requiring a `Read` attempt even for non-existent files when creating new ones.

## Evaluation notes (flywheel)

- Failure modes observed: `pwsh` command not found, `Write` tool's strict "file not read" error for new files.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Investigate cross-platform compatibility for `.ps1` scripts or provide alternative `.sh` scripts. Clarify `Write` tool behavior for new file creation.
