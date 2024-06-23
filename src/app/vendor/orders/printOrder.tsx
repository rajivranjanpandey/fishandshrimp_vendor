"use client";

import { formatDate } from "@/app/lib/dateFns";

const PrintOrder = ({ order }) => {
    const handlePrintOrder = () => {
        const element = document.getElementById(`print-order-${order.id}`);
        if (element) {
            const printContent = element.innerHTML;
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);
            if (iframe.contentWindow) {
                const doc = iframe.contentWindow.document;
                doc.open();
                doc.write(`
            <html>
                <head>
                    <style>
                        body { font-size: 5px; margin: 0; padding: 0; }
                        .container { width: 3.7in; height: 1.7in; overflow: hidden; }
                        .header { text-align: center; font-size: 6px; font-weight: bold; margin-bottom: 2px; }
                        .section { margin-bottom: 1px; }
                        .title { font-weight: bold; margin-bottom: 1px; }
                        .table { width: 100%; border-collapse: collapse; }
                        .table th, .table td { border: 1px solid #ccc; padding: 1px; text-align: left; }
                        .table th { font-size: 5px; }
                        .table td { font-size: 5px; padding: 1px 2px; }
                        .info { margin-bottom: 1px; }
                        @media print {
                            body * { visibility: hidden; }
                            .container, .container * { visibility: visible; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        ${printContent}
                    </div>
                </body>
            </html>
        `);
                doc.close();

                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }

            // Clean up by removing the iframe after printing
            document.body.removeChild(iframe);
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
                <div className="container" id={`print-order-${order.id}`}>
                    <div className="header">Order: {order.order_reference_no}</div>
                    <div className="section">
                        <div className="title">Customer Info</div>
                        <div className="info">Name: {order.customer_address.name}</div>
                        <div className="info">Contact: {order.customer_address.contact_number}</div>
                        <div className="info">Address: {order.customer_address.house_no}, {order.customer_address.address2}</div>
                        <div className="info">Landmark: {order.customer_address.landmark}</div>
                    </div>
                    <div className="section">
                        <div className="title">Order Items</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.order_items.map((orderItem: any, index: number) => (
                                        <tr key={index}>
                                            <td>{orderItem.product_details.product.name}</td>
                                            <td>{orderItem.item_process_type === 'WHOLE' ? `${orderItem.item_quantity} x ${orderItem.item_weight}gm` : `${orderItem.item_weight}gm`}</td>
                                            <td>₹{orderItem.item_final_total}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintOrder;
