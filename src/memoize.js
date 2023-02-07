const generateKey = (args) => args.map((ell) => ell.toString()).join("|");

export const memoize = (callback) => {
  const cache = new Map();
  return (...args) => {
    const key = generateKey(args);
    const value = cache.get(key);
    if (cache.has(key)) return value;
    const result = callback(...args);
    cache.set(key, result);
    return result;
  };
};
