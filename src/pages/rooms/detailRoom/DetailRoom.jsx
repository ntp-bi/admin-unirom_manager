import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { Link } from "react-router-dom";
import "./detail-room.scss";

const DetailRoom = () => {
    const [file, setFile] = useState(null);
    return (
        <div className="detail">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span>Xem chi tiết thông tin phòng</span>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>
                                    Tên phòng:
                                    <span className="info name-room">Phòng ABC</span>
                                </label>
                            </div>

                            <div className="formInput">
                                <label htmlFor="">
                                    Loại phòng:
                                    <span className="info type-room">Phòng VIP</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Diện tích:
                                    <span className="info area">100m2</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Số lượng chỗ ngồi:
                                    <span className="info count-seat">200</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Mô tả:
                                    <span className="info description">
                                        Nguyễn Tâm Phước dzai vip pro
                                    </span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label htmlFor="file">Ảnh:</label>
                                <span>
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "/assets/person/no-image.png"
                                        }
                                        alt=""
                                        className="image"
                                    />
                                </span>
                            </div>
                        </form>
                        <div className="btn-action">
                            <Link to="/rooms">
                                <button className="back">Trở về</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailRoom;
