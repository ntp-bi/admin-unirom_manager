import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { getTypeById, updateType } from "../../../components/api/ApiTypeRoom";

const UpdateTypeRoom = () => {
    const { typeId } = useParams();

    const [type, setType] = useState({
        typeName: ""
    });

    useEffect(() => {
        const fetchType = async () => {
            try {
                const typeData = await getTypeById(typeId);
                setType(typeData);
            } catch (error) {
                console.error("Error fetching type:", error);
            }
        };

        fetchType();
    }, [typeId]);

    const handleTypeInputChange = (e) => {
        const { name, value } = e.target;
        setType({ ...type, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Type Data to be updated:", type); // Xem dữ liệu phòng trước khi gửi đi

        try {
            const response = await updateType(typeId, type);
            console.log("Update Type Response:", response); // Xem phản hồi từ server
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
        <div className="add__type">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Cập nhật thông tin loại phòng</span>
                </div>
                <div className="bottom bottom-update">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên loại phòng:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên loại phòng"
                                    required
                                    name="typeName"
                                    value={type.typeName}
                                    onChange={handleTypeInputChange}
                                />
                            </div>                          

                            <div className="btn-action">
                                <Link to="/types">
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

export default UpdateTypeRoom;
