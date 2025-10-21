const g: any = globalThis as any;
["window", "document", "navigator"].forEach((k) => {
  if (k in g && typeof g[k] !== "object") {
    try {
      delete g[k];
    } catch {
      g[k] = {};
    }
  }
});

// Optional: load Angular zone testing if available
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("zone.js/testing");
} catch {
  // ignore if not installed in this environment
}
