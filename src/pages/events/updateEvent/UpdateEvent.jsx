import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { getEventById, updateEvent } from "../../../api/ApiEvents";

const UpdateEvent = () => {
    const { eventId } = useParams();

    const [event, setEvent] = useState({
        eventName: "",
    });

    const [errors, setErrors] = useState({
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

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();       

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!event.eventName) {
            newErrors.eventName = "Vui lòng nhập tên sự kiện.";
            hasErrors = true;
        } else {
            newErrors.eventName = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateEvent(eventId, event);
            
            if (response === true) {
                toast.success("Cập nhật loại phòng thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật loại phòng!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleInputFocus = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
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
                                    type="text"
                                    placeholder="Nhập tên sự kiện"
                                    name="eventName"
                                    value={event.eventName}
                                    onChange={handleEventInputChange}
                                    onFocus={() => handleInputFocus("eventName")}
                                />
                                 {errors.eventName && (
                                    <div className="error">{errors.eventName}</div>
                                )}
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
