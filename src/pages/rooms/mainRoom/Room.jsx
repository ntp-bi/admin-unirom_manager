import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Roomtable from "../../../components/roomtable/Roomtable";

import "./room.scss";

const Room = () => {
    return (
        <div className="room">
            <Sidebar />
            <div className="roomContainer">
                <Navbar />
                <div className="roomList">
                    <div className="datatableTitle">
                        <span>Quản lý phòng</span>
                    </div>
                    <div className="roomSearch">
                        <select className="select">
                            <option value="">-- Chọn loại phòng --</option>
                            <option value="">Phòng ABC</option>
                            <option value="">Phòng XYZ</option>
                            <option value="">Phòng VIP</option>
                        </select>
                        <div className="search">                            
                            <input type="text" placeholder="Nhập tên phòng muốn tìm." />
                            <SearchOutlinedIcon />
                        </div>
                        <Link
                            to="/rooms/add-room"
                            style={{ textDecoration: "none" }}
                        >
                            <span className="link">Thêm mới </span>
                        </Link>
                    </div>
                    <Roomtable />
                </div>
            </div>
        </div>
    );
};

export default Room;
