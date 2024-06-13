import { CreateCouponType, UpdateCouponType } from "@/types/coupon";
import apiService from "../apiService";

export async function getCoupons() {
    try {
        const response = await apiService({
            url: `/admin/coupons`,
            method: 'GET',
            options: { authenticate: true }
        });
        if (response) {
            return response.message;
        } else {
            return []
        }
    } catch (e) {
        console.log('error in getting coupons', e);
        return [];
    }
}
export async function createAdminCoupon(payload: CreateCouponType) {
    try {
        const response = await apiService({
            url: `/admin/coupon`,
            method: 'POST',
            body: payload,
            options: { authenticate: true }
        });
        console.log('response from action', response)
        if (response) {
            return response;
        } else {
            return false
        }
    } catch (e) {
        console.log('error in creating coupon', e);
        return [];
    }
}
export async function getAdminCouponDetails(payload: { id: string }) {
    try {
        const response = await apiService({
            url: `/admin/coupon/${payload.id}`,
            method: 'GET',
            options: { authenticate: true }
        });
        console.log('response from action', response)
        if (response) {
            return response;
        } else {
            return false
        }
    } catch (e) {
        console.log('error in fetching coupon details', e);
        return [];
    }
}
export async function updateAdminCoupon(payload: UpdateCouponType) {
    try {
        console.log('update_called', payload);
        const response = await apiService({
            url: `/admin/coupon/${payload.id}`,
            method: 'PUT',
            body: payload.data,
            options: { authenticate: true }
        });
        console.log('response from action', response)
        if (response) {
            return response;
        } else {
            return false
        }
    } catch (e) {
        console.log('error in updating coupon', e);
        return [];
    }
}
export async function deleteAdminCoupon(payload: { id: number }) {
    try {
        console.log('update_called', payload);
        const response = await apiService({
            url: `/admin/coupon/${payload.id}`,
            method: 'DELETE',
            options: { authenticate: true }
        });
        console.log('response from action', response)
        if (response) {
            return response;
        } else {
            return false
        }
    } catch (e) {
        console.log('error in updating coupon', e);
        return [];
    }
}