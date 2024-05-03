import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { addRoom, getAllRooms } from "../../../components/api/ApiFunction";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./add-room.scss";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        img: null,
        nameRoom: "",
        roomType: "",
        area: "",
        countOfSeat: "",
        description: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await getAllRooms();
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

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, img: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedRooms = await addRoom(
                newRoom.img,
                newRoom.nameRoom,
                newRoom.roomType,
                newRoom.area,
                newRoom.countOfSeat,
                newRoom.description
            );
            setRoomTypes(updatedRooms); // Cập nhật state roomTypes với danh sách phòng mới
            toast.success("Phòng đã được thêm vào cơ sở dữ liệu");
            setNewRoom({
                img: null,
                nameRoom: "",
                roomType: "",
                area: "",
                countOfSeat: "",
                description: "",
            });
            setImagePreview("");
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
                                        required
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
                                        value={newRoom.nameRoom}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label>Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomInputChange}
                                        name="roomType"
                                        value={newRoom.roomType}
                                    >
                                        <option>-- Chọn loại phòng --</option>
                                        {roomTypes.map((type) => (
                                            <option key={type.id} value={type.roomType}>
                                                {type.roomType}
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
                                        value={newRoom.area}
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
                                        value={newRoom.countOfSeat}
                                        onChange={handleRoomInputChange}
                                    />
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
                                    <Link to="/rooms">
                                        <button className="back">Trở về</button>
                                    </Link>
                                    <button className="btn-add" type="submit">
                                        Thêm
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

export default AddRoom;
