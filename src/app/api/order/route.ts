import apiService from "@/app/lib/apiService";
import { logoutAction } from "@/app/lib/auth/action";
import { getVendorDeliveryBoys, getVendorOrders } from "@/app/lib/order/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log('GET_REQUEST:::::::::::::', request);
    } catch (e) { }
}
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        console.log({ payload });
        let response;
        if (payload.type === 'ASSIGN_DELIVERY_BOY') {
            response = await apiService({
                url: `/vendor/delivery-agent/${payload.deliveryBoyId}/orders`,
                method: 'POST',
                body: payload.data,
                options: { authenticate: true }
            });
        } else if (payload.type === 'STATUS_CHANGE') {
            response = await apiService({
                url: `/vendor/orders/${payload.orderId}`,
                method: 'PUT',
                body: payload.data,
                options: { authenticate: true }
            });
        } else if (payload.type === 'GET_VENDOR_ORDERS') {
            response = await getVendorOrders(payload.data);
        } else if (payload.type === 'GET_VENDOR_DELIVERY_BOYS') {
            response = await getVendorDeliveryBoys();
        }
        if (response.action === 'LOGOUT') {
            response.authentication_message = 'Your session has expired, Login to Continue';
        } else {
            if (response) {
                return NextResponse.json(response, { status: 200 });
            } else {
                return NextResponse.json('Unable to update order', { status: 500 });
            }
        }
    } catch (e) {
        console.log('Error while creating order', e)
        return NextResponse.json('Unable to update order', { status: 500 });

    }
}
// export async function DELETE(request: NextRequest) {
//     console.log(request);
//     try {
//         const payload = await request.json();
//         console.log({ payload });
//         let response = await deleteAdminCoupon({ id: payload.id });
//         if (response) {
//             return NextResponse.json(response, { status: 200 });
//         } else {
//             return NextResponse.json('Unable to update coupon', { status: 500 });
//         }
//     } catch (e) {
//         console.log('Error while creating coupon', e)
//         return NextResponse.json('Unable to update coupon', { status: 500 });

//     }
// }