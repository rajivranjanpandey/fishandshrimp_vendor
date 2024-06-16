"use client";

import { formatDate } from "@/app/lib/dateFns";

const PrintOrder = ({ order }) => {
    const handlePrintOrder = () => {
        const printContent = document.getElementById(`print-order-${order.id}`);
        if (printContent) {
            const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            if (WindowPrt) {
                WindowPrt.document.write(printContent.innerHTML);
                WindowPrt.document.close();
                WindowPrt.focus();
                WindowPrt.print();
                WindowPrt.close();
            }
        }
    };
    return (
        <>
            <button
                onClick={handlePrintOrder}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
            >
                Print Order
            </button>

            <div style={{ display: 'none' }}>
                <div className="p-4" id={`print-order-${order.id}`}>
                    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">Order: {order.order_reference_no}</h3>
                                <p className="text-gray-600">
                                    <strong>Order Date:</strong>{" "}
                                    <span className="text-grey-600 font-semibold">{formatDate(order.createdAt)}</span>
                                </p>
                                <p className="text-gray-600">
                                    <strong>Bag Total:</strong>{" "}
                                    <span className="text-grey-600 font-semibold">₹{order.final_total}</span>
                                </p>
                                <div className="mt-2">
                                    <h4 className="text-lg font-semibold text-gray-700">Customer Information</h4>
                                    <p className="text-gray-600"><strong>Name: </strong> {order.customer_address.name}</p>
                                    <p className="text-gray-600"><strong>Contact: </strong>{order.customer_address.contact_number}</p>
                                    <p className="text-gray-600"><strong>Address: </strong>{order.customer_address.house_no}, {order.customer_address.address2}</p>
                                    <p className="text-gray-600"><strong>Landmark: </strong>{order.customer_address.landmark}</p>
                                    <p className="text-gray-600"><strong>Delivery Date: </strong>{order.delivery_date}</p>
                                    <p className="text-gray-600"><strong>Delivery Time: </strong>{order.delivery_time_slot}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600">
                                    <strong>Payment:</strong>{" "}
                                    <span className="text-red-600 font-semibold">{order.payment_mode}</span>
                                </p>

                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">Order Items</h4>
                            <div className="mt-2">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr style={{ textAlign: 'left' }}>
                                            <th className="py-2 px-4 bg-gray-200">Item</th>
                                            <th className="py-2 px-4 bg-gray-200">Quantity</th>
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
                                                                {orderItem.product_details.product.name}
                                                                {/* {
                                                                    (orderItem.product_details.name && (orderItem.product_details.product.name !== orderItem.product_details.name)) &&
                                                                    orderItem.product_details.name
                                                                } */}
                                                            </td>
                                                            <td className="py-2 px-4 border-b">{orderItem.item_process_type === 'WHOLE' ? `${orderItem.item_quantity}packs x ${orderItem.item_weight}gm` : `${orderItem.item_weight}gm`}</td>

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

                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintOrder;
