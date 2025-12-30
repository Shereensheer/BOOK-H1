import os
import requests
import xml.etree.ElementTree as ET
import trafilatura
from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
import cohere

# -------------------------------------
# LOAD ENV VARIABLES
# -------------------------------------
load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not all([COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY]):
    raise ValueError("❌ Missing environment variables")

# -------------------------------------
# CONFIG
# -------------------------------------
SITEMAP_URL = "https://ai-textbook-six.vercel.app/sitemap.xml"
COLLECTION_NAME = "humanoid_ai_book"

EMBED_MODEL = "embed-english-v3.0"

# -------------------------------------
# CLIENTS
# -------------------------------------
cohere_client = cohere.Client(COHERE_API_KEY)

qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

# -------------------------------------
# Step 1 — Extract URLs from sitemap
# -------------------------------------
def get_all_urls(sitemap_url):
    xml = requests.get(sitemap_url).text
    root = ET.fromstring(xml)

    urls = []
    for child in root:
        loc = child.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        if loc is not None:
            urls.append(loc.text)

    print("\n🔗 FOUND URLS:")
    for u in urls:
        print(" -", u)

    return urls

# -------------------------------------
# Step 2 — Download page + extract text
# -------------------------------------
def extract_text_from_url(url):
    html = requests.get(url).text
    text = trafilatura.extract(html)

    if not text:
        print("⚠️ No text extracted from:", url)

    return text

# -------------------------------------
# Step 3 — Chunk the text
# -------------------------------------
def chunk_text(text, max_chars=1200):
    chunks = []
    while len(text) > max_chars:
        split_pos = text[:max_chars].rfind(". ")
        if split_pos == -1:
            split_pos = max_chars
        chunks.append(text[:split_pos])
        text = text[split_pos:]
    chunks.append(text)
    return chunks

# -------------------------------------
# Step 4 — Create embedding
# -------------------------------------
def embed(text):
    response = cohere_client.embed(
        model=EMBED_MODEL,
        input_type="search_document",  # correct for ingestion
        texts=[text],
    )
    return response.embeddings[0]

# -------------------------------------
# Step 5 — Qdrant
# -------------------------------------
def create_collection():
    print("\n📦 Creating Qdrant collection...")
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(
            size=1024,
            distance=Distance.COSINE
        )
    )

def save_chunk_to_qdrant(chunk, chunk_id, url):
    vector = embed(chunk)

    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(
                id=chunk_id,
                vector=vector,
                payload={
                    "url": url,
                    "text": chunk,
                    "chunk_id": chunk_id
                }
            )
        ]
    )

# -------------------------------------
# MAIN INGESTION PIPELINE
# -------------------------------------
def ingest_book():
    urls = get_all_urls(SITEMAP_URL)
    create_collection()

    global_id = 1

    for url in urls:
        print("\n📄 Processing:", url)
        text = extract_text_from_url(url)
        if not text:
            continue

        chunks = chunk_text(text)

        for chunk in chunks:
            save_chunk_to_qdrant(chunk, global_id, url)
            print(f"✅ Saved chunk {global_id}")
            global_id += 1

    print("\n🎉 Ingestion completed!")
    print("Total chunks stored:", global_id - 1)

# -------------------------------------
if __name__ == "__main__":
    ingest_book()


# import os
# import requests
# from bs4 import BeautifulSoup
# import xml.etree.ElementTree as ET
# from typing import List, Dict, Any
# import cohere
# from qdrant_client import QdrantClient
# from qdrant_client.http import models
# from qdrant_client.models import PointStruct
# import logging
# from urllib.parse import urljoin, urlparse
# import time
# import uuid
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# class DocusaurusEmbeddingPipeline:
#     def __init__(self):
#         # Initialize Cohere client
#         self.cohere_client = cohere.Client(api_key=os.getenv("COHERE_API_KEY"))

#         # Initialize Qdrant client
#         qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
#         qdrant_api_key = os.getenv("QDRANT_API_KEY")

#         if qdrant_api_key:
#             self.qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
#         else:
#             self.qdrant_client = QdrantClient(url=qdrant_url)

#         # Target URL for the Docusaurus site
#         self.target_url = "https://ai-textbook-six.vercel.app/"

#     def get_all_urls(self, base_url: str) -> List[str]:
#         """
#         Extract all URLs from a deployed Docusaurus site using sitemap
#         """
#         urls = []

#         try:
#             # Try to get URLs from sitemap first
#             sitemap_url = urljoin(base_url, "sitemap.xml")
#             response = requests.get(sitemap_url)

#             if response.status_code == 200:
#                 root = ET.fromstring(response.content)

#                 # Handle both sitemap index and regular sitemap
#                 if root.tag.endswith('sitemapindex'):
#                     # If it's a sitemap index, get individual sitemaps
#                     for sitemap in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
#                         sitemap_response = requests.get(sitemap.text)
#                         if sitemap_response.status_code == 200:
#                             sitemap_root = ET.fromstring(sitemap_response.content)
#                             for url_elem in sitemap_root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
#                                 urls.append(url_elem.text)
#                 else:
#                     # Regular sitemap
#                     for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
#                         urls.append(url_elem.text)
#             else:
#                 # Fallback: try to crawl the site by looking for links
#                 logger.info(f"Sitemap not found at {sitemap_url}, attempting to crawl...")

#                 # Get the main page and extract links
#                 response = requests.get(base_url)
#                 soup = BeautifulSoup(response.content, 'html.parser')

#                 # Find all links within the page
#                 for link in soup.find_all('a', href=True):
#                     href = link['href']
#                     full_url = urljoin(base_url, href)

#                     # Only add URLs from the same domain
#                     if urlparse(full_url).netloc == urlparse(base_url).netloc:
#                         if full_url not in urls and full_url.startswith(base_url):
#                             urls.append(full_url)

#         except Exception as e:
#             logger.error(f"Error getting URLs from {base_url}: {e}")

#         return urls

#     def extract_text_from_url(self, url: str) -> str:
#         """
#         Extract and clean text from a single URL
#         """
#         try:
#             response = requests.get(url)
#             response.raise_for_status()

#             soup = BeautifulSoup(response.content, 'html.parser')

#             # Remove script and style elements
#             for script in soup(["script", "style"]):
#                 script.decompose()

#             # Look for main content containers typically used in Docusaurus
#             # Try multiple selectors to find the main content
#             content_selectors = [
#                 'article',  # Main article content
#                 '.markdown',  # Docusaurus markdown content
#                 '.theme-doc-markdown',  # Docusaurus theme markdown
#                 '.main-wrapper',  # Main content wrapper
#                 'main',  # Main content area
#                 '.container',  # Container with content
#                 '[role="main"]'  # Main role
#             ]

#             content = ""
#             for selector in content_selectors:
#                 elements = soup.select(selector)
#                 if elements:
#                     for element in elements:
#                         # Get text but try to preserve some structure
#                         text = element.get_text(separator=' ', strip=True)
#                         if len(text) > len(content):
#                             content = text
#                     break

#             # If no specific content found, get all body text
#             if not content:
#                 body = soup.find('body')
#                 if body:
#                     content = body.get_text(separator=' ', strip=True)

#             # Clean up the text
#             lines = (line.strip() for line in content.splitlines())
#             chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
#             content = ' '.join(chunk for chunk in chunks if chunk)

#             return content

#         except Exception as e:
#             logger.error(f"Error extracting text from {url}: {e}")
#             return ""

#     def chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
#         """
#         Split text into chunks with overlap to preserve context
#         """
#         if len(text) <= chunk_size:
#             return [text]

#         chunks = []
#         start = 0

#         while start < len(text):
#             end = start + chunk_size
#             chunk = text[start:end]
#             chunks.append(chunk)

#             # Move start position by chunk_size - overlap
#             start = end - overlap

#             # If remaining text is less than chunk_size, add it as final chunk
#             if len(text) - start < chunk_size:
#                 if start < len(text):
#                     final_chunk = text[start:]
#                     if final_chunk not in chunks:  # Avoid duplicate chunks
#                         chunks.append(final_chunk)
#                 break

#         return chunks

#     def embed(self, text: str) -> List[float]:
#         """
#         Generate embedding for text using Cohere
#         """
#         try:
#             response = self.cohere_client.embed(
#                 texts=[text],
#                 model="embed-multilingual-v3.0",  # Using multilingual model
#                 input_type="search_document"  # Optimize for search
#             )
#             return response.embeddings[0]  # Return the first (and only) embedding
#         except Exception as e:
#             logger.error(f"Error generating embedding for text: {e}")
#             return []

#     def create_collection(self, collection_name: str = "rag_embedding"):
#         """
#         Create a Qdrant collection for storing embeddings
#         """
#         try:
#             # Check if collection already exists
#             collections = self.qdrant_client.get_collections()
#             collection_names = [col.name for col in collections.collections]

#             if collection_name in collection_names:
#                 logger.info(f"Collection {collection_name} already exists")
#                 return

#             # Create collection with appropriate vector size (1024 for Cohere embeddings)
#             self.qdrant_client.create_collection(
#                 collection_name=collection_name,
#                 vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE)
#             )

#             logger.info(f"Created collection {collection_name} with 1024-dimension vectors")

#         except Exception as e:
#             logger.error(f"Error creating collection {collection_name}: {e}")
#             raise

#     def save_chunk_to_qdrant(self, content: str, url: str, embedding: List[float], position: int, collection_name: str = "rag_embedding"):
#         """
#         Save a text chunk with its embedding to Qdrant
#         """
#         try:
#             # Generate a unique ID for the point
#             point_id = str(uuid.uuid4())

#             # Prepare the payload with metadata
#             payload = {
#                 "content": content,
#                 "url": url,
#                 "position": position,
#                 "created_at": time.time()
#             }

#             # Create and upload the point to Qdrant
#             points = [PointStruct(
#                 id=point_id,
#                 vector=embedding,
#                 payload=payload
#             )]

#             self.qdrant_client.upsert(
#                 collection_name=collection_name,
#                 points=points
#             )

#             logger.info(f"Saved chunk to Qdrant: {url} (position {position})")
#             return True

#         except Exception as e:
#             logger.error(f"Error saving chunk to Qdrant: {e}")
#             return False

# def main():
#     """
#     Main function to execute the complete pipeline
#     """
#     logger.info("Starting Docusaurus Embedding Pipeline...")

#     # Initialize the pipeline
#     pipeline = DocusaurusEmbeddingPipeline()

#     try:
#         # Step 1: Create the Qdrant collection
#         logger.info("Creating Qdrant collection...")
#         pipeline.create_collection("rag_embedding")

#         # Step 2: Get all URLs from the target Docusaurus site
#         logger.info(f"Extracting URLs from {pipeline.target_url}...")
#         urls = pipeline.get_all_urls(pipeline.target_url)

#         if not urls:
#             logger.warning(f"No URLs found at {pipeline.target_url}")
#             return

#         logger.info(f"Found {len(urls)} URLs to process")

#         # Step 3: Process each URL
#         total_chunks = 0
#         for i, url in enumerate(urls):
#             logger.info(f"Processing URL {i+1}/{len(urls)}: {url}")

#             # Extract text from the URL
#             text_content = pipeline.extract_text_from_url(url)

#             if not text_content:
#                 logger.warning(f"No content extracted from {url}")
#                 continue

#             logger.info(f"Extracted {len(text_content)} characters from {url}")

#             # Chunk the text
#             chunks = pipeline.chunk_text(text_content)
#             logger.info(f"Created {len(chunks)} chunks from {url}")

#             # Process each chunk
#             for j, chunk in enumerate(chunks):
#                 if not chunk.strip():
#                     continue

#                 # Generate embedding
#                 embedding = pipeline.embed(chunk)

#                 if not embedding:
#                     logger.error(f"Failed to generate embedding for chunk {j} of {url}")
#                     continue

#                 # Save to Qdrant
#                 success = pipeline.save_chunk_to_qdrant(
#                     content=chunk,
#                     url=url,
#                     embedding=embedding,
#                     position=j
#                 )

#                 if success:
#                     total_chunks += 1
#                     logger.info(f"Successfully saved chunk {j} of {url} to Qdrant")
#                 else:
#                     logger.error(f"Failed to save chunk {j} of {url} to Qdrant")

#         logger.info(f"Pipeline completed successfully! Total chunks saved: {total_chunks}")

#     except Exception as e:
#         logger.error(f"Pipeline failed with error: {e}")
#         raise

# if __name__ == "__main__":
#     main()


# import os
# import time
# import uuid
# import logging
# import requests
# from bs4 import BeautifulSoup
# from typing import List
# import cohere
# from dotenv import load_dotenv
# from qdrant_client import QdrantClient
# from qdrant_client.http import models
# from qdrant_client.models import PointStruct

# # ---------------- SETUP ---------------- #

# load_dotenv()
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # ---------------- PIPELINE ---------------- #

# class DocusaurusRAGPipeline:
#     def __init__(self):
#         self.cohere = cohere.Client(os.getenv("COHERE_API_KEY"))

#         self.qdrant = QdrantClient(
#             url=os.getenv("QDRANT_URL"),
#             api_key=os.getenv("QDRANT_API_KEY")
#         )

#         # ✅ HARD-CODED VALID DOC URLS ONLY
#         self.urls: List[str] = [
#             "https://ai-textbook-six.vercel.app/",
#             "https://ai-textbook-six.vercel.app/docs/book/course-overview",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Advanced/nvidia-isaac-platform",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Advanced/advanced-simulation-unity-omniverse",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Advanced/vision-language-action-systems",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Advanced/humanoid-locomotion-control",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Advanced/capstone-autonomous-humanoid",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/intro",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/foundations-of-physical-ai",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/humanoid-sensors-overview",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/ros2-fundamentals",
#             "https://ai-textbook-six.vercel.app/docs/book/Physical%20AI%20&%20Humanoid%20Robotics_Basics/simulation-basics-gazebo-unity"
#         ]

#     # -------- QDRANT COLLECTION -------- #

#     def create_collection(self, name="rag_embedding"):
#         existing = [c.name for c in self.qdrant.get_collections().collections]
#         if name in existing:
#             logger.info("Qdrant collection already exists")
#             return

#         self.qdrant.create_collection(
#             collection_name=name,
#             vectors_config=models.VectorParams(
#                 size=1024,
#                 distance=models.Distance.COSINE
#             )
#         )
#         logger.info("Qdrant collection created")

#     # -------- TEXT EXTRACTION -------- #

#     def extract_text(self, url: str) -> str:
#         try:
#             r = requests.get(url, timeout=10)
#             r.raise_for_status()
#         except Exception as e:
#             logger.error(f"Failed URL {url}: {e}")
#             return ""

#         soup = BeautifulSoup(r.text, "html.parser")

#         for tag in soup(["script", "style", "nav", "footer"]):
#             tag.decompose()

#         main = soup.find("main") or soup.find("article")
#         if not main:
#             return ""

#         return main.get_text(" ", strip=True)

#     # -------- CHUNKING -------- #

#     def chunk(self, text, size=900, overlap=150):
#         chunks = []
#         i = 0
#         while i < len(text):
#             chunks.append(text[i:i+size])
#             i += size - overlap
#         return chunks

#     # -------- EMBEDDING -------- #

#     def embed(self, text):
#         return self.cohere.embed(
#             texts=[text],
#             model="embed-multilingual-v3.0",
#             input_type="search_document"
#         ).embeddings[0]

#     # -------- SAVE -------- #

#     def save(self, content, url, vector, pos):
#         self.qdrant.upsert(
#             collection_name="rag_embedding",
#             points=[
#                 PointStruct(
#                     id=str(uuid.uuid4()),
#                     vector=vector,
#                     payload={
#                         "url": url,
#                         "position": pos,
#                         "content": content,
#                         "created_at": time.time()
#                     }
#                 )
#             ]
#         )

# # ---------------- MAIN ---------------- #

# def main():
#     logger.info("🚀 Starting HARD-CODED RAG Pipeline")

#     pipe = DocusaurusRAGPipeline()
#     pipe.create_collection()

#     total = 0
#     for idx, url in enumerate(pipe.urls, 1):
#         logger.info(f"[{idx}/{len(pipe.urls)}] {url}")

#         text = pipe.extract_text(url)
#         if not text:
#             continue

#         chunks = pipe.chunk(text)
#         for i, chunk in enumerate(chunks):
#             vector = pipe.embed(chunk)
#             pipe.save(chunk, url, vector, i)
#             total += 1

#     logger.info(f"✅ DONE — Total chunks saved to Qdrant: {total}")

# if __name__ == "__main__":
#     main()



# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
# from agents import set_tracing_disabled
# import os
# from dotenv import load_dotenv
# import uvicorn

# # -------------------------------
# # Setup
# # -------------------------------


# set_tracing_disabled(disabled=True)
# load_dotenv()

# gemini_api_key = os.getenv("GEMINI_API_KEY")
# if not gemini_api_key:
#     raise ValueError("GEMINI_API_KEY is not set in your .env file.")

# provider = AsyncOpenAI(
#     api_key=gemini_api_key,
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
# )

# model = OpenAIChatCompletionsModel(
#     model="gemini-2.0-flash",
#     openai_client=provider
# )

# # -------------------------------
# # Define Simple Agent
# # -------------------------------
# agent = Agent(
#     name="PhysicalAIAssistant",
#     instructions="""
# You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
# Answer user questions based on your knowledge of the textbook.
# If the answer is not known, say "I don't know".
# Provide concise and clear explanations.
# """,
#     model=model
# )

# # -------------------------------
# # FastAPI Setup
# # -------------------------------
# app = FastAPI(title="Physical AI Textbook Assistant")

# class QuestionRequest(BaseModel):
#     question: str

# class AnswerResponse(BaseModel):
#     answer: str

# @app.post("/ask", response_model=AnswerResponse)
# def ask_agent(request: QuestionRequest):
#     question = request.question.strip()
#     if not question:
#         raise HTTPException(status_code=400, detail="Question cannot be empty")

#     # Run agent synchronously
#     result = Runner.run_sync(agent, input=question)
#     return AnswerResponse(answer=result.final_output)

# @app.get("/")
# def root():
#     return {"message": "Welcome to Physical AI & Humanoid Robotics Assistant. POST /ask with {question} to get answers."}

# # -------------------------------
# # Main
# # -------------------------------
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
