"use client";
import React, { useState } from 'react'
import DeliveryBoyDetails from './deliveryBoyDetails';
import PrintOrder from './printOrder';
import { DeliveryBoy } from '@/types/order';
import { formatDate, getDateLabel } from '@/app/lib/dateFns';

function OrderItem(props: { order: any, deliveryBoys: DeliveryBoy[] }) {
    const [order, setOrderDetails] = useState(props.order);

    const handleOrderStatusChange = async (status: string) => {
        if (order.state === 'accepted') {
            alert('Order is already in accepted state, hence cannot be canceled');
        } else {
            const payload = {
                type: 'STATUS_CHANGE',
                orderId: order.id,
                data: {
                    "order_status": status
                }

            }
            const statusChangeResponse = await fetch('/api/order', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
            const orderInstance = await statusChangeResponse.json();
            if (orderInstance.status) {
                setOrderDetails(orderInstance);
            } else {
                alert('Operation failed');
            }
        }
    }
    // const handleAcceptOrder = () => handleOrderStatusChange('accepted');
    const handleCancelOrder = () => handleOrderStatusChange('rejected');
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700">Order: {order.order_reference_no}</h3>
                    <p className="text-gray-600">
                        <strong>Bag Total:</strong>{" "}
                        <span className="text-grey-600 font-semibold">₹{order.final_total}</span>
                    </p>
                    <div className="mt-2">
                        <h4 className="text-lg font-semibold text-gray-700">Customer Information</h4>
                        <p className="text-gray-600"><strong>Name:</strong> {order.customer_address.name}</p>
                        <p className="text-gray-600"><strong>Contact: </strong>{order.customer_address.contact_number}</p>
                        <p className="text-gray-600"><strong>Address: </strong>{order.customer_address.house_no}, {order.customer_address.address2}</p>
                        <p className="text-gray-600"><strong>Landmark: </strong>{order.customer_address.landmark}</p>
                        <p className="text-gray-600"><strong>Delivery: </strong>{getDateLabel(order.delivery_date)}, {order.delivery_time_slot}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-600">
                        <span>{formatDate(order.createdAt)}</span>
                    </p>
                    <p className="text-gray-600">
                        <strong>Order Status:</strong>{" "}
                        <span className="text-green-600 font-semibold">{order.status === 'NEW' ? order.state.toUpperCase() : order.status}</span>
                    </p>
                    <p className="text-gray-600">
                        <strong>Payment:</strong>{" "}
                        <span className="text-red-600 font-semibold">{order.payment_mode}</span>
                    </p>
                    <div className="mt-2">
                        <div className="flex flex-col space-y-2">

                            <PrintOrder order={order} />
                            {
                                !['COMPLETED', 'CANCELLED'].includes(order.status) &&
                                <button
                                    onClick={handleCancelOrder}
                                    className="bg-red text-white py-2 px-4 rounded shadow hover:bg-red"
                                >
                                    Cancel Order
                                </button>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">Order Items</h4>
                <div className="mt-2">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className='text-left'>
                                <th className="py-2 px-4 bg-gray-200">Image</th>
                                <th className="py-2 px-4 bg-gray-200">Item</th>
                                <th className="py-2 px-4 bg-gray-200">Quantity</th>
                                <th className="py-2 px-4 bg-gray-200">Price/kg</th>
                                <th className="py-2 px-4 bg-gray-200">Final Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.order_items.map((orderItem: any) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="py-2 px-4 border-b">
                                                    <img src={orderItem.product_details.product.product_type.thumb_image} alt={orderItem.product_details.product.name} className="w-12 h-12 object-cover" width={50} height={50} />
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {orderItem.product_details.product.name}
                                                    {
                                                        (orderItem.product_details.name && (orderItem.product_details.product.name !== orderItem.product_details.name)) &&
                                                        <p className="text-sm" style={{ color: '#bcbcbc' }}>{orderItem.product_details.name}</p>
                                                    }
                                                </td>
                                                <td className="py-2 px-4 border-b">{orderItem.item_process_type === 'WHOLE' ? `${orderItem.item_quantity}packs x ${orderItem.item_weight}gm` : `${orderItem.item_weight}gm`}</td>
                                                <td className="py-2 px-4 border-b">₹{orderItem.product_details.product.selling_price}/kg</td>
                                                <td className="py-2 px-4 border-b">₹{orderItem.item_final_total}</td>
                                            </tr>
                                            {
                                                orderItem.additional_data?.customer_note &&
                                                <tr>
                                                    <td colSpan={5} className="py-2 px-4 border-b">
                                                        <p className="text-sm text-gray-500">{orderItem.additional_data.customer_note}</p>
                                                    </td>
                                                </tr>
                                            }
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <DeliveryBoyDetails orderId={order.id} delivery_boy={order.delivery_boy} deliveryBoys={props.deliveryBoys} />

        </div>
    )
}

export default OrderItem