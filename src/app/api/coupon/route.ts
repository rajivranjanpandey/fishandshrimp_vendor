import { createAdminCoupon, deleteAdminCoupon, getCoupons, updateAdminCoupon } from "@/app/lib/coupon/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getCoupons();
        if (response) {
            return NextResponse.json(response);
        }
    } catch (e) { }
}
export async function POST(request: NextRequest) {
    console.log(request);
    try {
        const payload = await request.json();
        let response;
        payload.data.zipcodes = payload.data.zipcodes.split(',');
        if (payload.id)
            response = await updateAdminCoupon({ id: payload.id, data: payload.data })
        else
            response = await createAdminCoupon(payload.data);
        if (response) {
            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json('Unable to update coupon', { status: 500 });
        }
    } catch (e) {
        console.log('Error while creating coupon', e)
        return NextResponse.json('Unable to update coupon', { status: 500 });

    }
}
export async function DELETE(request: NextRequest) {
    console.log(request);
    try {
        const payload = await request.json();
        console.log({ payload });
        let response = await deleteAdminCoupon({ id: payload.id });
        if (response) {
            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json('Unable to update coupon', { status: 500 });
        }
    } catch (e) {
        console.log('Error while creating coupon', e)
        return NextResponse.json('Unable to update coupon', { status: 500 });

    }
}