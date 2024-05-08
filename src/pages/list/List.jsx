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
import * as api from "../../components/api/ApiList";
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
            const confirmedItemIndex = lists.findIndex((list) => list.listId === listId);

            if (confirmedItemIndex !== -1) {
                const updatedFilteredRows = [...filteredRows];
                updatedFilteredRows[confirmedItemIndex].status = 2;
                setFilteredRows(updatedFilteredRows);

                await api.updateListStatus(listId, 2); // Cập nhật trạng thái của danh sách

                const confirmedItem = lists[confirmedItemIndex];

                // Gửi mục đã xác nhận đến API lịch sử
                await fetch("https://66359f0e415f4e1a5e24f92a.mockapi.io/histories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(confirmedItem),
                });

                // Xóa danh sách có trạng thái là 2 khỏi API lists
                await api.deleteList(listId);

                // Cập nhật danh sách để chỉ giữ lại các mục có trạng thái là 1
                const updatedLists = lists.filter((list) => list.status !== 2);
                setLists(updatedLists);
                setFilteredRows(updatedLists);

                toast.success("Xác nhận đặt phòng thành công!");
            } else {
                toast.error("Không tìm thấy mục cần xác nhận trong danh sách.");
            }
        } catch (error) {
            toast.error(`Lỗi khi xác nhận đặt phòng: ${error.message}`);
        }
    };

    const handleReject = async (listId) => {
        try {
            const rejectedItemIndex = lists.findIndex((list) => list.listId === listId);

            if (rejectedItemIndex !== -1) {
                const updatedFilteredRows = [...filteredRows];
                updatedFilteredRows[rejectedItemIndex].status = 3; // Cập nhật trạng thái là 3 (từ chối)
                setFilteredRows(updatedFilteredRows);

                await api.updateListStatus(listId, 3); // Cập nhật trạng thái của danh sách thành 3 (từ chối)

                const rejectedItem = lists[rejectedItemIndex];

                // Gửi mục đã từ chối đến API lịch sử
                await fetch("https://66359f0e415f4e1a5e24f92a.mockapi.io/histories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(rejectedItem),
                });

                // Xóa danh sách có trạng thái là 3 (từ chối) khỏi API lists
                await api.deleteList(listId);

                // Cập nhật danh sách để chỉ giữ lại các mục có trạng thái khác 3
                const updatedLists = lists.filter((list) => list.status !== 3);
                setLists(updatedLists);
                setFilteredRows(updatedLists);

                toast.success("Từ chối đặt phòng thành công!");
            } else {
                toast.error("Không tìm thấy mục cần từ chối trong danh sách.");
            }
        } catch (error) {
            toast.error(`Lỗi khi từ chối đặt phòng: ${error.message}`);
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
                                                    <TableRow key={list.listId}>
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
                                                                        list.listId
                                                                    )
                                                                }
                                                            >
                                                                Từ chối
                                                            </button>
                                                            <button
                                                                className="updateBtn btn"
                                                                onClick={() =>
                                                                    handleConfirm(
                                                                        list.listId
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
