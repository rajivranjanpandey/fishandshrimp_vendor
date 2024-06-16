'use server'

import { permanentRedirect } from "next/navigation";
import apiService from "../apiService";
type Query = {
    page: number;
    size: number;
    start_date?: number;
    end_date?: number;
    state?: string;
}
export async function getVendorOrders(query: Query) {
    try {
        const queryArr = Object.keys(query);
        const queryParams = queryArr.reduce((acc, queryKey, index) => {
            acc += `${queryKey}=${query[queryKey]}${queryArr.length - 1 === index ? '' : '&'}`;
            return acc;
        }, '')
        const response = await apiService({
            url: `/vendor/orders?${queryParams}`,
            method: 'GET',
            options: { authenticate: true }
        });
        if (response) {
            if (response.action === 'LOGOUT')
                return { authentication_message: 'Your session has expired, Login to Continue' }
            else
                return response;
        } else {
            return { data: [] };
        }
    } catch (e) {
        console.log('error in getting on md', e);
        return false;
    }

}
export async function getVendorDeliveryBoys() {
    try {
        const response = await apiService({
            url: `/vendor/delivery-agents`,
            method: 'GET',
            options: { authenticate: true }
        });
        console.log({ response });
        if (response) {
            if (response.action === 'LOGOUT')
                permanentRedirect('/auth/login')
            else
                return response.data;
        } else {
            return [];
        }
    } catch (e) {
        console.log('error in getting on md', e);
        return [];
    }

}