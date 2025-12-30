# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### User
- **Description**: Represents a learner or instructor, storing preferences and profile information.
- **Attributes**:
    - `user_id`: Unique identifier (from Better-Auth).
    - `role`: (`student`, `instructor`).
    - `os`: (`Ubuntu`, `Windows`, `Mac`).
    - `gpu`: (`None`, `RTX 40xx`, `Cloud`).
    - `edge_kit`: (`Jetson`, `None`).
    - `experience_level`: (`Beginner`, `Intermediate`, `Advanced`).
    - `preferred_language`: (`en`, `ur`).
- **Relationships**:

    - One-to-many with `Query` (a user can make many queries).
    - One-to-many with `TranslationCache` (a user might request many translations).
- **Validation**:
    - All attributes are required during signup.
    - `role`, `os`, `gpu`, `edge_kit`, `experience_level`, `preferred_language` are enums.

### Chapter
- **Description**: Represents an individual textbook chapter.
- **Attributes**:
    - `chapter_id`: Unique identifier (e.g., `01-intro-physical-ai`).
    - `mdx_content`: Original English MDX content.
    - `sections`: List of sections within the chapter.
    - `personalization_markers`: Locations for dynamic content injection.
- **Relationships**:
    - One-to-many with `Chunk` (a chapter is divided into many chunks).
    - One-to-one with `TranslationCache` (a chapter has one Urdu translation).
    - One-to-many with `PersonalizationVariant` (a chapter can have multiple variants).

### Query
- **Description**: Represents a user's question to the RAG chatbot and its response.
- **Attributes**:
    - `query_id`: Unique identifier.
    - `user_id`: Foreign key to `User`.
    - `text`: The user's question.
    - `lang`: (`en`, `ur`).
    - `personalize`: Boolean flag.
    - `selected_text`: Optional, text selected by the user for contextual query.
    - `answer`: The chatbot's response.
    - `sources`: List of source citations (`chapter`, `section`, `chunk_id`, `score`).
    - `cached`: Boolean, indicates if the answer was from cache.
    - `timestamp`: Time of query.
- **Relationships**:
    - Many-to-one with `User`.
- **Validation**:
    - `text`, `user_id` are required.
    - `lang` is an enum.

### Chunk
- **Description**: A segment of text extracted from a chapter for embedding and RAG.
- **Attributes**:
    - `chunk_id`: Unique identifier.
    - `chapter_id`: Foreign key to `Chapter`.
    - `doc_path`: Path to the original MDX file.
    - `section`: Section within the chapter.
    - `content`: Text content of the chunk (300-450 tokens).
    - `embedding`: Vector embedding of the content (stored in Qdrant).
- **Relationships**:
    - Many-to-one with `Chapter`.
- **Validation**:
    - `content` length constraint (300-450 tokens).
    - `embedding` must be a valid vector.

### TranslationCache
- **Description**: Stores precomputed Urdu translations of chapter MDX content.
- **Attributes**:
    - `cache_id`: Unique identifier.
    - `chapter_id`: Foreign key to `Chapter`.
    - `lang`: (`ur`).
    - `translated_mdx`: The Urdu translated MDX content.
    - `last_updated`: Timestamp of last translation.
- **Relationships**:
    - Many-to-one with `Chapter`.

### PersonalizationVariant
- **Description**: Stores alternative MDX content blocks for beginner/advanced personalization.
- **Attributes**:
    - `variant_id`: Unique identifier.
    - `chapter_id`: Foreign key to `Chapter`.
    - `marker_id`: Identifier for the personalization marker in the MDX.
    - `variant_type`: (`beginner`, `advanced`).
    - `mdx_fragment`: The personalized MDX content snippet.
- **Relationships**:
    - Many-to-one with `Chapter`.
