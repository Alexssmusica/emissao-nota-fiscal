export function jsonOneLevel(obj: Record<string, any>): string {
  const result: Record<string, string> = {};

  for (const key of Object.keys(obj)) {
    let logStr: string = obj[key]?.toString() ?? 'null';
    if (logStr.length > 500) {
      logStr = logStr.substring(0, 499);
    }
    result[key] = logStr;
  }

  return JSON.stringify(result);
}
