import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ModifyCoupon from '@/components/ModifyCoupon'

function CouponCreate() {
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/coupon', name: 'Coupon' },
        { href: `/admin/coupon/create`, name: 'Create Coupon' },

    ]
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create Coupon' hierarchy={hierarchy} />
            <ModifyCoupon mode='ADD' />
        </DefaultLayout>
    )
}

export default CouponCreate