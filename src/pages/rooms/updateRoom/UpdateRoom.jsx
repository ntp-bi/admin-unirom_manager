import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

import { Link } from "react-router-dom";

const UpdateRoom = () => {
    const [file, setFile] = useState(null);
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
                                        Cập nhật
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

export default UpdateRoom;
