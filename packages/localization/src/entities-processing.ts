import he from 'he';

/**
 * HTML entity decoder
 * &quot;Coffee&quot; => "Coffee"
 */
export const decodeEntities = (value: string): string => he.decode(value);
