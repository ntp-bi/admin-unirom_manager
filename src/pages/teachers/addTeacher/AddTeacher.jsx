import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

import "./add-teacher.scss";
import { Link } from "react-router-dom";

const AddTeacher = () => {
    const [file, setFile] = useState(null);
    return (
        <div className="addTeacher">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Thêm giảng viên mới</span>
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
                                    Ảnh: <DriveFolderUploadOutlined className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className="formInput radio">
                                <label>Giới tính:</label>  
                                <input className="input-radio" type="radio" value={"Nam"}/> Nam
                                <input className="input-radio" type="radio" value={"Nữ"}/> Nữ                                
                            </div>
                            <div className="formInput">
                                <label>Họ tên:</label>
                                <input type="text" placeholder="Nhập họ tên" />
                            </div>

                            <div className="formInput">
                                <label>Ngày sinh:</label>
                                <input type="date" placeholder="" />
                            </div>
                            <div className="formInput email">
                                <label>Email:</label>
                                <input type="text" placeholder="Nhập email" />
                            </div>

                            <div className="btn-action">
                                <Link to="/teachers">
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
    );
};

export default AddTeacher;
