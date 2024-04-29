import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";

import * as searchServices from "../../../components/services/searchService";

import "./room.scss";

const rows = [
    {
        id: "DRBDM063",
        img: "/assets/carbattery.jpg",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        status: "Trống",
    },
    {
        id: "51Wy1UhvbZL",
        img: "/assets/engineoil.jpg",
        nameRoom: "Auto Parts Engine Oil Viscosity",
        roomType: "Turbo",
        status: "Hỏng",
    },
    {
        id: "HJKDM063",
        img: "/assets/engineoil2.jpg",
        nameRoom: "ENGINE OIL",
        roomType: "Turbo",
        status: "Đặt",
    },
    {
        id: "31CTWTB2",
        img: "/assets/engineoil.jpg",
        nameRoom: "HONDA 4 STROKE ENGINE OIL",
        roomType: "Platinum",
        status: "Trống",
    },
    {
        id: "HRDDR3055",
        img: "/assets/wheel.jpg",
        nameRoom: "Platinum Plus - Wheel",
        roomType: "Platinum",
        status: "Đặt",
    },
    {
        id: "FGH543",
        img: "/assets/carbrush.jpg",
        nameRoom: "Short Handle Car and Motocycle Wheel Brush",
        roomType: "Amazon",
        status: "Trống",
    },
    {
        id: "YABYBX3055",
        img: "/assets/carbattery.jpg",
        nameRoom: "YUASA 055 3000 SERIES CAR BATTERY -4 YEAR WARRANTY",
        roomType: "YUASA",
        status: "Đặt",
    },
];

const Room = () => {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [roomType, setRoomType] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    // Danh sách loại phòng và trạng thái từ dữ liệu thực tế
    const roomTypes = [...new Set(rows.map((row) => row.roomType))];
    const statuses = [...new Set(rows.map((row) => row.status))];

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý khi loại phòng thay đổi
    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
        filterRows(event.target.value, status, search);
    };

    // Xử lý khi trạng thái thay đổi
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        filterRows(roomType, event.target.value, search);
    };

    // Xử lý khi click vào button tìm kiếm
    const handleSearch = () => {
        filterRows(roomType, status, search);
    };

    const filterRows = (selectedRoomType, selectedStatus, searchTerm) => {
        const filteredRows = rows.filter((row) => {
            const roomTypeMatch =
                !selectedRoomType ||
                row.roomType.toLowerCase() === selectedRoomType.toLowerCase();
            const statusMatch =
                !selectedStatus ||
                row.status.toLowerCase() === selectedStatus.toLowerCase();
            const nameMatch =
                !searchTerm ||
                row.nameRoom.toLowerCase().includes(searchTerm.toLowerCase());
            return roomTypeMatch && statusMatch && nameMatch;
        });

        setFilteredRows(filteredRows);
        setPage(1); // Reset to page 1 after filtering
    };

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
                        <select
                            className="select"
                            value={roomType}
                            onChange={handleRoomTypeChange}
                        >
                            <option value="">-- Chọn loại phòng --</option>
                            {roomTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên phòng muốn tìm."
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
                            to="/rooms/add-room"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    <div className="roomtable">
                        <TableContainer component={Paper} className="tablecontainer">
                            {filteredRows.length === 0 && (
                                <div className="no-data-message">
                                    Không tìm thấy kết quả tìm kiếm với từ khóa:{" "}
                                    <span className="no-mess">
                                        {status || roomType || search}
                                    </span>
                                </div>
                            )}
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                {filteredRows.length > 0 && (
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableCell tabble-header">
                                                Ảnh
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Tên phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Loại phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Trạng thái
                                            </TableCell>
                                            <TableCell
                                                className="tableCell tabble-header"
                                                colSpan={2}
                                                align="center"
                                            >
                                                Thao tác
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                )}

                                <TableBody>
                                    {filteredRows
                                        .slice(
                                            (page - 1) * rowsPerPage,
                                            page * rowsPerPage
                                        )
                                        .map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell className="tableCell">
                                                    <div className="cellWrapper">
                                                        <img
                                                            src={row.img}
                                                            alt=""
                                                            className="image"
                                                        />
                                                        {row.product}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="tableCell name-room">
                                                    {row.nameRoom}
                                                </TableCell>
                                                <TableCell className="tableCell type-room">
                                                    {row.roomType}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    <span
                                                        className={`status ${row.status}`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="tableCell btn-action">
                                                    <button className="deleteBtn btn">
                                                        Xóa
                                                    </button>
                                                    <Link
                                                        to="/rooms/update-room/123"
                                                        className="btn"
                                                    >
                                                        <button className="updateBtn">
                                                            Cập nhật
                                                        </button>
                                                    </Link>
                                                    <Link
                                                        to="/rooms/detail-room/123"
                                                        className="btn"
                                                    >
                                                        <button className="detailBtn">
                                                            Xem chi tiết
                                                        </button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
        </div>
    );
};

export default Room;
