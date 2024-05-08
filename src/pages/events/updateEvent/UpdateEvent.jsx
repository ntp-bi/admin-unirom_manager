import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { getEventById, updateEvent } from "../../../components/api/ApiEvent";

const UpdateEvent = () => {
    const { eventId } = useParams();

    const [event, setEvent] = useState({
        eventName: "",
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("event Data to be updated:", event); // Xem dữ liệu phòng trước khi gửi đi

        try {
            const response = await updateEvent(eventId, event);
            console.log("Update Event Response:", response); // Xem phản hồi từ server
            if (response.status === 200) {
                toast.success("Cập nhật loại phòng thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật loại phòng!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className="add__event">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Cập nhật thông tin sự kiện</span>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên sự kiện:</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Nhập tên sự kiện"
                                    name="eventName"
                                    value={event.eventName}
                                    onChange={handleEventInputChange}
                                />
                            </div>

                            <div className="btn-action">
                                <Link to="/events">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;
