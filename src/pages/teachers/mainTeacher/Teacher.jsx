import React, { useState } from "react";
import { Pagination } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./main-teacher.scss";
import { Link } from "react-router-dom";

export const rows = [
    {
        id: "DRBDM063",
        fullName: "Nguyễn Tâm Phước",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Khắc Trung",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Trương Minh Hùng",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Phạm Thị Kim Anh",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn A",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn C",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Tâm Phước",
        birthday: "01/12/2005",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Khắc Trung",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
    {
        id: "DRBDM063",
        fullName: "Trương Minh Hùng",
        birthday: "22/12/2002",
        sex: "Nam",
        email: "phuocnt02@gmail.com",
        account: "phuocnt",
    },
];

const Teacher = () => {
    const [page, setPage] = useState(1); // State for current page
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacherContainer">
                <Navbar />
                <div className="teacherList">
                    <div className="datatableTitle">
                        <span>Quản lý giảng viên</span>
                    </div>
                    <div className="teacherSearch">    
                        <h4>Tìm kiếm: </h4>                    
                        <div className="search">                            
                            <input type="text" placeholder="Nhập tên giáo viên muốn tìm." />
                            <SearchOutlinedIcon />
                        </div>
                        <Link
                            to="/teachers/add-teacher"
                            style={{ textDecoration: "none" }}
                        >
                            <span className="link">Thêm mới </span>
                        </Link>
                    </div>
                    <div className="top">
                        {rows.map((row) => (
                            <div className="left">
                                <h6 className="title">Thông tin cá nhân</h6>

                                <div className="btnAction">
                                    <Link to="/teachers/delete-teacher/123" style={{ textDecoration: "none" }}>
                                        <span className="deleteButton">
                                            <DeleteOutlinedIcon className="icon" />
                                        </span>
                                    </Link>

                                    <Link to="/teachers/update-teacher/123" style={{ textDecoration: "none" }}>
                                        <span className="editButton">
                                            <EditCalendarOutlinedIcon className="icon" />
                                        </span>
                                    </Link>
                                </div>

                                <div className="item">
                                    <img
                                        src="/assets/person/DefaultProfile.jpg"
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{row.fullName}</h1>
                                        <div className="detailItem">
                                            <span className="itemkey">Ngày sinh: </span>
                                            <span className="itemValue">
                                                {row.birthday}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemkey">Giới tính: </span>
                                            <span className="itemValue">{row.sex}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemkey">Email: </span>
                                            <span className="itemValue">{row.email}</span>
                                        </div>

                                        {/* <div className="detailItem">
                                            <span className="itemkey">Tài khoản: </span>
                                            <span className="itemValue">
                                                {row.account}
                                            </span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className="pagination"
                        count={Math.ceil(rows.length / rowsPerPage)} // Calculate total pages
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Teacher;
