/**
 * Configuration options for the bind decorator.
 */
export interface BindConfig {
  /**
   * If true, the method is bound lazily on first access.
   * If false (default), the method is bound at decoration time.
   */
  lazy?: boolean;
}
