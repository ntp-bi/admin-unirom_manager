import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./detail-history.scss";

const DetailHistory = () => {
    return (
        <div className="detailHitory">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span>Xem chi tiết lịch sử đặt và hủy phòng</span>
                </div>

                <div className="bottom">
                    <div className="right">
                        <div className="historry-action">
                            <div className="formInput">
                                <select className="select">
                                    <option>Xử lý đặt phòng</option>
                                    <option>Phònh ABC</option>
                                    <option>Phònh ABC</option>
                                </select>
                            </div>
                            <Link
                                to="#"
                                style={{ textDecoration: "none" }}
                            >
                                <button className="deleteBtn">Xóa</button>
                            </Link>
                            <Link
                                to="/historys"
                                style={{ textDecoration: "none" }}
                            >
                                <button className="backBtn">Quay lại</button>
                            </Link>
                        </div>
                        <form>
                            <div className="formInput">
                                <label>
                                    Mã đặt phòng:
                                    <span className="info id">VIP1</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Họ tên:
                                    <span className="info name">Nguyễn Tâm Phước</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Tên phòng:
                                    <span className="info name-room">Phòng VIP</span>
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
                                    Trạng thái:
                                    <span className="info status">Đang chờ duyệt</span>
                                </label>
                            </div>

                            <div className="formInput">
                                <label>
                                    Thời gian đặt phòng:
                                    <span className="info time-reserve">24/04/2024 12:00:00</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Thời gian trả phòng:
                                    <span className="info time-return">24/04/2024 12:00:00</span>
                                </label>
                            </div>
                            <div className="formInput">
                                <label>
                                    Thời gian kết thúc:
                                    <span className="info time-end">24/04/2024 12:00:00</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailHistory;
