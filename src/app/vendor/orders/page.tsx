"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getVendorDeliveryBoys, getVendorOrders } from '@/app/lib/order/action';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

import { DeliveryBoy } from '@/types/order';
import OrderItem from './orderItem';
import OrderFilter from './orderFilter';
import { getOneDayBefore, getTodaysDate } from '@/app/lib/dateFns';
import { useRouter } from 'next/navigation';


type OrderResponse = {
    totalItems: number,
    data: any[],
    totalPages: number,
    currentPage: string;
    authentication_message?: string;
}
const Orders = () => {
    const router = useRouter();
    const query = {
        page: 0,
        size: 100,
        start_date: getOneDayBefore(),
        end_date: getTodaysDate()
    }
    const [loading, setLoading] = useState(true);
    const [orders, setOrderList] = useState<OrderResponse>({ totalItems: 0, data: [], totalPages: 0, currentPage: '1' });
    const [deliveryBoys, setDeliveryBoys] = useState([]);

    const getOrders = async (query: any) => {
        const payload = {
            type: 'GET_VENDOR_ORDERS',
            data: query
        }
        const orderResponse = await fetch('/api/order', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
        const orderInstance = await orderResponse.json();
        if (orderInstance.authentication_message) {
            router.replace('/auth/login');
        } else {
            setOrderList(orderInstance);
            setLoading(false);
        }
    }
    const getDeliveryBoys = async () => {
        const payload = {
            type: 'GET_VENDOR_DELIVERY_BOYS'
        }
        const deliveryResponse = await fetch('/api/order', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
        const deliveyrBoyss = await deliveryResponse.json();
        if (deliveyrBoyss.authentication_message) {
            router.replace('/auth/login');
        } else {
            setDeliveryBoys(deliveyrBoyss);
        }
    }
    useEffect(() => {
        getDeliveryBoys();
    }, [])

    console.log({ orders, deliveryBoys });
    return (
        <DefaultLayout>

            <div className="container mx-auto mt-10 p-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
                            <OrderFilter getOrders={getOrders} />
                        </div>
                        {
                            loading ?
                                <p>Fetching Records ...</p>
                                :

                                <>
                                    {
                                        orders.data.length > 0 ?

                                            <div className="mt-4">
                                                {
                                                    orders.data.map((order) => {
                                                        return (
                                                            <OrderItem key={order.id} order={order} deliveryBoys={deliveryBoys} />
                                                        )
                                                    })
                                                }

                                            </div>
                                            :
                                            <p>No Orders Found</p>
                                    }
                                </>
                        }

                    </div>
                </div>
            </div>
        </DefaultLayout>

    )
}
export default Orders;