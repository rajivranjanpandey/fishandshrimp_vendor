import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getVendorProducts } from "@/app/lib/product/action";
import ProductList from "@/app/admin/product/list";



export default async function ProductListPage(props: any) {
    const products = await getVendorProducts();
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/product', name: 'Products' }
    ]
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Products' hierarchy={hierarchy} />
            <ProductList products={products} />
        </DefaultLayout>
    )

}