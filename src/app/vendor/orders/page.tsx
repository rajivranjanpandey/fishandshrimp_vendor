import React from 'react';
import { getVendorOrders } from '@/app/lib/order/action';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import EditButton from '@/components/buttons/edit';

const Orders = async () => {
    const orders = await getVendorOrders();
    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/vendor/orders', name: 'Orders' }
    ]

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Coupons' hierarchy={hierarchy} />
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <button className='mb-5 cursor-pointer rounded-lg border border-secondary bg-secondary p-2 text-white transition hover:bg-opacity-90' onClick={onCouponAdd}>Add Coupon</button>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    Code
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Amount
                                </th>
                                {/*  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Status
                                </th> */}
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((orderItem, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {orderItem.order_number}
                                        </h5>
                                        {/* <p className="text-sm">${couponItem.description}</p> */}
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {orderItem.final_total}
                                        </p>
                                    </td>
                                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {bannerItem.invoiceDate}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${bannerItem.status === "Paid"
                                                    ? "bg-success text-success"
                                                    : bannerItem.status === "Unpaid"
                                                        ? "bg-danger text-danger"
                                                        : "bg-warning text-warning"
                                                }`}
                                        >
                                            {bannerItem.status}
                                        </p>
                                    </td> */}
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <EditButton href={`/vendor/orders/${orderItem.id}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>

    )
}
export default Orders;