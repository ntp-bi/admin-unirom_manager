import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

import "./add-room.scss";
import { Link } from "react-router-dom";

const AddRoom = () => {
    // const [file, setFile] = useState(null);
    const [newRoom, setNewRoom] = useState({
        photo: null,
        nameRoom: "",
        roomType: "",
        area: "",
        countOfSeat: "",
        description: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "area") {
            if (!isNaN(value)) {
                value = parseFloat(value);
            } else {
                value = "";
            }
        }
        if (name === "countOfSeat") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addRoom(
                newRoom.photo,
                newRoom.nameRoom,
                newRoom.roomType,
                newRoom.area,
                newRoom.countOfSeat,
                newRoom.description
            );
            if (success !== undefined) {
                setSuccessMessage("Phòng đã được thêm vào cơ sở dữ liệu");
                setNewRoom({
                    photo: null,
                    nameRoom: "",
                    roomType: "",
                    area: "",
                    countOfSeat: "",
                    description: "",
                });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Có lỗi xảy ra khi thêm phòng mới!");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
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
                    {successMessage && (
                            <div className="alert alert-success fade show">
                                {successMessage}
                            </div>
                        )}
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "/assets/person/no-image.png"
                                }
                                alt=""
                                className="image"
                            />
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Ảnh:{" "}
                                        <DriveFolderUploadOutlined className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Tên phòng:</label>
                                    <input type="text" placeholder="Nhập tên phòng" />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="">Loại phòng: </label>
                                    <select className="select">
                                        <option>-- Chọn loại phòng --</option>
                                        <option>Phònh ABC</option>
                                        <option>Phònh ABC</option>
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Diện tích:</label>
                                    <input type="text" placeholder="Nhập diện tích" />
                                </div>
                                <div className="formInput">
                                    <label>Số lượng chỗ ngồi:</label>
                                    <input
                                        type="text"
                                        placeholder="Nhập số lượng chỗ ngồi"
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <input type="text" placeholder="Nhập mô tả" />
                                </div>

                                <div className="btn-action">
                                    <Link to="/rooms">
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
        </div>
    );
};

export default AddRoom;
