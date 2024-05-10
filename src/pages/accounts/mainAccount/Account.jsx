import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import * as searchServices from "../../../components/services/searchService";
import * as api from "../../../components/api/ApiAccount"

import "./main-account.scss";

const Account = () => {
    const [account, setAccount] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc
    const [dataLoaded, setDataLoaded] = useState(false); // State kiểm tra xem dữ liệu đã được tải hay chưa

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    useEffect(() => {
        fetchRooms(); // Gọi hàm fetchRooms khi component được render
    }, []);

    // Hàm gọi API để lấy danh sách sự kiện
    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllAccount();
            setAccount(result);
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
            filterRows(debouncedValue);
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

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(account);
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
        const filteredRows = account.filter((account) => {
            const nameMatch =
                !searchTerm ||
                account.userName.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        setFilteredRows(filteredRows);
    };

    // Hàm xử lý xóa sự kiện
    const handleDelete = async (accountId) => {
        // Hiển thị hộp thoại xác nhận
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?");
        if (confirmed) {
            try {
                const result = await api.deleteAccount(accountId); // Gọi API xóa sự kiện
                if (result) {
                    // Nếu kết quả trả về không rỗng (xóa sự kiện thành công)
                    toast.success(`Tài khoản ${accountId} đã được xóa thành công!`);
                    fetchRooms();
                } else {
                    // Nếu kết quả trả về rỗng (có lỗi xảy ra)
                    toast.error(`Có lỗi khi xóa sự kiện.`);
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
                            to="/accounts/add-account"
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
                            <div className="accounttable">
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
                                                        ID
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Tên tài khoản
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Họ tên
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
                                                .map((account) => (
                                                    <TableRow key={account.accountId}>
                                                         <TableCell className="tableCell id-account">
                                                            {account.accountId}
                                                        </TableCell>
                                                        <TableCell className="tableCell name-account">
                                                            {account.userName}
                                                        </TableCell>
                                                        <TableCell className="tableCell name-account">
                                                            {account.fullName}
                                                        </TableCell>
                                                        <TableCell className="tableCell btn-action">
                                                            <button
                                                                className="deleteBtn btn"
                                                                onClick={() =>
                                                                    handleDelete(account.accountId)
                                                                }
                                                            >
                                                                Xóa
                                                            </button>
                                                            <Link
                                                                to={`/accounts/update-account/${account.accountId}`}
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

export default Account;
