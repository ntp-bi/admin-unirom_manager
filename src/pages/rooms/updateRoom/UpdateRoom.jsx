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
        typeId: "", // Changed from roomType to typeId
        area: "",
        countOfSeat: "",
        description: "",
    });

    const [roomTypes, setRoomTypes] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(""); // State mới để lưu trữ ID của loại phòng được chọn

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
                setSelectedRoomTypeId(roomData.typeId); // Set selected room type ID
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
        setSelectedRoomTypeId(selectedRoomType);
        setRoom((prevRoom) => ({ ...prevRoom, typeId: selectedRoomType })); // Cập nhật typeId trong state room với ID của loại phòng được chọn
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
                                        required
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
                                        name="roomType"
                                        value={selectedRoomTypeId}
                                    >
                                        <option>-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option key={type.typeId} value={type.typeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Diện tích:</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="Nhập diện tích"
                                        name="area"
                                        value={room.area}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Số lượng chỗ ngồi:</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="Nhập số lượng chỗ ngồi"
                                        name="countOfSeat"
                                        value={room.countOfSeat}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>
                                <div className="formArea">
                                    <label>Mô tả:</label>
                                    <textarea
                                        required
                                        className="desc"
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        name="description"
                                        value={room.description}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="btn-action">
                                    <Link to="/rooms">
                                        <button className="back">Quay lại</button>
                                    </Link>
                                    <button className="btn-add" type="submit">
                                        Cập nhật
                                    </button>
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
