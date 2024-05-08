import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addType } from "../../../components/api/ApiTypeRoom";
import "./add-type.scss";

const AddTypeRoom = () => {
    const [newType, setNewType] = useState({
        typeName: ""
    });

    const handleTypeInputChange = (e) => {
        const { name, value } = e.target;
        setNewType({ ...newType, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addType(
                newType.typeName
            );
            toast.success("Loại phòng đã được thêm thành công!");
            setNewType({ typeName: ""});
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm loại phòng!");
            console.error("Error adding Type:", error);
        }
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
                                    required
                                    name="typeName"
                                    value={newType.typeName}
                                    onChange={handleTypeInputChange}
                                />
                            </div>                                               

                            <div className="btn-action">
                                <Link to="/types">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTypeRoom;
