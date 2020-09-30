export class ApiResponse<T> {
    data: T;
    error: boolean;
    messages: string[];
}
