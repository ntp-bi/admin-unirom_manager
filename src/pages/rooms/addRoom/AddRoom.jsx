import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { addRoom, getAllRooms } from "../../../components/api/ApiRoom";
import { getAllType } from "../../../components/api/ApiTypeRoom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./add-room.scss";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        img: null,
        nameRoom: "",
        //  được sử dụng để hiển thị và lưu trữ tạm thời giá trị của loại phòng mà người dùng đã chọn, trong khi typeId được sử dụng để xác định ID của loại phòng để lưu vào cơ sở dữ liệu.
        roomType: "", // Khi người dùng chọn một loại phòng từ dropdown, giá trị của roomType sẽ được cập nhật tương ứng với ID của loại phòng được chọn.
        area: "",
        countOfSeat: "",
        description: "",
        typeId: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(""); // State mới để lưu trữ ID của loại phòng được chọn
    const [errors, setErrors] = useState({
        nameRoom: "",
        area: "",
        countOfSeat: "",
        roomType: "",
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
        const selectedRoomType = e.target.value;
        setSelectedRoomTypeId(selectedRoomType);
        setNewRoom({ ...newRoom, roomType: selectedRoomType }); // Cập nhật roomType trong state newRoom với ID của loại phòng được chọn
        setErrors((prevErrors) => ({
            ...prevErrors,
            roomType: "", // Xóa thông báo lỗi khi người dùng chọn một loại phòng mới
        }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewRoom((prevRoom) => ({ ...prevRoom, img: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!newRoom.nameRoom) {
            newErrors.nameRoom = "Vui lòng nhập tên phòng.";
            hasErrors = true;
        } else {
            newErrors.nameRoom = "";
        }

        if (!newRoom.area || newRoom.area <= 0) {
            newErrors.area = "Diện tích phòng phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.area = "";
        }

        if (!newRoom.countOfSeat || newRoom.countOfSeat <= 0) {
            newErrors.countOfSeat = "Số lượng chỗ ngồi phải lớn hơn 0.";
            hasErrors = true;
        } else {
            newErrors.countOfSeat = "";
        }

        if (!selectedRoomTypeId) {
            newErrors.roomType = "Vui lòng chọn loại phòng.";
            hasErrors = true;
        } else {
            newErrors.roomType = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await addRoom(
                newRoom.img,
                newRoom.nameRoom,
                newRoom.area,
                newRoom.countOfSeat,
                newRoom.description,
                1,
                selectedRoomTypeId // Truyền ID của loại phòng đã chọn vào hàm addRoom
            );
            toast.success("Phòng đã được thêm vào cơ sở dữ liệu");
            setNewRoom({
                img: null,
                nameRoom: "",
                area: "",
                countOfSeat: "",
                description: "",
            });
            setImagePreview("");
            setSelectedRoomTypeId(""); // Reset state của loại phòng được chọn
            setErrors({
                nameRoom: "",
                area: "",
                countOfSeat: "",
                roomType: "",
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
                                        value={newRoom.nameRoom}
                                        onChange={handleRoomInputChange}
                                        onFocus={() => handleInputFocus("nameRoom")}
                                    />
                                    {errors.nameRoom && (
                                        <div className="error">{errors.nameRoom}</div>
                                    )}
                                </div>

                                <div className="formInput">
                                    <label>Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomTypeChange} // Sử dụng hàm xử lý mới để cập nhật state
                                        name="roomType"
                                        value={selectedRoomTypeId} // Sử dụng state mới để giữ giá trị của dropdown
                                        onFocus={() => handleInputFocus("roomType")}
                                    >
                                        <option>-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option key={type.typeId} value={type.typeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.roomType && (
                                        <div className="error">{errors.roomType}</div>
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
                                        name="countOfSeat"
                                        value={newRoom.countOfSeat}
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
