/**
 * Tiny in-memory LRU used by the SSR style collector.
 * Recency is tracked by Map insertion order.
 */
export class LruCache<V> {
  private readonly store = new Map<string, V>()

  constructor(private readonly max = 500) {}

  get(key: string): V | undefined {
    const value = this.store.get(key)
    if (value === undefined)
      return undefined
    this.store.delete(key)
    this.store.set(key, value)
    return value
  }

  set(key: string, value: V): void {
    if (this.store.has(key))
      this.store.delete(key)
    this.store.set(key, value)
    if (this.store.size > this.max) {
      const oldest = this.store.keys().next().value
      if (oldest !== undefined)
        this.store.delete(oldest)
    }
  }

  has(key: string): boolean {
    return this.store.has(key)
  }

  get size(): number {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }
}
