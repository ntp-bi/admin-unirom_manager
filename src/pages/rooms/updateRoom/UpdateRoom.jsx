import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { updateRoom, getRoomById } from "../../../components/api/ApiRoom";
import * as typeApi from "../../../components/api/ApiTypeRoom";

const UpdateRoom = () => {
    const { roomId } = useParams();

    const [room, setRoom] = useState({
        img: null,
        nameRoom: "",
        area: "",
        countOfSeat: "",
        description: "",
        typeId: "",
        typeName: "",
    });

    const [errors, setErrors] = useState({
        area: "",
        countOfSeat: "",
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
                setImagePreview(roomData.img);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin phòng:", error);
            }
        };

        fetchRoom();
    }, [roomId]);

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
    };

    const handleRoomTypeChange = (e) => {
        const selectedRoomType = e.target.value;
        // tìm phần tử trong mảng roomTypes mà có thuộc tính typeId bằng với giá trị của selectedRoomType
        const selectedType = roomTypes.find((type) => type.typeName === selectedRoomType);

        if (selectedType) {
            setRoom({
                ...room,
                typeId: selectedType.typeId,
                typeName: selectedRoomType,
            });

            setErrors((prevErrors) => ({
                ...prevErrors,
                roomType: "",
            }));
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setRoom((prevRoom) => ({ ...prevRoom, img: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (room.area <= 0) {
            newErrors.area = "Diện tích phòng phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.area = "";
        }

        if (room.countOfSeat <= 0) {
            newErrors.countOfSeat = "Số lượng chỗ ngồi phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.countOfSeat = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateRoom(roomId, room);
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
        <div className="add">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="main">
                    <div className="top">
                        <span>Cập nhật thông tin phòng</span>
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
                                    alt="Hình ảnh phòng"
                                    className="image"
                                />

                                <div className="formInput">
                                    <input
                                        id="img"
                                        name="img"
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
                                        name="nameRoom"
                                        value={room.nameRoom}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label>Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomTypeChange}
                                        name="typeName"
                                        value={room.typeName}
                                    >
                                        <option>-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option
                                                key={type.typeId}
                                                value={type.typeName}
                                            >
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
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
                                <div className="formInput">
                                    <label>Số lượng chỗ ngồi:</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập số lượng chỗ ngồi"
                                        name="countOfSeat"
                                        value={room.countOfSeat}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("countOfSeat")}
                                    />
                                    {errors.countOfSeat && (
                                        <div className="error">{errors.countOfSeat}</div>
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
