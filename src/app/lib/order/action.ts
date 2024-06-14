'use server'

import apiService from "../apiService";

export async function getVendorOrders() {
    try {
        const response = await apiService({
            url: '/vendor/orders',
            method: 'GET',
            options: { authenticate: false }
        });
        return response;
    } catch (e) {
        console.log('error in getting on md', e);
        return false;
    }

}