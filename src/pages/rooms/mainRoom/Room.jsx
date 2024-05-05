import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import * as api from "../../../components/api/ApiRoom";
import "./room.scss";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [status, setStatus] = useState(0);
    const [search, setSearch] = useState("");
    const [roomType, setRoomType] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc
    const [dataLoaded, setDataLoaded] = useState(false); // State kiểm tra xem dữ liệu đã được tải hay chưa

    const [page, setPage] = useState(1);
    const rowsPerPage = 7;

    const debouncedValue = useDebounce(search, 500); // Giá trị tìm kiếm được làm trì hoãn

    const inputRef = useRef(); // Tham chiếu đến input tìm kiếm

    // Lấy danh sách loại phòng và trạng thái từ dữ liệu thực tế
    const roomTypes = [...new Set(rooms.map((room) => room.roomType))];
    const statuses = [...new Set(rooms.map((room) => room.status))];

    useEffect(() => {
        fetchRooms(); // Gọi hàm fetchRooms khi component được render
    }, []);

    // Hàm gọi API để lấy danh sách phòng
    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllRooms();
            setRooms(result);
            setFilteredRows(result); // Cập nhật lại danh sách khi xóa
            setIsLoading(false);
            setDataLoaded(true);
        } catch (error) {
            setIsLoading(false);
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    // Lọc dữ liệu khi có sự thay đổi trong các trạng thái lọc và từ khóa tìm kiếm
    useEffect(() => {
        if (dataLoaded) {
            // Chỉ lọc dữ liệu khi dữ liệu đã được tải
            filterRows(roomType, status, debouncedValue);
        }
    }, [dataLoaded]);

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

    // Xử lý sự kiện khi người dùng xóa từ khóa tìm kiếm
    const handleClear = () => {
        setSearch(""); // Xóa từ khóa tìm kiếm
        inputRef.current.focus(); // Focus vào input tìm kiếm
        setFilteredRows(rooms); // Reset dữ liệu đã lọc
    };

    // Xử lý sự kiện khi người dùng thay đổi từ khóa tìm kiếm
    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearch(searchValue); // Cập nhật từ khóa tìm kiếm
        }
    };

    // Xử lý sự kiện khi người dùng thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage); // Cập nhật trang hiện tại
    };

    // Xử lý sự kiện khi người dùng thay đổi loại phòng
    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value); // Cập nhật loại phòng
        filterRows(event.target.value, status, search); // Lọc dữ liệu
    };

    // Xử lý sự kiện khi người dùng thay đổi trạng thái
    const handleStatusChange = (event) => {
        const selectedStatus = parseInt(event.target.value); // Chuyển đổi giá trị sang kiểu number
        setStatus(selectedStatus);
        filterRows(roomType, selectedStatus, search);
    };

    // Xử lý sự kiện khi người dùng click vào button tìm kiếm
    const handleSearch = () => {
        filterRows(roomType, status, search); // Lọc dữ liệu
    };

    // Hàm lọc dữ liệu
    const filterRows = (selectedRoomType, selectedStatus, searchTerm) => {
        const filteredRows = rooms.filter((room) => {
            const roomTypeMatch =
                !selectedRoomType ||
                room.roomType.toLowerCase() === selectedRoomType.toLowerCase();
            // So sánh trực tiếp giá trị status với giá trị đã chọn
            const statusMatch = !selectedStatus || room.status === selectedStatus;
            const nameMatch =
                !searchTerm ||
                room.nameRoom.toLowerCase().includes(searchTerm.toLowerCase());
            return roomTypeMatch && statusMatch && nameMatch;
        });

        setFilteredRows(filteredRows); // Cập nhật dữ liệu đã lọc
        setPage(1); // Reset trang về trang đầu tiên sau khi lọc
    };

    // Hàm xử lý xóa phòng
    const handleDelete = async (roomId) => {
        // Hiển thị hộp thoại xác nhận
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa phòng này không?");
        if (confirmed) {
            try {
                const result = await api.deleteRoom(roomId); // Gọi API xóa phòng
                if (result) {
                    // Nếu kết quả trả về không rỗng (xóa phòng thành công)
                    toast.success(`Phòng ${roomId} đã được xóa thành công!`);
                    fetchRooms();
                } else {
                    // Nếu kết quả trả về rỗng (có lỗi xảy ra)
                    toast.error(`Có lỗi khi xóa phòng.`);
                }
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);
        setPage(1);

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
                        <Link
                            to="/rooms/add-room"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <div className="roomtable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    {filteredRows.length === 0 && (
                                        <div className="no-data-message">
                                            Không tìm thấy kết quả tìm kiếm với từ khóa:{" "}
                                            <span className="no-mess">
                                                {status || roomType || search}
                                            </span>
                                        </div>
                                    )}
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        {filteredRows.length > 0 && (
                                            <TableHead >
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
                                                .map((room) => (
                                                    <TableRow key={room.id}>
                                                        <TableCell className="tableCell">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    src={room.img}
                                                                    alt=""
                                                                    className="image"
                                                                />
                                                                {room.product}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell name-room">
                                                            {room.nameRoom}
                                                        </TableCell>
                                                        <TableCell className="tableCell type-room">
                                                            {room.roomType}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            <span
                                                                className={`status ${room.status}`}
                                                            >
                                                                {room.status}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="tableCell btn-action">
                                                            <button
                                                                className="deleteBtn btn"
                                                                onClick={() =>
                                                                    handleDelete(room.id)
                                                                }
                                                            >
                                                                Xóa
                                                            </button>
                                                            <Link
                                                                to={`/rooms/update-room/${room.id}`}
                                                                className="btn"
                                                            >
                                                                <button className="updateBtn">
                                                                    Cập nhật
                                                                </button>
                                                            </Link>
                                                            <Link
                                                                to={`/rooms/detail-room/${room.id}`}
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

export default Room;
