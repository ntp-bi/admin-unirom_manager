import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import useDebounce from "../../components/hooks/useDebounce";
import * as api from "../../api/ApiList.js";

import { baseIMG } from "../../api/apiConfig.js";

import "./list.scss";

const List = () => {
    const [lists, setLists] = useState([]); // State để lưu trữ dữ liệu danh sách được lấy về
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [filteredRows, setFilteredRows] = useState([]); // State để lưu trữ các hàng được lọc dựa trên giá trị tìm kiếm

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    // Định nghĩa các nhãn trạng thái
    const STATUS_LABELS = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        5: "Từ chối",
    };

    // Hàm trả về tên lớp CSS dựa trên trạng thái
    const getStatusClassName = (status) => {
        switch (parseInt(status)) {
            case 1:
                return "pending";
            case 2:
                return "confirmed";
            case 5:
                return "cancelled";
            default:
                return "";
        }
    };

    // useEffect để lấy dữ liệu danh sách khi component được render lần đầu
    useEffect(() => {
        const fetchLists = async () => {
            try {
                setIsLoading(true);
                const result = await api.getAllList();
                if (result) {
                    setLists(result);
                    setFilteredRows(result);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error(`Có lỗi: ${error.message}`);
            }
        };

        fetchLists();
    }, []);

    // useEffect để gọi API tìm kiếm khi giá trị tìm kiếm thay đổi sau một khoảng thời gian trì hoãn
    useEffect(() => {
        const fetchApi = async () => {
            setLoadingSearch(true);

            //   const result = await searchServices.search(debouncedValue);

            setLoadingSearch(false);
            //  return result;
        };

        if (debouncedValue.trim() !== "") {
            fetchApi();
        }
    }, [debouncedValue]);

    // Hàm để xóa giá trị tìm kiếm và đặt lại danh sách các hàng được lọc
    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(lists);
    };

    // Hàm xử lý thay đổi giá trị tìm kiếm trong ô nhập liệu
    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearch(searchValue);
        }
    };

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        filterRows(search);
    };

    // Hàm xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Hàm lọc các hàng dựa trên giá trị tìm kiếm
    const filterRows = (searchTerm) => {
        const filteredList = lists.filter((list) => {
            const nameMatch =
                !searchTerm ||
                (list.fullName &&
                    list.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (list.roomName &&
                    list.roomName.toLowerCase().includes(searchTerm.toLowerCase()));
            return nameMatch;
        });
        setFilteredRows(filteredList);
        setPage(1);
    };

    // Hàm xử lý khi nhấn nút xác nhận đặt phòng
    const handleConfirm = async (detailId) => {
        try {
            const success = await api.confirmReservation(detailId);
            if (success) {
                toast.success("Xác nhận đặt phòng thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error("Xác nhận đặt phòng thất bại!");
            }
        } catch (error) {
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    // Hàm xử lý khi nhấn nút từ chối đặt phòng
    const handleReject = async (detailId) => {
        try {
            const success = await api.rejectReservation(detailId);
            if (success) {
                toast.success("Từ chối đặt phòng thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error("Từ chối đặt phòng thất bại!");
            }
        } catch (error) {
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    return (
        <div className="list">
            <div className="listContainer">
                <div className="listList">
                    <div className="datatableTitle">
                        <span>Xác nhận đặt và hủy phòng</span>
                    </div>
                    <div className="listSearch">
                        <h4>Tìm kiếm: </h4>
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
                                            Không tìm thấy kết quả tìm kiếm.
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
                                                        Ảnh
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Tên phòng
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Họ tên
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Tên sự kiện
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Thời gian đặt
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Thời gian trả
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
                                                .map((list) => (
                                                    <TableRow key={list.detailId}>
                                                        <TableCell className="tableCell">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    className="image"
                                                                    src={`${baseIMG}/${list.roomPhoto}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.userName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.eventName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.reserveTime}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.returnTime}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            <span
                                                                className={`status ${getStatusClassName(
                                                                    list.status
                                                                )}`}
                                                            >
                                                                {
                                                                    STATUS_LABELS[
                                                                        list.status
                                                                    ]
                                                                }
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="tableCell btn-action">
                                                            <button
                                                                className="deleteBtn btn"
                                                                onClick={() =>
                                                                    handleReject(
                                                                        list.detailId
                                                                    )
                                                                }
                                                            >
                                                                Từ chối
                                                            </button>
                                                            <button
                                                                className="updateBtn btn"
                                                                onClick={() =>
                                                                    handleConfirm(
                                                                        list.detailId
                                                                    )
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
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

export default List;
