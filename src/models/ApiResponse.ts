export interface ApiResponse<T> {
  data: T;
  error: boolean;
  messages: string[];
}
