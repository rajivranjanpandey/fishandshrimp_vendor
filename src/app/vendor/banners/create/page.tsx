import React from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ModifyBanner from '@/components/ModifyBanner';
import { createBannerAction } from '@/app/lib/banner/action';

const BannerCreate: React.FC = () => {
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/banners', name: 'Banners' },
        { href: `/admin/banners/create`, name: 'Create Banner' },

    ]
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName='Create Banner' hierarchy={hierarchy} />
                <form action={createBannerAction}>
                    <ModifyBanner mode="CREATE" />
                </form>
            </DefaultLayout>
        </>
    )
}
export default BannerCreate;