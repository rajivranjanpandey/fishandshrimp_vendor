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
                                @page {
                                    margin: 0;
                                }
                                body {
                                    margin: 0;
                                }
                                .container {
                                    background-color: #fff;
                                    font-family: Arial, Helvetica, sans-serif;
                                    color: #000;
                                    width: 100mm;
                                    padding: 5mm;
                                    margin: 0 auto;
                                }
                                .header, .customer-info, .items-table {
                                    margin-bottom: 5mm;
                                }
                                .header, .customer-info, .items-table, table, th, td {
                                    page-break-inside: avoid;
                                }
                                .header div, .customer-info div {
                                    display: flex;
                                    justify-content: space-between;
                                }
                                h2, h3, p {
                                    margin: 0 0 1mm 0;
                                }
                                h2 {
                                    font-size: 14px;
                                    font-weight: bold;
                                }
                                h3 {
                                    font-size: 13px;
                                    font-weight: normal;
                                }
                                p {
                                    font-size: 12px;
                                    font-weight: normal;
                                }
                                table, th, td  {
                                    border: 1px solid black;
                                    border-collapse: collapse;
                                    font-size: 12px;
                                }
                                table {
                                    width: 100%;
                                    margin-top: 2mm;
                                }
                                th {
                                    text-align: left;
                                    font-weight: bold;
                                    padding: 1mm;
                                }
                                td {
                                    text-align: left;
                                    font-weight: normal;
                                    padding: 1mm;
                                }
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
                <section className="container" id={`print-order-${order.id}`}>
                    <div className="header">
                        <div>
                            <h2>{order.order_reference_no}</h2>
                            <h2>Contact :  {order.customer_address.contact_number}</h2>
                        </div>
                    </div>
                    <div className="customer-info">
                        <h3><strong>{order.customer_address.name}</strong>, {order.customer_address.house_no}, {order.customer_address.address2}</h3>
                        <p>Landmark: {order.customer_address.landmark}</p>
                    </div>
                    <div className="items-table">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "65%" }}>Item</th>
                                    <th style={{ width: "20%" }}>Qty</th>
                                    <th style={{ width: "15%" }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_items.map((orderItem, index) => (
                                    <tr key={index}>
                                        <td>{orderItem.product_details.product.name}</td>
                                        <td>{orderItem.item_process_type === 'WHOLE' ? `${orderItem.item_quantity} x ${orderItem.item_weight}gm` : `${orderItem.item_weight}gm`}</td>
                                        <td>₹{orderItem.item_final_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PrintOrder;
