---
id: 0003
title: Generate project constitution
stage: constitution
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: textbook-generation
branch: main
user: srt
command: /sp.constitution
labels: ["constitution", "project-setup"]
links:
  spec: specs/textbook-generation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - "No explicit tests for constitution generation"
---

## Prompt

/sp.constitution

Project Name: Physical AI & Humanoid Robotics — Essentials

Purpose:
Create a short, clean, professional AI-Native textbook based on the Physical AI & Humanoid Robotics course.
The book must serve as a fast, simple, high-quality learning resource built with a modern Docusaurus UI
and a fully integrated free-tier RAG chatbot.

Scope:
- 6 short chapters:
  1. Introduction to Physical AI
  2. Basics of Humanoid Robotics
  3. ROS 2 Fundamentals
  4. Digital Twin Simulation (Gazebo + Isaac)
  5. Vision-Language-Action Systems
  6. Capstone: Simple AI-Robot Pipeline
- Clean UI
- Free-tier friendly
- Lightweight embeddings

Core Principles:
- Simplicity
- Accuracy
- Minimalism
- Fast builds
- Free-tier architecture
- RAG answers ONLY from book text

Key Features:
- Docusaurus textbook
- RAG chatbot (Qdrant + Neon + FastAPI)
- Select-text → Ask AI
- Optional Urdu / Personalize features

Constraints:
- No heavy GPU usage
- Minimal embeddings

Success Criteria:
- Build success
- Accurate chatbot
- Clean UI
- Smooth GitHub Pages deployment

Generate full constitution.

## Response snapshot

## Project Constitution: Physical AI & Humanoid Robotics — Essentials

### 1. Project Overview

*   **Project Name:** Physical AI & Humanoid Robotics — Essentials
*   **Purpose:** To create a short, clean, professional AI-Native textbook based on the Physical AI & Humanoid Robotics course. The book must serve as a fast, simple, high-quality learning resource built with a modern Docusaurus UI and a fully integrated free-tier RAG chatbot.

### 2. Scope

*   **In Scope:**
    *   **Book Structure (6 short chapters):**
        1.  Introduction to Physical AI
        2.  Basics of Humanoid Robotics
        3.  ROS 2 Fundamentals
        4.  Digital Twin Simulation (Gazebo + Isaac)
        5.  Vision-Language-Action Systems
        6.  Capstone: Simple AI-Robot Pipeline
    *   Clean User Interface (UI)
    *   Free-tier friendly architecture
    *   Lightweight embeddings
*   **Key Features:**
    *   Docusaurus-based textbook
    *   Retrieval-Augmented Generation (RAG) chatbot (utilizing Qdrant, Neon, and FastAPI)
    *   "Select-text → Ask AI" functionality
    *   Optional Urdu / Personalize features (to be considered for future enhancements)

### 3. Core Principles

*   **Simplicity:** All aspects of the project, from content to architecture, must prioritize ease of understanding and use.
*   **Accuracy:** All technical information presented in the textbook and by the RAG chatbot must be factually correct and up-to-date.
*   **Minimalism:** Avoid unnecessary complexity, features, or design elements. Focus on the core learning and interaction experience.
*   **Fast Builds:** The Docusaurus site build process should be optimized for speed to enable rapid content iteration and deployment.
*   **Free-tier Architecture:** The entire system, including the RAG chatbot infrastructure, MUST be designed to operate within free-tier limits of cloud services (Qdrant, Neon, FastAPI). Resource efficiency is paramount.
*   **RAG Answers ONLY from Book Text:** The RAG chatbot must strictly ground its responses in the provided textbook content, minimizing hallucinations.

### 4. Constraints

*   **No Heavy GPU Usage:** Development and deployment should avoid reliance on heavy GPU resources to remain free-tier friendly.
*   **Minimal Embeddings:** Embedding models and their usage should be lightweight and efficient, adhering to free-tier limitations.

### 5. Success Criteria

*   **Build Success:** The Docusaurus site must build without errors and be deployable.
*   **Accurate Chatbot:** The RAG chatbot must consistently provide accurate and relevant answers grounded in the textbook content.
*   **Clean UI:** The user interface must be aesthetically clean, minimalist, and easy to navigate.
*   **Smooth GitHub Pages Deployment:** The textbook must be seamlessly deployable and accessible via GitHub Pages.

## Outcome

- ✅ Impact: The project constitution has been successfully generated and recorded.
- 🧪 Tests: No explicit tests for constitution generation.
- 📁 Files: .specify/memory/constitution.md updated.
- 🔁 Next prompts: Proceed with task generation based on the constitution.
- 🧠 Reflection: The constitution provides clear guiding principles and details for the project.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
