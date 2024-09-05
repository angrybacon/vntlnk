type Chunk = {
  confidence: number;
  id: number;
  text: string;
};

export type Line = Chunk & { words: Chunk[] };
