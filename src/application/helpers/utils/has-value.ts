export function hasValue(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value !== '';
}
