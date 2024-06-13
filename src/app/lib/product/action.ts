import { DeleteProductAssets, UpdateProductAssets } from "@/types/product";
import apiService from "../apiService";

export async function getVendorProducts() {
    try {
        const response = await apiService({
            url: `/admin/products?status=APPROVED`,
            method: 'GET',
            options: { authenticate: true }
        });
        return response;
    } catch (e) {
        console.log('error in getting vendor products');
        return []
    }
}
export async function getVendorProductDetails({ id }: { id: string }) {
    try {
        const response = await apiService({
            url: `/client/products/${id}`,
            method: 'GET',
            options: { authenticate: false }
        });
        return response;
    } catch (e) {
        console.log('error in getting vendor products');
        return null
    }
}
export async function updateVendorProductAssets(payload: UpdateProductAssets) {
    return apiService({
        url: `/admin/products/assets/${payload.productId}`,
        method: 'PUT',
        body: payload.assets,
        options: { authenticate: true }
    });
}
export async function deleteVendorProductAssets(payload: DeleteProductAssets) {
    return await apiService({
        url: `/admin/products/assets/${payload.productId}`,
        method: 'DELETE',
        body: payload.assets,
        options: { 'authenticate': true }
    })
}