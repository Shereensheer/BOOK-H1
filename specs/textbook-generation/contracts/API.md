# API Contracts: AI-Native Textbook RAG Chatbot

This document defines the public API contracts for the Retrieval-Augmented Generation (RAG) chatbot, as described in the Feature Specification.

## 1. Chatbot API (`/api/chat`)

This API endpoint facilitates interaction with the RAG chatbot, allowing users to submit queries and receive AI-generated responses grounded in the textbook content.

*   **Endpoint:** `/api/chat` (POST)
*   **Version:** API versioning will be managed via URL paths (e.g., `/v1/api/chat`).

### 1.1. Request Body

```json
{
  "query": "string",
  "conversation_history": [
    {
      "role": "user" | "assistant",
      "content": "string"
    }
  ]
}
```

*   **`query`** (string, Required): The user's natural language query to the chatbot.
*   **`conversation_history`** (array of objects, Optional): An array of previous conversational turns, where each object has:
    *   **`role`** (string, Required): Either `"user"` or `"assistant"`.
    *   **`content`** (string, Required): The text of the conversational turn.

### 1.2. Response Body (200 OK)

```json
{
  "response": "string",
  "sources": [
    {
      "title": "string",
      "url": "string"
    }
  ]
}
```

*   **`response`** (string, Required): The AI-generated answer to the user's query.
*   **`sources`** (array of objects, Required): A list of source documents (textbook sections) that were used to generate the response. Each object has:
    *   **`title`** (string, Required): The title of the source (e.g., chapter or section title).
    *   **`url`** (string, Required): The URL to the specific section of the textbook in Docusaurus.

### 1.3. Error Responses

*   **`400 Bad Request`**:
    ```json
    {
      "message": "Invalid input: [details]"
    }
    ```
    (e.g., missing query, invalid history format).
*   **`500 Internal Server Error`**:
    ```json
    {
      "message": "An unexpected error occurred: [details]"
    }
    ```
    (e.g., backend service unavailable, LLM API error).

### 1.4. Idempotency, Timeouts, Retries

*   **Idempotency:** Chatbot queries are designed to be idempotent; repeated identical requests will yield the same response given the same knowledge base.
*   **Client-side Timeouts:** Clients should implement a reasonable timeout (e.g., 30-60 seconds) for API calls.
*   **Retry Mechanisms:** Clients should implement retry logic with exponential backoff for transient network or server errors (`5xx` status codes).

### 1.5. Error Taxonomy

*   `4xx` Series: Client-side errors (e.g., `400 Bad Request` for invalid input).
*   `5xx` Series: Server-side errors (e.g., `500 Internal Server Error` for unhandled exceptions).

## 2. Embedding API (`/api/embed`) - Internal

This internal API endpoint is used by the backend to generate embeddings for textbook content and index it. It is not exposed directly to the frontend.

*   **Endpoint:** `/api/embed` (POST)
*   **Request Body:**
    ```json
    {
      "text_content": "string",
      "chapter_title": "string",
      "section_title": "string",
      "file_path": "string",
      "start_line": "integer",
      "end_line": "integer"
    }
    ```
*   **Response Body (200 OK):**
    ```json
    {
      "chunk_id": "uuid",
      "message": "Text chunk embedded and indexed successfully."
    }
    ```

## 3. Query API (`/api/query`) - Internal

This internal API endpoint is used by the backend to retrieve relevant text chunks for a given user query. It is not exposed directly to the frontend for raw queries, but might be used by the "Select-text → Ask AI" feature.

*   **Endpoint:** `/api/query` (POST)
*   **Request Body:**
    ```json
    {
      "query": "string",
      "limit": "integer"
    }
    ```
*   **Response Body (200 OK):**
    ```json
    {
      "chunks": [
        {
          "chunk_id": "uuid",
          "text_content": "string",
          "chapter_title": "string",
          "section_title": "string",
          "file_path": "string",
          "start_line": "integer",
          "end_line": "integer"
        }
      ]
    }
    ```
