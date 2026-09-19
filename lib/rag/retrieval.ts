import fs from "node:fs";
import path from "node:path";

export interface RetrievedChunk {
  source: string;
  text: string;
  score: number;
  embedding?: number[];
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

interface KnowledgeChunk {
  source: string;
  text: string;
  terms: string[];
}

const KB_DIR = path.join(
  process.cwd(),
  "data",
  "knowledge-base"
);

const MIN_TERM_LENGTH = 2;
const DEFAULT_TOP_K = 3;

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "what",
  "who",
  "does",
  "did",
  "how",
  "why",
  "her",
  "she",
  "has",
  "have",
  "about",
  "tell",
  "this",
  "that",
  "are",
  "was",
  "is",
  "in",
  "of",
  "to",
  "a",
  "an",
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .map((term) => term.trim())
    .filter(
      (term) =>
        term.length >= MIN_TERM_LENGTH &&
        !STOP_WORDS.has(term)
    );
}

function loadChunks(): KnowledgeChunk[] {
  if (!fs.existsSync(KB_DIR)) {
    console.warn(
      `Knowledge-base directory not found: ${KB_DIR}`
    );
    return [];
  }

  const files = fs
    .readdirSync(KB_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() && entry.name.endsWith(".md")
    )
    .map((entry) => entry.name);

  const chunks: KnowledgeChunk[] = [];

  for (const file of files) {
    const filePath = path.join(KB_DIR, file);

    let content: string;

    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error(
        `Failed to read knowledge-base file: ${file}`,
        error
      );
      continue;
    }

    const parts = content
      .split(/\n(?=##?\s)/)
      .map((part) => part.trim())
      .filter(Boolean);

    for (const part of parts) {
      chunks.push({
        source: file,
        text: part,
        terms: tokenize(part),
      });
    }
  }

  return chunks;
}

let cachedChunks: KnowledgeChunk[] | null = null;

function getChunks(): KnowledgeChunk[] {
  if (cachedChunks === null) {
    cachedChunks = loadChunks();
  }

  return cachedChunks;
}

/**
 * Clears the in-memory KB cache.
 * Useful during development after editing markdown files.
 */
export function clearRetrievalCache(): void {
  cachedChunks = null;
}

function scoreChunk(
  queryTerms: string[],
  chunk: KnowledgeChunk
): number {
  if (!queryTerms.length || !chunk.terms.length) {
    return 0;
  }

  const termSet = new Set(chunk.terms);
  let score = 0;

  for (const term of queryTerms) {
    if (termSet.has(term)) {
      score += 3;
      continue;
    }

    // Small partial-match bonus for related terms.
    if (
      chunk.terms.some(
        (chunkTerm) =>
          chunkTerm.includes(term) ||
          term.includes(chunkTerm)
      )
    ) {
      score += 1;
    }
  }

  // Bonus when multiple query terms match.
  const uniqueMatches = new Set(
    queryTerms.filter((term) =>
      termSet.has(term)
    )
  ).size;

  if (uniqueMatches >= 2) {
    score += uniqueMatches * 2;
  }

  return score;
}

export function retrieve(
  query: string,
  topK: number = DEFAULT_TOP_K
): RetrievedChunk[] {
  const cleanQuery = query.trim();

  if (!cleanQuery || topK <= 0) {
    return [];
  }

  const chunks = getChunks();

  if (!chunks.length) {
    return [];
  }

  const queryTerms = tokenize(cleanQuery);

  const scored = chunks
    .map((chunk) => ({
      source: chunk.source,
      text: chunk.text,
      score: scoreChunk(queryTerms, chunk),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}