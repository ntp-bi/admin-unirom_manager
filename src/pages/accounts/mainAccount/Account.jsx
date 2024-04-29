import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import * as searchServices from "../../../components/services/searchService";

import "./main-account.scss";

const rows = [
    {
        id: "1",
        fullName: "Nguyễn Tâm Phước",
        userAccount: "ntp",
    },
    {
        id: "2",
        fullName: "Nguyễn Tâm Phước",
        userAccount: "ntp",
    },
    {
        id: "3",
        fullName: "Nguyễn Tâm Phước",
        userAccount: "ntp",
    },
    {
        id: "4",
        fullName: "a",
        userAccount: "abc",
    },
    {
        id: "5",
        fullName: "Nguyễn Tâm Phước",
        userAccount: "ntp",
    },
    {
        id: "6",
        fullName: "Nguyễn Tâm Phước",
        userAccount: "ntp",
    },
];

const Account = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

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
        <div className="account">
            <Sidebar />
            <div className="accountContainer">
                <Navbar />
                <div className="accountList">
                    <div className="datatableTitle">
                        <span>Quản lý tài khoản</span>
                    </div>
                    <div className="accountSearch">
                        <h4>Tìm kiếm: </h4>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên tài khoản muốn tìm."
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
                            to="/accounts/add-account"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    <div className="accounttable">
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
                                                Họ tên
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Tên tài khoản
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
                                                <TableCell className="tableCell name-account">
                                                    {row.fullName}
                                                </TableCell>
                                                <TableCell className="tableCell user-account">
                                                    {row.userAccount}
                                                </TableCell>
                                                <TableCell className="tableCell btn-action">
                                                    <button className="deleteBtn btn">
                                                        Xóa
                                                    </button>
                                                    <Link
                                                        to="/accounts/update-account/123"
                                                        className="btn"
                                                    >
                                                        <button className="updateBtn">
                                                            Cập nhật
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

export default Account;
