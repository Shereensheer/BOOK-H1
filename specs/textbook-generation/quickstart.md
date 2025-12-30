# Quickstart Guide: AI-Native Textbook with RAG Chatbot

This guide provides basic instructions to get started with setting up and running the AI-Native Textbook project components.

## 1. Project Structure

The project is organized into two main parts: `frontend/` for the Docusaurus textbook and `backend/` for the FastAPI RAG service.

```text
.
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── docusaurus-book/
│   └── package.json
├── specs/
│   └── textbook-generation/
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       └── contracts/
│           └── API.md
└── .github/
    └── workflows/
```

## 2. Frontend (Docusaurus Textbook) Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend/docusaurus-book
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the textbook in your browser at `http://localhost:3000`.
4.  **Build for production:**
    ```bash
    npm run build
    ```
    The static files will be generated in the `build/` directory.

## 3. Backend (FastAPI RAG Service) Setup

The backend requires a Python environment, Qdrant, and Neon PostgreSQL.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory with the following (replace placeholders with your actual credentials):
    ```
    NEON_DATABASE_URL="postgresql://user:password@host:port/database"
    QDRANT_URL="https://[YOUR_QDRANT_CLUSTER_URL]"
    QDRANT_API_KEY="[YOUR_QDRANT_API_KEY]"
    EMBEDDING_API_KEY="[YOUR_EMBEDDING_API_KEY]" # For your chosen embedding provider
    LLM_API_KEY="[YOUR_LLM_API_KEY]"             # For your chosen LLM provider
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run database migrations (if applicable):**
    *   You'll need a database migration tool (e.g., Alembic) configured for your Neon database.
    *   Example (assuming Alembic): `alembic upgrade head`
5.  **Start the FastAPI application:**
    ```bash
    uvicorn src.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

## 4. Initializing the RAG Knowledge Base

Before the chatbot can function, the textbook content needs to be chunked, embedded, and indexed.

1.  **Ensure backend is running.**
2.  **Develop a script or endpoint** in the backend to:
    *   Read Docusaurus markdown files from `frontend/docusaurus-book/docs/`.
    *   Chunk the content according to the defined `chunk_size` and `overlap`.
    *   Call the internal `/api/embed` endpoint for each chunk to generate embeddings and store them in Qdrant and Neon.

This process typically needs to be run once initially and then whenever textbook content is updated.

## 5. Deployment (High-Level)

*   **Frontend (GitHub Pages):** Configure a GitHub Actions workflow to build and deploy the `frontend/docusaurus-book` to GitHub Pages on pushes to `main`.
*   **Backend (Railway):** Deploy the `backend` directory as a service on Railway. Configure environment variables within Railway. Link to your Neon PostgreSQL and Qdrant Cloud services.

This quickstart provides the fundamental steps. Refer to the respective Docusaurus, FastAPI, Qdrant, and Neon documentation for detailed configuration and advanced usage.
