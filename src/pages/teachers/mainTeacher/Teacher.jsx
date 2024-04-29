import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Pagination } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import * as searchServices from "../../../components/services/searchService";

import "./main-teacher.scss";

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
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows);

    const [page, setPage] = useState(1);
    const rowsPerPage = 6;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);

            setLoading(false);
            return result;
        };

        // Kiểm tra xem debouncedValue có thay đổi từ giá trị trước không
        // và không phải là chuỗi rỗng
        if (debouncedValue.trim() !== "" && search.trim() !== "") {
            fetchApi();
        }
    }, [debouncedValue]);

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(rows);
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearch(searchValue);
        }
    };

    const handleSearch = () => {
        filterRows(search);
    };

    // Pagination component từ thư viện @mui/material,
    // thì handleChangePage yêu cầu có hai tham số, do đó bạn vẫn cần khai báo event ngay cả khi không sử dụng.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const filterRows = (searchTerm) => {
        const filteredRows = rows.filter((row) => {
            const nameMatch =
                !searchTerm ||
                row.fullName.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        setFilteredRows(filteredRows);
    };

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
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên giáo viên muốn tìm."
                                value={search}
                                onChange={handleSearchChange}
                            />
                            {!!search && !loading && (
                                <button className="clear" onClick={handleClear}>
                                    <CancelIcon className="icon-search" />
                                </button>
                            )}
                            {loading && (
                                <RotateRightOutlinedIcon className="loading icon-search" />
                            )}

                            <button className="search-btn" onClick={handleSearch}>
                                <SearchOutlinedIcon />
                            </button>
                        </div>
                        <Link
                            to="/teachers/add-teacher"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    <div className="top">
                        {filteredRows.length === 0 && (
                            <div className="no-data-message">
                                Không tìm thấy kết quả tìm kiếm với từ khóa:{" "}
                                <span className="no-mess">{search}</span>
                            </div>
                        )}
                        {filteredRows
                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                            .map((row) => (
                                <div className="left">
                                    <h6 className="title">Thông tin cá nhân</h6>

                                    <div className="btnAction">
                                        <Link
                                            to="/teachers/delete-teacher/123"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <span className="deleteButton">
                                                <DeleteOutlinedIcon className="icon" />
                                            </span>
                                        </Link>

                                        <Link
                                            to="/teachers/update-teacher/123"
                                            style={{ textDecoration: "none" }}
                                        >
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
                                                <span className="itemkey">
                                                    Ngày sinh:{" "}
                                                </span>
                                                <span className="itemValue">
                                                    {row.birthday}
                                                </span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemkey">
                                                    Giới tính:{" "}
                                                </span>
                                                <span className="itemValue">
                                                    {row.sex}
                                                </span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemkey">Email: </span>
                                                <span className="itemValue">
                                                    {row.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {filteredRows.length > 0 && (
                        <Pagination
                            className="pagination"
                            count={Math.ceil(filteredRows.length / rowsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teacher;
