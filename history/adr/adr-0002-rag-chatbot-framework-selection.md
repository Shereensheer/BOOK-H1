---
ad: 0002
title: RAG Chatbot Framework Selection
status: Proposed
date: 2025-12-06
---

## Context
The project requires a RAG-based chatbot to enhance learning for the Physical AI Humanoid Robotics Textbook. A key decision is how to implement this chatbot, specifically whether to build a RAG system from scratch or to leverage an existing framework/library. This decision impacts development effort, time-to-market, and the level of control over the system's architecture.

## Decision
The decision is to utilize an existing RAG framework/library. This approach aims to accelerate development by leveraging established tools, best practices, and pre-built components.

## Consequences
### Positive
*   Faster development cycles.
*   Reduced engineering overhead.
*   Access to community support and existing integrations.
*   Potentially more robust and optimized components.

### Negative
*   Potential vendor lock-in depending on the chosen framework.
*   Less granular control over every aspect of the RAG pipeline compared to a custom build.
*   Possible learning curve for the chosen framework.

## Alternatives
### Build from scratch
This alternative offers full control over the architecture and every component of the RAG pipeline. However, it entails significant development effort, longer implementation times, and requires deep expertise in NLP, information retrieval, and large language models. This option was considered but deemed less efficient for the project's timeline and resource constraints.

## References
- `specs/002-ai-native-textbook/plan.md`
