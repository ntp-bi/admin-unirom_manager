import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import dayjs from "dayjs";
import "dayjs/locale/vi";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { format } from "date-fns";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";

import * as searchServices from "../../../components/services/searchService";

import "./main-history.scss";

dayjs.locale("vi"); // Set locale to Vietnamese

export const rows = [
    {
        id: "DRBDM061",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "completed",
    },
    {
        id: "DRBDM062",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "25/04/2024 12:00:00",
        ReturnTime: "25/04/2024 14:00:00",
        EndTime: "25/04/2024 14:00:00",
        status: "pending",
    },

    {
        id: "DRBDM064",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "27/04/2024 12:00:00",
        ReturnTime: "27/04/2024 14:00:00",
        EndTime: "27/04/2024 14:00:00",
        status: "pending",
    },
    {
        id: "DRBDM06",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "28/04/2024 12:00:00",
        ReturnTime: "28/04/2024 14:00:00",
        EndTime: "28/04/2024 14:00:00",
        status: "completed",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "pending",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "completed",
    },
];

const History = () => {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

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

    // Xử lý khi trạng thái thay đổi
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        filterRows(event.target.value, search, selectedDateRange);
    };

    // Xử lý khi click vào button tìm kiếm
    const handleSearch = () => {
        filterRows(status, search, selectedDateRange);
    };

    const filterRows = (selectedStatus, searchTerm, dateRange) => {
        const [startDate, endDate] = dateRange;
        const filteredRows = rows.filter((row) => {
            const statusMatch =
                !selectedStatus ||
                row.status.toLowerCase() === selectedStatus.toLowerCase();
            const nameMatch =
                !searchTerm ||
                row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.nameRoom.toLowerCase().includes(searchTerm.toLowerCase());
            const reserveTime = dayjs(row.ReserveTime, "DD/MM/YYYY HH:mm:ss");
            const timeMatch =
                (!startDate || reserveTime >= startDate) &&
                (!endDate || reserveTime <= endDate.endOf("day"));
            return statusMatch && nameMatch && timeMatch;
        });
        setFilteredRows(filteredRows);
        setPage(1);
    };

    const handleDateRangeChange = (newDateRange) => {
        setSelectedDateRange(newDateRange);
        filterRows(status, search, newDateRange);
    };

    return (
        <div className="history">
            <Sidebar />
            <div className="historyContainer">
                <Navbar />
                <div className="historyList">
                    <div className="datatableTitle">
                        <span>Lịch sử đặt và hủy phòng</span>
                    </div>
                    <div className="historySearch">
                        <select
                            className="select"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="">-- Trạng thái --</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="vi">
                            <DemoContainer components={["SingleInputDateRangeField"]}>
                                <DateRangePicker
                                    slots={{ field: SingleInputDateRangeField }}
                                    name="allowedRange"
                                    value={selectedDateRange}
                                    onChange={handleDateRangeChange}
                                    inputFormat={(date) => format(date, "DD/MM/YYYY")}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên phòng hoặc họ tên khách hàng muốn tìm."
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
                    </div>
                    <div className="historytable">
                        <TableContainer component={Paper} className="tablecontainer">
                            {filteredRows.length === 0 && (
                                <div className="no-data-message">
                                    Không tìm thấy kết quả tìm kiếm với từ khóa:{" "}
                                    <span className="no-mess">{search}</span>
                                </div>
                            )}
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                {filteredRows.length > 0 && (
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableCell tabble-header">
                                                Tên phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Họ tên
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Loại phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Thời gian đặt
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Thời gian trả
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Thời gian kết thúc
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
                                                        {row.nameRoom}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.fullName}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.roomType}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.ReserveTime}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.ReturnTime}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.EndTime}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    <span
                                                        className={`status ${row.status}`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="tableCell btn-action">
                                                    <Link
                                                        to="/historys/detail-history/123"
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

export default History;
