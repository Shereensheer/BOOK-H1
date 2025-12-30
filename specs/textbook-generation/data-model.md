# Data Model: AI-Native Textbook with RAG Chatbot

This document outlines the data model for the AI-Native Textbook project, covering both the RAG knowledge base and user-related data.

## 1. RAG Knowledge Base

The RAG knowledge base primarily consists of textbook content chunked, embedded, and stored across Qdrant and Neon PostgreSQL.

### 1.1. `TextChunk` Entity

Represents a logical segment of the textbook content.

*   **`id`** (UUID, Primary Key): Unique identifier for the text chunk.
*   **`text_content`** (Text): The original textual content of the chunk.
*   **`chapter_title`** (Text): Title of the chapter the chunk belongs to.
*   **`section_title`** (Text, Nullable): Title of the section within the chapter.
*   **`file_path`** (Text): Path to the original Docusaurus markdown file.
*   **`start_line`** (Integer): Starting line number of the chunk in the original file.
*   **`end_line`** (Integer): Ending line number of the chunk in the original file.
*   **`embedding_vector`** (Vector, Qdrant only): 384-dimensional vector representation of `text_content`. (Stored primarily in Qdrant, optional in Neon for redundancy/debugging).

### 1.2. `Qdrant Collection: textbook_chunks`

*   **Purpose:** Stores vector embeddings of `TextChunk` entities for efficient similarity search.
*   **Structure:**
    *   **Vector Field:** Stores `embedding_vector` (384 dimensions).
    *   **Payload:** Stores `id` as a reference to the `TextChunk` in Neon. Other metadata (e.g., `chapter_title`, `section_title`) can be stored in the payload for filtering, but `text_content` is primarily retrieved from Neon to optimize Qdrant storage.

### 1.3. `Neon PostgreSQL Table: textbook_metadata`

*   **Purpose:** Stores detailed metadata and original `text_content` for `TextChunk` entities, and serves as the primary source for retrieving content after vector search in Qdrant.
*   **Schema:**
    *   `chunk_id` UUID PRIMARY KEY
    *   `text_content` TEXT NOT NULL
    *   `chapter_title` TEXT NOT NULL
    *   `section_title` TEXT
    *   `file_path` TEXT NOT NULL
    *   `start_line` INTEGER NOT NULL
    *   `end_line` INTEGER NOT NULL

## 2. User Management (Better-Auth)

Handles user authentication and personalization data.

### 2.1. `User` Entity

Represents a registered user of the textbook application.

*   **`id`** (UUID, Primary Key): Unique identifier for the user.
*   **`email`** (Text, Unique): User's email address.
*   **`password_hash`** (Text): Hashed password for security.
*   **`software_experience`** (Text, Nullable): User's self-declared software experience level.
*   **`hardware_experience`** (Text, Nullable): User's self-declared hardware experience level.
*   **`ai_robotics_skill`** (Text, Nullable): User's self-declared AI/robotics skill level.
*   **`preferences`** (JSONB, Nullable): JSON object storing user personalization preferences (e.g., preferred chapter difficulty, example style).

### 2.2. `Neon PostgreSQL Table: users`

*   **Purpose:** Stores user authentication credentials and personalization profiles.
*   **Schema:**
    *   `user_id` UUID PRIMARY KEY
    *   `email` TEXT UNIQUE NOT NULL
    *   `password_hash` TEXT NOT NULL
    *   `software_experience` TEXT
    *   `hardware_experience` TEXT
    *   `ai_robotics_skill` TEXT
    *   `preferences` JSONB

## 3. Cache Management

For optimizing LLM costs and improving response times.

### 3.1. `LLMResponseCache` Entity

Stores cached responses from the LLM for specific queries and contexts.

*   **`id`** (UUID, Primary Key): Unique identifier for the cache entry.
*   **`query_hash`** (Text, Unique): Hashed representation of the user query + retrieved context, used as a cache key.
*   **`response`** (Text): The cached LLM generated response.
*   **`sources`** (JSONB): JSON array of source citations.
*   **`timestamp`** (Timestamp): When the entry was created/updated.

### 3.2. `Neon PostgreSQL Table: llm_response_cache`

*   **Purpose:** Stores cached LLM responses to reduce API calls and improve latency.
*   **Schema:**
    *   `cache_id` UUID PRIMARY KEY
    *   `query_hash` TEXT UNIQUE NOT NULL
    *   `response` TEXT NOT NULL
    *   `sources` JSONB
    *   `timestamp` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

## Relationships

*   **`TextChunk` to `Qdrant`:** One-to-one relationship where each `TextChunk` in Neon has a corresponding vector embedding in Qdrant.
*   **`User` to `LLMResponseCache`:** Many-to-one relationship if cache is shared, or one-to-many if per-user caching (unlikely for free-tier). For now, assume a shared cache.
