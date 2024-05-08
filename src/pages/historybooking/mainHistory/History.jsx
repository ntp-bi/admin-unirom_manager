import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import * as api from "../../../components/api/ApiHistories";

import "./main-history.scss";

dayjs.locale("vi"); // Set locale to Vietnamese

const History = () => {
    const [histories, setHistories] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    const STATUS_LABELS = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Từ chối",
        4: "Đã hủy",
        5: "Trả phòng",
    };

    const getStatusClassName = (status) => {
        switch (parseInt(status)) {
            case 1:
                return "pending";
            case 2:
                return "confirmed";
            case 3:
                return "cancelled";
            case 4:
                return "rejected";
            case 5:
                return "checked-in";
            default:
                return "";
        }
    };

    const convertStatusToNumber = (status) => {
        return parseInt(status);
    };

    const statuses = [...new Set(histories.map((history) => Math.abs(history.status)))];

    useEffect(() => {
        fetchHistories(); // Gọi hàm fetchHistories khi component được render
    }, []);

    // Hàm gọi API để lấy danh sách sự kiện
    const fetchHistories = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllHistory();
            setHistories(result);
            setFilteredRows(result); // Cập nhật lại danh sách khi xóa
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    // Hàm xử lý tìm kiếm khi có sự thay đổi trong từ khóa tìm kiếm
    useEffect(() => {
        const fetchApi = async () => {
            setLoadingSearch(true); // Đang tải dữ liệu

            const result = await searchServices.search(debouncedValue); // Gọi API tìm kiếm

            setLoadingSearch(false); // Kết thúc tải dữ liệu
            return result; // Trả về kết quả
        };

        // Kiểm tra xem từ khóa tìm kiếm có thay đổi và không phải là chuỗi rỗng
        if (debouncedValue.trim() !== "" && search.trim() !== "") {
            fetchApi(); // Gọi hàm fetchApi
        }
    }, [debouncedValue]);

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(histories);
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
        const selectedStatusValue = convertStatusToNumber(event.target.value);
        setSelectedStatus(selectedStatusValue); // Sửa status thành selectedStatus
        filterRows(selectedStatusValue, search, selectedDateRange); // Sửa status thành selectedStatus
    };

    // Xử lý khi click vào button tìm kiếm
    const handleSearch = () => {
        filterRows(selectedStatus, search, selectedDateRange);
    };

    const filterRows = (selectedStatus, searchTerm, dateRange) => {
        const [startDate, endDate] = dateRange;
        const filteredRows = histories.filter((history) => {
            const statusMatch = !selectedStatus || history.status === selectedStatus;
            const nameMatch =
                !searchTerm ||
                (typeof searchTerm === "string" &&
                    searchTerm.trim() !== "" &&
                    ((history.fullName &&
                        history.fullName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                        (history.roomName &&
                            history.roomName
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()))));
            const reserveTime = dayjs(history.reserveTime, "DD/MM/YYYY HH:mm:ss");
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
        filterRows(selectedStatus, search, newDateRange);
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
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {STATUS_LABELS[status]}
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
                            {!!search && !loadingSearch && (
                                <button className="clear" onClick={handleClear}>
                                    <CancelIcon className="icon-search" />
                                </button>
                            )}
                            {loadingSearch && (
                                <RotateRightOutlinedIcon className="loading icon-search" />
                            )}

                            <button className="search-btn" onClick={handleSearch}>
                                <SearchOutlinedIcon />
                            </button>
                        </div>
                    </div>
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <div className="historytable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    {filteredRows.length === 0 && (
                                        <div className="no-data-message">
                                            Không tìm thấy kết quả tìm kiếm với từ khóa:{" "}
                                            <span className="no-mess">{search}</span>
                                        </div>
                                    )}
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
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
                                                .map((history) => (
                                                    <TableRow key={history.id}>
                                                        <TableCell className="tableCell">
                                                            <div className="cellWrapper">
                                                                {history.roomName}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {history.fullName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {history.reserveTime}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {history.returnTime}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {history.endTime}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            <span
                                                                className={`status ${getStatusClassName(
                                                                    history.status
                                                                )}`}
                                                            >
                                                                {
                                                                    STATUS_LABELS[
                                                                        history.status
                                                                    ]
                                                                }
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="tableCell btn-action">
                                                            <Link
                                                                to={`/histories/detail-history/${history.id}`}
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
                                        count={Math.ceil(
                                            filteredRows.length / rowsPerPage
                                        )}
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
