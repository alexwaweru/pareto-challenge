import httpx
import sqlite_utils
import struct

OPENAI_TOKEN = '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'
DATABASE_PATH = '../db.sqlite3'
EMBEDDING_TABLE_NAME = 'embeddings'


def cosine_similarity(a, b):
    dot_product = sum(x * y for x, y in zip(a, b))
    magnitude_a = sum(x * x for x in a) ** 0.5
    magnitude_b = sum(x * x for x in b) ** 0.5
    return dot_product / (magnitude_a * magnitude_b)


def decode(blob):
    return struct.unpack("f" * 1536, blob)


def encode(values):
    return struct.pack("f" * 1536, *values)


def generate_embeddings(text_to_embed_id: int, text_to_embed: str):
    """
    Convert text f'{title}. {description}' into embeddings and store in db.
    """
    # connect to database
    db = sqlite_utils.Database(DATABASE_PATH)
    table = db[EMBEDDING_TABLE_NAME]
    if not table.exists():
        table.create({"id": int, "embedding": bytes}, pk="id")

    # send request to openai embeddings api
    response = httpx.post(
        "https://api.openai.com/v1/embeddings",
        headers={
            "Authorization": f"Bearer {OPENAI_TOKEN}",
            "Content-Type": "application/json",
        },
        json={"input": text_to_embed, "model": "text-embedding-ada-002"},
    )
    data = response.json()
    result = data["data"]

    # store embedding in the database
    embedding = encode(result["embedding"])
    table.insert({"id": text_to_embed_id, "embedding": embedding}, replace=True)


def semantic_search(search_string: str, count: int):
    """
    Search embeddings using cosine similarity.
    """
    # connect to database
    db = sqlite_utils.Database(DATABASE_PATH)
    table = db[EMBEDDING_TABLE_NAME]

    # fetch the embedding for the search string
    response = httpx.post(
        "https://api.openai.com/v1/embeddings",
        headers={
            "Authorization": f"Bearer {OPENAI_TOKEN}",
            "Content-Type": "application/json",
        },
        json={"input": search_string, "model": "text-embedding-ada-002"},
    )
    data = response.json()
    vector = data["data"][0]["embedding"]

    # calculate cosine similarity with everything in the database table
    other_vectors = [(row["id"], decode(row["embedding"])) for row in table.rows]
    results = [
        (id, cosine_similarity(vector, other_vector))
        for id, other_vector in other_vectors
    ]
    results.sort(key=lambda r: r[1], reverse=True)
    return results[:count]
