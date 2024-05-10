import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addEvent } from "../../../components/api/ApiEvent";

import "./add-event.scss";

const AddEvent = () => {
    const [eventName, setEventName] = useState("");

    const [errors, setErrors] = useState({
        eventName: "",
    });

    const handleEventInputChange = (e) => {
        setEventName(e.target.value);

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!eventName.eventName) {
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
            await addEvent(eventName);
            toast.success("Sự kiện đã được thêm thành công!");
            setEventName("");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm sự kiện!");
            console.error("Error adding event:", error);
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
                    <span>Thêm sự kiện mới</span>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên sự kiện:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên sự kiện"
                                    value={eventName}
                                    onChange={handleEventInputChange}
                                    onFocus={() => handleInputFocus("eventName")}
                                />
                                {errors.eventName && (
                                    <div className="error">{errors.eventName}</div>
                                )}
                            </div>
                            <div className="btn-action">
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                                <Link to="/events">
                                    <button className="back">Trở về</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
