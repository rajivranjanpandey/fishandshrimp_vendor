'use server'

import { permanentRedirect, redirect } from "next/navigation";
import apiService from "../apiService";
import { uploadMediaToCDN } from "../media/action";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function getBannersAction() {
    console.log('banners action called');
    const bannerCreateResponse = await apiService({
        url: '/admin/banners',
        method: 'GET',
        options: { authenticate: true }
    });
    if (bannerCreateResponse)
        return bannerCreateResponse;
    else
        return [];
}
export async function getBannerDetailsAction(bannerId: string) {
    console.log('banners action called');
    const bannerCreateResponse = await apiService({
        url: `/admin/banner/${bannerId}`,
        method: 'GET',
        options: { authenticate: true }
    });
    if (bannerCreateResponse)
        return bannerCreateResponse;
    else
        return null;
}
export async function createBannerAction(payload: FormData) {
    const bannerImageFile = payload.get('image') as File;
    try {
        const mediaResponse = await uploadMediaToCDN(bannerImageFile);
        console.log({ mediaResponse });
        if (mediaResponse) {
            const bannerCreatePayload: { [key: string]: any } = {};
            payload.forEach((value, key) => {
                if (key === 'image') {
                    bannerCreatePayload[key] = mediaResponse[0].url;
                } else if (key === "banner_zipcodes") {
                    bannerCreatePayload[key] = value.split(',');
                } else if (key === "banner_data") {
                    if (value)
                        bannerCreatePayload[key] = value ? JSON.parse(value) : null;
                } else if (key !== 'bannerId') {
                    bannerCreatePayload[key] = value;
                }
            });
            console.log({ bannerCreatePayload });
            const bannerCreateResponse = await apiService({
                url: '/admin/banners',
                method: 'POST',
                body: { banners: [bannerCreatePayload] },
                options: { authenticate: true }
            });
            console.log({ bannerCreateResponse }, bannerCreateResponse.message === 'Banners Created')
            if (bannerCreateResponse.message === 'Banners Created')
                return true;
            else
                return false;
            // NextResponse.json(bannerCreatePayload, { status: 200 });
            // if (bannerCreateResponse)
            //     return true;
            // else
            //     return false;
        }
    } catch (e) {
        console.log('error in banner create', e);
        return false;
    }

}
export async function modifyBannerAction(payload: FormData) {
    const bannerImageFile = payload.get('image') as File;
    try {
        const mediaResponse = await uploadMediaToCDN(bannerImageFile);
        if (mediaResponse) {
            const bannerUpdatePayload: { [key: string]: any } = {};
            payload.forEach((value, key) => {
                if (key === 'image') {
                    bannerUpdatePayload[key] = mediaResponse[0].url;
                } else if (key === "banner_zipcodes") {
                    bannerUpdatePayload[key] = value.split(',');
                } else if (key === "banner_data") {
                    bannerUpdatePayload[key] = JSON.parse(value);
                } else if (key !== 'bannerId') {
                    bannerUpdatePayload[key] = value;
                }
            });
            console.log({ bannerUpdatePayload });
            const bannerCreateResponse = await apiService({
                url: `/admin/banners/${payload.get('bannerId')}`,
                method: 'PUT',
                body: bannerUpdatePayload,
                options: { authenticate: true }
            });
            permanentRedirect('/admin/banners');
            // return true;
        }
    } catch (e) {
        console.log('error in banner create', e);
    }

}