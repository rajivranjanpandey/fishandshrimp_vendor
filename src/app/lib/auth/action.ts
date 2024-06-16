'use server'

import { cookies } from "next/headers";
import apiService from "../apiService";
import { permanentRedirect, redirect } from "next/navigation";

export async function signinAction(payload: FormData) {
    const signInPayload: { [key: string]: any } = {};
    signInPayload.mobile = payload.get('phone');
    signInPayload.password = payload.get('password');
    signInPayload.login_as = 'VENDOR';
    console.log({ signInPayload });
    const singnInResponse = await apiService({
        url: `/client/role/login`,
        method: 'POST',
        body: signInPayload,
        options: { authenticate: false }
    });
    if (singnInResponse.token) {
        // cookies().set('session', singnInResponse.token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24 * 7, // One week
        //     path: '/',
        //   })
        console.log({ singnInResponse });
        cookies().set("token", singnInResponse.token);
        permanentRedirect('/vendor/orders');
    } else {
        return { message: 'Invalid mobile number' }
    }

}
export async function logoutAction({ cookieDelete = true }: { cookieDelete?: boolean }) {
    if (cookieDelete)
        cookies().delete('token');
    permanentRedirect('/vendor/login');
}