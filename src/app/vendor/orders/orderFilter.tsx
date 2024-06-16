"use client";
import { getDateEnd, getDateStart, getOneDayBefore, getTodaysDate } from '@/app/lib/dateFns';
import React, { useEffect, useState } from 'react'

function OrderFilter(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    useEffect(() => {
        const startDt = getOneDayBefore();
        const endDt = getTodaysDate();
        handleFilter(startDt.dtMs, endDt.dtMs);
        setStartDate(startDt.dtInput);
        setEndDate(endDt.dtInput);
    }, [])

    const handleFilter = (startDt?: number, endDt?: number) => {
        const query = {
            page: 0,
            size: 100,
            start_date: startDt || getDateStart(startDate),
            end_date: endDt || getDateEnd(endDate)
        }
        if (orderStatus) {
            query.orderStatus = orderStatus;
        }
        props.getOrders(query);
    };
    console.log({ startDate, endDate });
    return (
        <div className="flex space-x-4">
            <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                    type="date"
                    className="border border-gray-300 p-2 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700">End Date</label>
                <input
                    type="date"
                    className="border border-gray-300 p-2 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700">Order Status</label>
                <select
                    className="border border-gray-300 p-2 rounded-md"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="new">NEW</option>
                    <option value="cancelled">CANCELLED</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="flex items-end">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => handleFilter()}
                >
                    Filter
                </button>
            </div>
        </div>
    )
}

export default OrderFilter