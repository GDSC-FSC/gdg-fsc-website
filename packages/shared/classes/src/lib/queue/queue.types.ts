export interface Node<T> {
  next: Node<T>;
  value: T;
}