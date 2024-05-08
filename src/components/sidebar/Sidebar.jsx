import React, { useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DoorSlidingOutlinedIcon from "@mui/icons-material/DoorSlidingOutlined";
import EventIcon from "@mui/icons-material/Event";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import "./sidebar.scss";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const { roomId } = useParams();
    const { typeId } = useParams();
    const { eventId } = useParams();
    const { accountId } = useParams();
    const { teacherId } = useParams();
    const { historyId } = useParams();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">UniRoomManager</span>
                </Link>
                <div className="menu__icon" onClick={handleCloseMenu}>
                    <MenuIcon />
                </div>
            </div>

            <hr />
            <div className="bottom">
                <ul>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h4 className="title">BẢNG ĐIỀU KHIỂN</h4>
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <DashboardIcon className="icon" />
                            <span>Bảng điều khiển</span>
                        </li>
                    </Link>
                    <Link to="/rooms" style={{ textDecoration: "none" }}>
                        <h4 className="title">DANH SÁCH QUẢN LÝ</h4>
                        <li
                            className={
                                location.pathname === "/rooms" ||
                                location.pathname === "/rooms/add-room" ||
                                location.pathname === `/rooms/update-room/${roomId}` ||
                                location.pathname === `/rooms/detail-room/${roomId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <StorefrontIcon className="icon" />
                            <span>Phòng</span>
                        </li>
                    </Link>

                    <Link to="/types" style={{ textDecoration: "none" }}>
                        <li
                            className={
                                location.pathname === "/types" ||
                                location.pathname === "/types/add-type" ||
                                location.pathname === `/types/update-type/${typeId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <DoorSlidingOutlinedIcon className="icon" />
                            <span>Loại phòng</span>
                        </li>
                    </Link>

                    <Link to="/events" style={{ textDecoration: "none" }}>
                        <li
                            className={
                                location.pathname === "/events" ||
                                location.pathname === "/events/add-event" ||
                                location.pathname === `/events/update-event/${eventId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <EventIcon className="icon" />
                            <span>Sự kiện</span>
                        </li>
                    </Link>

                    <Link to="/accounts" style={{ textDecoration: "none" }}>
                        <li
                            className={
                                location.pathname === "/accounts" ||
                                location.pathname === "/accounts/add-account" ||
                                location.pathname ===
                                    `/accounts/update-account/${accountId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <Person3OutlinedIcon className="icon" />
                            <span>Tài khoản</span>
                        </li>
                    </Link>

                    <Link to="/teachers" style={{ textDecoration: "none" }}>
                        <li
                            className={
                                location.pathname === "/teachers" ||
                                location.pathname === "/teachers/add-teacher" ||
                                location.pathname ===
                                    `/teachers/update-teacher/${teacherId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <GroupOutlinedIcon className="icon" />
                            <span>Giảng viên</span>
                        </li>
                    </Link>
                    <Link to="/reports" style={{ textDecoration: "none" }}>
                        <li className={location.pathname === "/reports" ? "active" : ""}>
                            <InsertChartOutlinedIcon className="icon" />
                            <span>Thống kê báo cáo</span>
                        </li>
                    </Link>
                    <Link to="/histories" style={{ textDecoration: "none" }}>
                        <li
                            className={
                                location.pathname === "/histories" ||
                                location.pathname ===
                                    `/histories/detail-history/${historyId}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <HistoryOutlinedIcon className="icon" />
                            <span>Lịch sử đặt / hủy phòng</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
