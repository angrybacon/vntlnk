/**
 * Default visibility status for the result columns.
 * Since input is not reliable in its layout, we don't care about column names
 * but about their index. Usually the relevant columns are the 3 first ones and
 * so are visible by default.
 * This also serves as model for the state variable that will hold the
 * visibility status.
 */
export const COLUMNS: [id: string, should: boolean][] = [
  ['', true],
  ['', true],
  ['', true],
];

export const QUERY_PATTERN = '^(\\d+) (.+) (\\d+) (\\d+) (\\d+) (\\d+)$';
