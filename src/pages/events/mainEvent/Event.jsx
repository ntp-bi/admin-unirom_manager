import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import EventTable from "../../../components/eventtable/Eventtable"

import "./event.scss";

const Event = () => {
    return (
        <div className="event">
            <Sidebar />
            <div className="eventContainer">
                <Navbar />
                <div className="eventList">
                    <div className="datatableTitle">
                        <span>Quản lý sự kiện</span>
                    </div>
                    <div className="eventSearch">    
                        <h4>Tìm kiếm: </h4>                    
                        <div className="search">                            
                            <input type="text" placeholder="Nhập tên sự kiện muốn tìm." />
                            <SearchOutlinedIcon />
                        </div>
                        <Link
                            to="/events/add-event"
                            style={{ textDecoration: "none" }}
                        >
                            <span className="link">Thêm mới </span>
                        </Link>
                    </div>
                    <EventTable />
                </div>
            </div>
        </div>
    );
};

export default Event;
