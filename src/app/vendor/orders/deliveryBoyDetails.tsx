"use client";
import { DeliveryBoy } from "@/types/order";
import React, { useState } from "react";


type DeliveryBoyDetailsProps = {
    orderId: number;
    delivery_boy: any;
    deliveryBoys: DeliveryBoy[]
}
const DeliveryBoyDetails = (props: DeliveryBoyDetailsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(props.delivery_boy);

    const onClose = () => {
        setIsOpen(!isOpen);
    }
    const handleSelect = (deliveryBoy: DeliveryBoy) => {
        setSelectedDeliveryBoy(deliveryBoy);
    };

    const handleAssign = async () => {
        if (selectedDeliveryBoy) {
            const payload = {
                type: 'ASSIGN_DELIVERY_BOY',
                deliveryBoyId: selectedDeliveryBoy.id,
                data: {
                    "order_id": props.orderId
                }

            }
            const selectionResponse = await fetch('/api/order', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
            const selectionMessage = await selectionResponse.json();
            if (selectionMessage.delivery_boy) {
                setSelectedDeliveryBoy(selectionMessage.delivery_boy);
                onClose();
            }
        }
    };

    return (
        <>
            {
                (selectedDeliveryBoy && !isOpen) ?
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">Assigned Delivery Boy</h4>
                        <div className="mt-2">
                            <p className="text-gray-600"><strong>Name:</strong> {selectedDeliveryBoy.User.name}</p>
                            <p className="text-gray-600"><strong>Contact:</strong> {selectedDeliveryBoy.User.mobile}</p>
                        </div>
                    </div>
                    :
                    <div className="mt-4">
                        <button
                            className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                            onClick={() => setIsOpen(true)}
                        >
                            Assign Delivery Boy
                        </button>
                    </div>
            }

            {
                isOpen &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-3/4 overflow-auto">
                        <h3 className="text-lg font-semibold mb-4">Select Delivery Boy</h3>
                        {
                            props.deliveryBoys.length > 0 ?
                                <ul className="space-y-2">
                                    {props.deliveryBoys.map((deliveryBoy) => (
                                        <li
                                            key={deliveryBoy.id}
                                            className={`p-2 cursor-pointer border rounded-lg ${selectedDeliveryBoy === deliveryBoy ? 'bg-blue-200' : ''}`}
                                            onClick={() => handleSelect(deliveryBoy)}
                                        >
                                            <p><strong>Name:</strong> {deliveryBoy.User.name}</p>
                                            <p><strong>Area:</strong> {deliveryBoy.delivery_area}</p>
                                            <p><strong>Mobile:</strong> {deliveryBoy.User.mobile}</p>
                                            <p><strong>Gender:</strong> {deliveryBoy.gender}</p>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <p>No Delivery Boys Found</p>
                        }

                        <div className="mt-4 flex justify-end">
                            <button
                                type="click"
                                className="bg-gray-500 text-white py-1 px-3 rounded-lg mr-2"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="click"
                                disabled={!selectedDeliveryBoy}
                                className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                                onClick={handleAssign}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );

};

export default DeliveryBoyDetails;
