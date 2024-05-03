import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import {
    updateRoom,
    getRoomById,
    getAllRooms,
} from "../../../components/api/ApiFunction";

const UpdateRoom = () => {
    const [room, setRoom] = useState({
        img: null,
        nameRoom: "",
        roomType: "",
        area: "",
        countOfSeat: "",
        description: "",
    });

    const [roomTypes, setRoomTypes] = useState([]);
    const [imagePreview, setImagePreview] = useState("");

    const { roomId } = useParams();

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, img: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

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

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.img);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };

        fetchRoom();
    }, [roomId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                toast.success("Cập nhật phòng thành công!");
                const updateRoomData = await getRoomById(roomId);
                setRoom(updateRoomData);
                setImagePreview(updateRoomData.img);
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
                                {imagePreview && (
                                    <img
                                        src={`data:image/jpeg;base64, ${imagePreview}`}
                                        alt="Image Room"
                                        className="image"
                                    />
                                )}

                                <div className="formInput">
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
                                        id="nameRoom"
                                        value={room.nameRoom}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="">Loại phòng: </label>
                                    <select
                                        className="select"
                                        onChange={handleRoomInputChange}
                                        name="roomType"
                                        value={room.roomType}
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
                                        id="area"
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
                                        id="countOfSeat"
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
                                        id="description"
                                        value={room.description}
                                        onChange={handleRoomInputChange}
                                    />
                                </div>

                                <div className="btn-action">
                                    <Link to="/rooms">
                                        <button className="back">Trở về</button>
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
