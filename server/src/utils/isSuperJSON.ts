export const isSuperJSON = (obj: any): boolean => (
  obj !== null &&
  typeof obj === 'object' &&
  'json' in obj &&
  'meta' in obj &&
  typeof obj.meta === 'object'
);