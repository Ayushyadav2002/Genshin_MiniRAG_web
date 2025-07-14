⚡ Genshin MiniRAG — Offline AI Assistant

Genshin MiniRAG is an offline, privacy-focused AI assistant designed specifically for Genshin Impact players. Built with a lightweight architecture, it allows users to ask questions about gameplay, lore, characters, and more — all without any internet connection or cloud dependency.

<div align="center"> <img src="https://i.pinimg.com/736x/6c/2b/d1/6c2bd1e5f7ee3a7dcc8a039c7d9450f8.jpg" alt="Genshin Map" width="300" /> </div>
🚀 Features
🔒 Completely Offline — All processing is done locally, ensuring total privacy.

⚡ Fast & Lightweight — Optimized for devices with limited resources.

🎯 Contextual Semantic Search — Uses embeddings to retrieve precise game-related answers.

🖥️ Interactive Web Interface — Clean UI with a live chat demo built using HTML, CSS, and JS.

🧠 How It Works
The app runs a Mini Retrieval-Augmented Generation (RAG) pipeline locally:

Chunking: Genshin knowledge base is broken into meaningful sections.

Embedding: Each chunk is embedded using Sentence Transformers.

Vector DB: Stored in a FAISS/Chroma vector store.

Semantic Search: Matches user questions against embedded chunks.

Answer Generation: Uses a local LLM (e.g., GGUF, Mistral, etc.) to generate replies.
🛠 Installation & Setup
Requirements

Python 3.10+

At least 4 GB RAM (8 GB recommended)

(Optional) GPU for faster inference

# Open index.html in your browser
📌 Roadmap
 Support larger quantized models

 Mobile device compatibility

 Multilingual knowledge base

 Game client integration

 Custom lore upload tools

👥 Authors & Credits
💡 Backend AI: Akki-Maharaj
🎨 Frontend & Web UI: Ayush Yadav
