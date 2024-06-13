import React from "react";
import { getBannerDetailsAction, modifyBannerAction } from "@/app/lib/banner/action";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ModifyBanner from "@/components/ModifyBanner";

interface Params {
    params: {
        id: string;
    };
}
async function BannerModify({ params }: Params) {
    const bannerDetails = await getBannerDetailsAction(params.id);
    console.log({ bannerDetails });
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/banners', name: 'Banners' },
        { href: `/admin/banners/${params.id}`, name: 'Modify Banner' },

    ]
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Modify Banner" hierarchy={hierarchy} />
                <form action={modifyBannerAction}>
                    <ModifyBanner mode='EDIT' initialValue={bannerDetails} />
                </form>
            </DefaultLayout>
        </>
    )
}
export default BannerModify;