import os
from dotenv import load_dotenv

from agents import (
    Agent,
    Runner,
    OpenAIChatCompletionsModel,
    AsyncOpenAI,
    set_tracing_disabled,
    function_tool,
    enable_verbose_stdout_logging,
)

import cohere
from qdrant_client import QdrantClient

# -------------------------------------
# ENV + LOGGING
# -------------------------------------
enable_verbose_stdout_logging()
load_dotenv()
set_tracing_disabled(disabled=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not all([GEMINI_API_KEY, COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY]):
    raise ValueError("❌ Missing environment variables")

# -------------------------------------
# GEMINI (via OpenAI-compatible endpoint)
# -------------------------------------
provider = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=provider
)

# -------------------------------------
# COHERE EMBEDDINGS
# -------------------------------------
EMBED_MODEL = "embed-english-v3.0"

cohere_client = cohere.Client(COHERE_API_KEY)

def get_embedding(text: str):
    response = cohere_client.embed(
        model=EMBED_MODEL,
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0]

# -------------------------------------
# QDRANT
# -------------------------------------
qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

@function_tool
def retrieve(query: str):
    embedding = get_embedding(query)

    result = qdrant.query_points(
        collection_name="humanoid_ai_book",
        query=embedding,
        limit=5
    )

    return [point.payload["text"] for point in result.points]

# -------------------------------------
# AGENT
# -------------------------------------
agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question, first call the tool `retrieve` with the user query.
Use ONLY the returned content from `retrieve` to answer.
If the answer is not in the retrieved content, say "I don't know".
""",
    model=model,
    tools=[retrieve]
)

# -------------------------------------
# RUN
# -------------------------------------
result = Runner.run_sync(
    agent,
    input="what is physical ai?",
)

print(result.final_output)


# from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
# from agents import set_tracing_disabled, enable_verbose_stdout_logging
# import os
# from dotenv import load_dotenv

# # -------------------------------
# # Setup
# # -------------------------------

# # Enable verbose logging (optional)
# enable_verbose_stdout_logging()

# # Disable tracing for cleaner output
# set_tracing_disabled(disabled=True)

# # Load environment variables
# load_dotenv()

# # -------------------------------
# # Gemini API Provider
# # -------------------------------
# gemini_api_key = os.getenv("GEMINI_API_KEY")
# if not gemini_api_key:
#     raise ValueError("GEMINI_API_KEY is not set in your .env file.")

# provider = AsyncOpenAI(
#     api_key=gemini_api_key,
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
# )

# # -------------------------------
# # Gemini Chat Model
# # -------------------------------
# model = OpenAIChatCompletionsModel(
#     model="gemini-2.0-flash",
#     openai_client=provider
# )

# # -------------------------------
# # Define Simple Textbook Agent
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
# # Interactive loop for multiple questions
# # -------------------------------
# def run_agent():
#     print("🦾 Physical AI & Humanoid Robotics Assistant")
#     print("Type 'exit' to quit.\n")
#     while True:
#         question = input("You: ").strip()
#         if question.lower() in ("exit", "quit"):
#             print("Exiting assistant. Goodbye!")
#             break

#         # Run agent synchronously
#         result = Runner.run_sync(agent, input=question)
#         print("Assistant:", result.final_output, "\n")

# # -------------------------------
# # Main
# # -------------------------------
# if __name__ == "__main__":
#     run_agent()
