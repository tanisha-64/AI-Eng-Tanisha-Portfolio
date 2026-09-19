# Projects

## RAGTrack (CVPR 2026) — Language-Aware RGB-Thermal Object Tracking (Research)
Research Internship at IIT (BHU), Varanasi (May 2026 – Present). Reviewed 6+ SOTA Vision-Language and RGB-Thermal tracking papers. Reproduced RAGTrack in PyTorch with Multi-modal Transformer Encoder, Adaptive Token Fusion, and Context-aware Reasoning Module with RAG, CLIP, and Qwen2.5-VL. Engineered training/inference/evaluation pipelines for LasHeR (1,224 RGB-T video pairs, 730K+ frame pairs) and RGBT210 using Vision Transformers and multi-GPU Linux workflows. Validated on 210 sequences / 104,706 frames, achieving 86.16% Precision (PR@20px) and 58.89% Success (AUC). Proposed Behavioral Reasoning & Adaptive Fusion enhancement.

## CodeMentor AI — AI-Native Software Engineering Platform (Completed)
Full-stack platform architected from scratch: 20+ backend modules, 25+ frontend pages, 6+ AI-powered workflows for coding practice, AI code review, debugging, and mentoring. Built self-populating AI content and RAG pipelines with ChromaDB and Cohere embeddings. Developed custom Python execution tracer (sys.settrace) and asynchronous LLM code-review pipeline via FastAPI background tasks. Hardened authentication with JWT token rotation, bcrypt hashing, and Redis rate limiting. Deployed on Render & Vercel. Stack: FastAPI, React/TypeScript, PostgreSQL, Redis, ChromaDB, LLMs, RAG.
GitHub: https://github.com/tanisha-64/AI-SWE-SIMULATION-PLATFORM
Live Demo: https://ai-swe-simulation-platform-two.vercel.app/

## AI Video Intelligence Platform — Multimodal RAG & Video Understanding (Completed)
End-to-end multimedia intelligence pipeline supporting 4+ input sources and 10+ audio/video formats, converting YouTube videos, podcasts, and meetings into searchable knowledge using Whisper and RAG. Built retrieval-grounded knowledge layer with Sentence Transformers and ChromaDB for semantic QA over transcripts. Generates 8 structured LLM outputs using Mistral AI with automated media processing via yt-dlp and FFmpeg. Stack: Python, Whisper, Mistral AI, LangChain, ChromaDB, Sentence Transformers, Streamlit.
GitHub: https://github.com/tanisha-64/AI-Video-Intelligence-Platform
