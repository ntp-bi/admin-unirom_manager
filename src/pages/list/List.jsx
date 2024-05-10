// Import thêm useState từ react
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
import * as searchServices from "../../components/services/searchService";
import {
    rejectReservation,
    
    getAllList,
    confirmReservation,
} from "../../components/api/ApiList.jsx";

import "./list.scss";

const List = () => {
    const [lists, setLists] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [filteredRows, setFilteredRows] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const debouncedValue = useDebounce(search, 500);
    const inputRef = useRef();

    const STATUS_LABELS = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Từ chối",
    };

    const getStatusClassName = (status) => {
        switch (parseInt(status)) {
            case 1:
                return "pending";
            case 2:
                return "confirmed";
            case 3:
                return "cancelled";
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchLists = async () => {
            try {
                setIsLoading(true);
                const result = await getAllList();
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

    useEffect(() => {
        const fetchApi = async () => {
            setLoadingSearch(true);

            const result = await searchServices.search(debouncedValue);

            setLoadingSearch(false);
            return result;
        };

        if (debouncedValue.trim() !== "" && search.trim() !== "") {
            fetchApi();
        }
    }, [debouncedValue]);

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(lists);
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

    const handleSearch = () => {
        filterRows(search);
    };

    const filterRows = (searchTerm) => {
        const filteredList = lists.filter((history) => {
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
            return nameMatch;
        });
        setFilteredRows(filteredList);
        setPage(1);
    };

    const handleConfirm = async (listId) => {
        try {
            const success = await confirmReservation(listId);
            if (success) {
                // Xác nhận thành công
                toast.success("Xác nhận đặt phòng thành công!");
                // Cập nhật trạng thái đặt phòng trong danh sách
                const updatedLists = lists.map((item) =>
                    item.listId === listId ? { ...item, status: 2 } : item
                );
                setLists(updatedLists);
                setFilteredRows(updatedLists);
                window.location.reload();
            } else {
                // Xác nhận thất bại
                toast.error("Xác nhận đặt phòng thất bại!");
            }
        } catch (error) {
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    const handleReject = async (listId) => {
        try {
            const success = await rejectReservation(listId);
            if (success) {
                // Từ chối thành công
                toast.success("Từ chối đặt phòng thành công!");       
                // Cập nhật trạng thái đặt phòng trong danh sách
                const updatedLists = lists.map((item) =>
                    item.listId === listId ? { ...item, status: 5 } : item
                );
                setLists(updatedLists);
                setFilteredRows(updatedLists);
                window.location.reload();
            } else {
                // Từ chối thất bại
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
                                                    <TableRow key={list.id}>
                                                        <TableCell className="tableCell">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    className="image"
                                                                    src={list.photo}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {list.fullName}
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
                                                                        list.id
                                                                    )
                                                                }
                                                            >
                                                                Từ chối
                                                            </button>
                                                            <button
                                                                className="updateBtn btn"
                                                                onClick={() =>
                                                                    handleConfirm(
                                                                        list.id
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
