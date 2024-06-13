'use server'
interface Headers {
    [key: string]: string; // Allows any string key for header names and string values
}
type Request = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Headers;
    body?: Record<string, unknown> | string;

}
export async function apiRequestHandler(request: Request) {
    console.log(request.body);
}