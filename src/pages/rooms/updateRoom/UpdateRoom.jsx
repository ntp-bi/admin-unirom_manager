import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { updateRoom, getRoomById } from "../../../api/ApiRoom";
import * as typeApi from "../../../api/ApiTypeRoom";

import { baseIMG } from "../../../api/apiConfig";

import "./update-room.scss";

const UpdateRoom = () => {
    const { roomId } = useParams();

    const [room, setRoom] = useState({
        image: null,
        roomName: "",
        area: "",
        countOfSeats: "",
        description: "",
        status: 2,
        typeId: "",
    });

    const [errors, setErrors] = useState({
        roomName: "",
        area: "",
        countOfSeats: "",
        typeId: "",
    });
    const [roomTypes, setRoomTypes] = useState([]);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const result = await typeApi.getAllType();
                setRoomTypes(result);
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        };
        fetchRoomTypes();
    }, []);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.image);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin phòng:", error);
            }
        };

        fetchRoom();
    }, [roomId]);

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleRoomTypeChange = (e) => {
        const selectedTypeId = e.target.value;
        setRoom({ ...room, typeid: selectedTypeId });
    };

    const handleStatusChange = (e) => {
        const selectedStatus = parseInt(e.target.value, 10);
        setRoom({ ...room, status: selectedStatus });
    };

    const handleImageChange = (e) => {
        const image = e.target.images[0];
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(image);
            setRoom({ ...room, image: image });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!room.roomName) {
            newErrors.roomName = "Vui lòng nhập tên phòng.";
            hasErrors = true;
        } else {
            newErrors.roomName = "";
        }

        if (!room.area || room.area <= 0) {
            newErrors.area = "Diện tích phòng phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.area = "";
        }

        if (!room.countOfSeats || room.countOfSeats <= 0) {
            newErrors.countOfSeats = "Số lượng chỗ ngồi phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.countOfSeats = "";
        }

        if (!room.typeId) {
            newErrors.typeId = "Vui lòng chọn loại phòng.";
            hasErrors = true;
        } else {
            newErrors.typeId = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateRoom(
                roomId,
                room.image,
                room.roomName,
                room.area,
                room.countOfSeats,
                room.description,
                room.status,
                room.typeId
            );
            if (response.status === 200) {
                toast.success("Cập nhật phòng thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật phòng!");
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
        <div className="update">
            <Sidebar />
            <div className="updateContainer">
                <Navbar />
                <div className="main">
                    <div className="top">
                        <span>Cập nhật thông tin phòng</span>
                    </div>
                    <div className="bottom">
                        <form onSubmit={handleSubmit}>
                            <div className="left">
                                <img
                                    src={`${baseIMG}/${room.image}`}
                                    alt="Hình ảnh phòng"
                                    className="image"
                                />

                                <div className="formInput">
                                    <input
                                        id="img"
                                        name="image"
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
                                        name="roomName"
                                        value={room.roomName}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("roomName")}
                                    />
                                    {errors.roomName && (
                                        <div className="error">{errors.roomName}</div>
                                    )}
                                </div>

                                <div className="formInput radio">
                                    <label>Trạng thái:</label>
                                    <div className="form-radio">
                                        <input
                                            className="input-radio"
                                            type="radio"
                                            value="1"
                                            name="status"
                                            checked={room.status === 1}
                                            onChange={handleStatusChange}
                                        />{" "}
                                        Bị hỏng | bảo trì
                                        <input
                                            className="input-radio"
                                            type="radio"
                                            value="2"
                                            name="status"
                                            checked={room.status === 2}
                                            onChange={handleStatusChange}
                                        />{" "}
                                        Sử dụng được
                                    </div>
                                </div>

                                <div className="formInput">
                                    <label>Số lượng chỗ ngồi:</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập số lượng chỗ ngồi"
                                        name="countOfSeats"
                                        value={room.countOfSeats}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("countOfSeats")}
                                    />
                                    {errors.countOfSeats && (
                                        <div className="error">{errors.countOfSeats}</div>
                                    )}
                                </div>

                                <div className="formInput">
                                    <label>Diện tích:</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập diện tích"
                                        name="area"
                                        value={room.area}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("area")}
                                    />
                                    {errors.area && (
                                        <div className="error">{errors.area}</div>
                                    )}
                                </div>

                                <div className="formInput input-type">
                                    <label>Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomTypeChange}
                                        name="typeId"
                                        value={room.typeId}
                                        onFocus={() => handleInputFocus("typeId")}
                                    >
                                        <option>-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.typeId && (
                                        <div className="error">{errors.typeId}</div>
                                    )}
                                </div>
                                <div className="formArea">
                                    <label>Mô tả:</label>
                                    <textarea
                                        className="desc"
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        name="description"
                                        value={room.description}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="btn-action">
                                    <button className="btn-add" type="submit">
                                        Cập nhật
                                    </button>
                                    <Link to="/rooms">
                                        <button className="back">Quay lại</button>
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

export default UpdateRoom;
