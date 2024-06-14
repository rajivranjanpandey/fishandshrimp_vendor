import React from 'react'

function PrintOrder() {
    async printSize(orderId) {
        const response = await getSellerOrderDetailsApi({ orderId: orderId });
        if (response) {
            let orderDetails = response;
            let kotOrderItems = [];

            let totalPrintQty = 0;
            let totalPrintItem = 0;

            if (orderDetails) {
                orderDetails.order_items.forEach((item, index) => {

                    totalPrintQty += parseInt(1);
                    totalPrintItem += parseInt(item.qty_ordered);

                    const evenItem = (index + 1) % 2 === 0;
                    let addonItems = [];
                    let kotAddonItems = [];
                    item.addons.forEach((x) => {
                        addonItems.push(
                            <div className="order_addon_list">
                                <span>{x.name}</span>
                                <span>₹{x.final_total}</span>
                            </div>
                        );
                        kotAddonItems.push(
                            `${item.qty_ordered}x ${x.name} - ₹${x.final_total}`
                        )
                    })
                    kotOrderItems.push(
                        <tr>
                            <td style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.8em', 'width': '50%' }}>
                                {item.name}
                                <>
                                    {
                                        kotAddonItems.length > 0 &&
                                        <>
                                            <p style={{ fontSize: '80%' }}>{kotAddonItems.join(',')}</p>
                                        </>
                                    }
                                </>

                            </td>
                            <td style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.8em' }}>₹{item.price}</td>
                            <td style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.8em' }}>{item.qty_ordered}</td>
                            <td style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.8em' }}>₹{item.final_total}</td>
                        </tr>
                    )
                })
                this.setState({ orderDetails: orderDetails });
                this.setState({ kotOrderItems: kotOrderItems });

                this.setState({ totalPrintQty: totalPrintQty });
                this.setState({ totalPrintItem: totalPrintItem });

                var divContents = document.getElementById("printSizeContent").innerHTML;
                var printWindow = window.open('', '', 'height=500,width=1024');
                printWindow.document.write('<html><head><title>Print DIV Content</title>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(divContents);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        }
    }
    return (
        <div id="printSizeContent" style={{ display: 'none' }}>
            <div style={{ width: '3.2in', height: '100%', color: 'black', margin: 'auto', padding: '0', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }}>
                <div style={{ borderRadius: '5px', background: 'white', margin: '10mm auto' }}>
                    <div style={{ padding: '6px' }}>
                        <div style={{ textAlign: 'center', paddingBottom: '25px', flexDirection: 'column', display: 'flex', }}>
                            <span style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.7em', letterSpacing: '1px', }}>{this.state.orderDetails.store_info.store_name}</span>
                            <span style={{ textAlign: 'center', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: '500', marginTop: '10px', fontSize: '1.1em', padding: '0 10px', }}>{this.state.orderDetails.store_info.address}</span>
                            <span style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '10px', fontSize: '1em', fontWeight: '500', padding: '0 10px', }}><strong>+91 {this.state.orderDetails.store_info.support_number}</strong></span>
                            {/* <span style={{ textAlign: 'center', fontFamily: 'sans-serif', textTransform: 'uppercase', MarginTop: '10px', fontSize: '1em', padding: '5px 10px 0 10px', }}><strong>Gst No- 1Abgc12345</strong> </span> */}
                        </div>

                        <div style={{ fontFamily: 'sans-serif' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #767373', }}>
                                <div style={{ width: '65%' }}>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>Name:</span>
                                        <span>{this.state.orderDetails.customer_info.address_name}</span>
                                    </div>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>Add:</span>
                                        <span>{this.state.orderDetails.customer_info.address2}, {this.state.orderDetails.customer_info.city}, {this.state.orderDetails.customer_info.state_name} {this.state.orderDetails.customer_info.zipcode}</span>
                                    </div>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>Ph:</span>
                                        <span>+91 {this.state.orderDetails.customer_info.phone}</span>
                                    </div>
                                </div>
                                <div style={{ width: '35%' }}>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>#{this.state.orderDetails.display_order_number}</span>
                                    </div>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>Date:</span>
                                        <span>{dateOnlyGenerator(this.state.orderDetails.created_at)}</span>
                                    </div>
                                    <div style={{ marginBottom: '5px', display: 'flex', }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', }}>Time:</span>
                                        <span style={{ textTransform: 'uppercase', }}>{timeOnlyGenerator(this.state.orderDetails.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div style={{ fontFamily: 'Muli,sans-serif !important' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '0.01em solid #767373', }}>
                                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <tr style={{ borderBottom: '1px solid #C1CED9' }}>
                                        <th style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.7em' }}>Item</th>
                                        <th style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.7em' }}>Price</th>
                                        <th style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.7em' }}>Qty</th>
                                        <th style={{ textAlign: 'left', 'padding': '5px 0', 'verticalAlign': 'baseline', fontSize: '0.7em' }}>Total</th>
                                    </tr>
                                    {this.state.kotOrderItems}
                                </table>
                            </div>
                        </div>
                        <div style={{ fontFamily: 'Muli,sans-serif!important', }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #767373' }}>
                                <div style={{ width: '150px' }}>
                                    <div style={{ marginBottom: '5px', display: 'flex' }}>
                                        <span style={{ fontWeight: '600', width: '65px', paddingRight: '5px' }}>Tot Items:</span>
                                        <span>{this.state.totalPrintItem}</span>
                                    </div>
                                    <div style={{ marginBottom: '5px', display: 'flex' }}>
                                        <span style={{ fontWeight: '600', width: '65px', paddingRight: '5px' }}>Tot Qty:</span>
                                        <span>{this.state.totalPrintQty}</span>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div style={{ flexGrow: '1' }}>
                                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px' }}>Item Total:</span>
                                        <span style={{ textTransform: 'uppercase' }}>₹{this.state.orderDetails.nsp_breakup.sub_total ? this.state.orderDetails.nsp_breakup.sub_total : 0}</span>
                                    </div>
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.special_discount) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Special Discount:</span>
                                            <span>-₹{this.state.orderDetails.nsp_breakup.special_discount}</span>
                                        </div>
                                    }
                                    {
                                        this.state.orderDetails.nsp_breakup.promo_discount > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Promo Discount:</span>
                                            <span style={{ textTransform: 'uppercase' }}>-₹{this.state.orderDetails.nsp_breakup.promo_discount}</span>
                                        </div>
                                    }
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.store_bear_delivery_charge) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Delivery:</span>
                                            <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.store_bear_delivery_charge}`}</span>
                                        </div>
                                    }
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.packaging_charge) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Packaging Charge:</span>
                                            <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.packaging_charge}`}</span>
                                        </div>
                                    }
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.tax_amount) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Tax:</span>
                                            <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.tax_amount}`}</span>
                                        </div>
                                    }
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.partner_delivery_charge) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Partner Delivery:</span>
                                            <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.partner_delivery_charge}`}</span>
                                        </div>
                                    }
                                    {
                                        Number(this.state.orderDetails.nsp_breakup.platform_charge) > 0 &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px', width: '50%' }}>Cash Handling Charges:</span>
                                            <span style={{ textTransform: 'uppercase' }}>-{`₹${this.state.orderDetails.nsp_breakup.platform_charge}`}</span>
                                        </div>
                                    }

                                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px' }}>Net Payable:</span>
                                        <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.net_seller_payable}`}</span>
                                    </div>

                                    {
                                        is3rdPartyDelivery &&
                                        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '600', paddingRight: '5px' }}>Delivery Charge Deduction:</span>
                                            <span style={{ textTransform: 'uppercase' }}>{`₹${this.state.orderDetails.nsp_breakup.delivery_charge}`}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                this.state.orderDetails.payment_method == 'COD' ?
                                    <></>
                                    :
                                    <OrderPrintPaymentInfo orderId={this.state.orderDetails.orderId} />
                            }


                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #767373' }}>
                                <div style={{ flexGrow: '1' }}>
                                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '600', paddingRight: '5px', textDecoration: 'underline' }}>Amount to be collected from customer:</span>
                                        <span>₹{this.state.orderDetails.payment_method === 'PREPAID' ? 0 : Number(this.state.orderDetails.commercial_summary?.total_final_charge)}</span>
                                    </div>
                                    <div style={{ textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '7px' }}>*Thank You Visit Again*</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintOrder