/**
 * Default visibility status for the result columns.
 * This is also responsible for the table layout ie. order matters.
 */
export const COLUMNS = {
  rank: true,
  player: true,
  score: true,
  mga: false,
  pg: false,
  pga: false,
} as const;

export const QUERY_PATTERN = '^(\\d+) (.+) (\\d+) (\\d+) (\\d+) (\\d+)$';
