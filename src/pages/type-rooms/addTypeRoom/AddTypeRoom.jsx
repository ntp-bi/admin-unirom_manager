import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addType } from "../../../api/ApiTypeRoom";
import "./add-type.scss";

const AddTypeRoom = () => {
    const [newType, setNewType] = useState({
        typeName: "",
    });

    const [errors, setErrors] = useState({
        typeName: "",
    });

    const handleTypeInputChange = (e) => {
        const { name, value } = e.target;
        setNewType({ ...newType, [name]: value });
        
        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!newType.typeName) {
            newErrors.typeName = "Vui lòng nhập tên phòng.";
            hasErrors = true;
        } else {
            newErrors.typeName = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await addType(newType.typeName);
            toast.success("Loại phòng đã được thêm thành công!");
            setNewType({ typeName: "" });
        } catch (error) {
            toast.error("Loại phòng đã tồn tại!");
            console.error("Error adding Type:", error);
        }
    };

    const handleInputFocus = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    return (
        <div className="add__type">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Thêm loại phòng mới</span>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên loại phòng:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên loại phòng"
                                    name="typeName"
                                    value={newType.typeName}
                                    onChange={handleTypeInputChange}
                                    onFocus={() => handleInputFocus("typeName")}
                                />
                                {errors.typeName && (
                                    <div className="error">{errors.typeName}</div>
                                )}
                            </div>

                            <div className="btn-action">
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                                <Link to="/types">
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

export default AddTypeRoom;
