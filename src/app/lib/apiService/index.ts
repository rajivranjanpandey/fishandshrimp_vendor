// import { cookies } from "next/headers";
import { cookies } from "next/headers";
import { API_BASE_URL, CLIENT_TOKEN } from "../constants";
import { logoutAction } from "../auth/action";

interface ApiHeaders {
    [key: string]: string | undefined;
    'Content-Type': string;
    'Client-Token': string;
    'X-Auth-Token'?: string | undefined;
}
const DEFAULT_HEADER: ApiHeaders = {
    'Content-Type': 'application/json',
    'Client-Token': CLIENT_TOKEN as string
}
interface ServiceRequestOption {
    authenticate?: Boolean
}
interface ServiceRequest {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | "DELETE",
    body?: any,
    headers?: object,
    options: ServiceRequestOption
}
// export async function getApiHeaders(): Promise<ApiHeaders> {
//     const token = cookies().get('token');

//     return {
//       'X-Auth-Token': token?token.value:undefined,
//       'Content-Type': 'application/json',
//       'Client-Token':CLIENT_TOKEN||''
//     };
//   }
export default async function apiService(serviceRequest: ServiceRequest) {
    const apiBody = serviceRequest.body ? JSON.stringify(serviceRequest.body) : null;
    let apiHeader = DEFAULT_HEADER;
    if (serviceRequest.headers) {
        apiHeader = { ...DEFAULT_HEADER, ...serviceRequest.headers }
    }
    if (serviceRequest.options.authenticate) {
        const token = cookies().get('token')?.value;
        if (token) {
            apiHeader['X-Auth-Token'] = token;// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcxNzQ0NTcxMCwiZXhwIjoxNzE3ODA1NzEwfQ.R5uvhszl3TOV1R3wAFI-SzrlXAkt0cTTJZq3Q-6KXKo"//cookies().get('token');
            // Extracting the string value from RequestCookie
        }
    }
    // Convert ApiHeaders to HeadersInit (Record<string, string>)
    const headersInit: Record<string, string> = {};
    for (const key in apiHeader) {
        if (apiHeader[key] !== undefined) {
            headersInit[key] = apiHeader[key] as string;
        }
    }
    try {
        const rawResponse = await fetch(`${API_BASE_URL}${serviceRequest.url}`, { method: serviceRequest.method, body: apiBody, headers: headersInit });
        if (rawResponse.status === 401) {
            cookies().delete('token');
            return { 'action': 'LOGOUT' }
            // throw new Error(`Error in api with status ${rawResponse.status}`);

        } else if (rawResponse.status === 200 || rawResponse.status === 201) {
            const response = await rawResponse.json();
            return response;
        } else {
            const errorResponse = await rawResponse.json();
            console.log({ errorResponse });
            throw new Error(`Error in api with status ${rawResponse.status}`);
        }
    } catch (e) {
        console.error(`Error in ${serviceRequest.url}`, e);
        return false;
    }
}