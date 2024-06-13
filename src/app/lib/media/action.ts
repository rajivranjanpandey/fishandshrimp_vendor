'use server'

import apiService from "../apiService";
import { API_BASE_URL, CLIENT_TOKEN } from "../constants";

export async function uploadMediaToCDN(fileObject: File) {
    try {
        console.log(fileObject);
        const fileType = fileObject.type;
        const fileBase64 = Buffer.from(await fileObject.arrayBuffer()).toString('base64');
        const formattedBase64Str = `data:${fileType};base64,` + fileBase64;
        const response = await apiService({
            url: '/media',
            method: 'POST',
            body: [formattedBase64Str],
            options: { authenticate: false }
        });
        console.log({ response });
        return response;
    } catch (e) {
        console.log('error in getting on md', e);
        return false;
    }

}