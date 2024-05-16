import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { addRoom } from "../../../api/ApiRoom";
import { getAllType } from "../../../api/ApiTypeRoom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./add-room.scss";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        file: null,
        roomname: "",
        area: "",
        countofseats: "",
        description: "",
        status: 1,
        typeid: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [errors, setErrors] = useState({
        roomname: "",
        area: "",
        countofseats: "",
        typeid: "",
    });

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await getAllType();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleRoomTypeChange = (e) => {
        const selectedTypeId = e.target.value;
        setNewRoom({ ...newRoom, typeid: selectedTypeId });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setNewRoom({ ...newRoom, file: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!newRoom.roomname) {
            newErrors.roomname = "Vui lòng nhập tên phòng.";
            hasErrors = true;
        } else {
            newErrors.roomname = "";
        }

        if (!newRoom.area || newRoom.area <= 0) {
            newErrors.area = "Diện tích phòng phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.area = "";
        }

        if (!newRoom.countofseats || newRoom.countofseats <= 0) {
            newErrors.countofseats = "Số lượng chỗ ngồi phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.countofseats = "";
        }

        if (!newRoom.typeid) {
            newErrors.typeid = "Vui lòng chọn loại phòng.";
            hasErrors = true;
        } else {
            newErrors.typeid = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await addRoom(
                newRoom.file,
                newRoom.roomname,
                newRoom.area,
                newRoom.countofseats,
                newRoom.description,
                newRoom.status,
                newRoom.typeid
            );
            toast.success("Phòng đã được thêm vào cơ sở dữ liệu");
            setNewRoom({
                file: null,
                roomname: "",
                area: "",
                countofseats: "",
                description: "",
                status: 1,
                typeid: "",
            });
            setImagePreview("");
            setErrors({
                roomname: "",
                area: "",
                countofseats: "",
                typeid: "",
            });
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
        <div className="add">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="main">
                    <div className="top">
                        <span>Thêm phòng mới</span>
                    </div>
                    <div className="bottom">
                        <form onSubmit={handleSubmit}>
                            <div className="left">
                                <img
                                    src={
                                        imagePreview
                                            ? imagePreview
                                            : "/assets/person/no-image.png"
                                    }
                                    alt="Image Room"
                                    className="image"
                                />
                                <div className="formInput input-image">
                                    <input
                                        id="img"
                                        name="file"
                                        type="file"
                                        className="form-control file"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <div className="formInput">
                                    <label>Tên phòng:</label>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên phòng"
                                        name="roomname"
                                        value={newRoom.roomname}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("roomname")}
                                    />
                                    {errors.roomname && (
                                        <div className="error">{errors.roomname}</div>
                                    )}
                                </div>

                                <div className="formInput">
                                    <label>Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomTypeChange}
                                        name="typeid"
                                        value={newRoom.typeid}
                                        onFocus={() => handleInputFocus("typeid")}
                                    >
                                        <option value="">-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.typeid && (
                                        <div className="error">{errors.typeid}</div>
                                    )}
                                </div>
                                <div className="formInput">
                                    <label>Diện tích:</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập diện tích"
                                        name="area"
                                        value={newRoom.area}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("area")}
                                    />
                                    {errors.area && (
                                        <div className="error">{errors.area}</div>
                                    )}
                                </div>
                                <div className="formInput">
                                    <label>Số lượng chỗ ngồi:</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập số lượng chỗ ngồi"
                                        name="countofseats"
                                        value={newRoom.countofseats}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("countofseats")}
                                    />
                                    {errors.countofseats && (
                                        <div className="error">{errors.countofseats}</div>
                                    )}
                                </div>
                                <div className="formArea">
                                    <label>Mô tả:</label>
                                    <textarea
                                        className="desc"
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        name="description"
                                        value={newRoom.description}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="btn-action">
                                    <button className="btn-add" type="submit">
                                        Thêm
                                    </button>
                                    <Link to="/rooms">
                                        <button className="back">Trở về</button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
