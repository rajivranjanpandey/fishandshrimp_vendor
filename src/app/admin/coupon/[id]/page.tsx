import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ModifyCoupon from '@/components/ModifyCoupon'
import { getAdminCouponDetails } from '@/app/lib/coupon/action';

interface Params {
    params: {
        id: string;
    };
}
async function CouponModify({ params }: Params) {
    const { id } = params;
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/coupon', name: 'Coupon' },
        { href: `/admin/coupon/${id}`, name: 'Modify Coupon' },

    ]
    const couponData = await getAdminCouponDetails({ id });
    if (couponData.message?.coupon_zipcodes) {
        couponData.message.zipcodes = couponData.message.coupon_zipcodes.map(cp => cp.zipcode).join(',');
    }
    console.log({ couponData });
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Coupon Modify' hierarchy={hierarchy} />
            <ModifyCoupon mode='EDIT' initialValue={couponData?.message} />
        </DefaultLayout>
    )
}

export default CouponModify