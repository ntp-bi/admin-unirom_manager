import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

import "./account-table.scss";

export const rows = [
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn A",
        userAccount: "nva"    
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn B",
        userAccount: "nvb"    
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn C",
        userAccount: "nvc"    
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn D",
        userAccount: "nvd"    
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn E",
        userAccount: "nve"    
    },
    {
        id: "DRBDM063",
        fullName: "Nguyễn Văn F",
        userAccount: "nvf"    
    },
];

const Accounttable = () => {
    const [page, setPage] = useState(1); // State for current page
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <div className="accounttable">
            <TableContainer component={Paper} className="tablecontainer">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell name-account">
                                    {row.fullName}
                                </TableCell>
                                <TableCell className="tableCell user-account">
                                    {row.userAccount}
                                </TableCell>
                                <TableCell className="tableCell btn-action">
                                    <button className="deleteBtn btn">Xóa</button>
                                    <Link to="/accounts/update-account/123" className="btn">
                                        <button className="updateBtn">Cập nhật</button>
                                    </Link>
                                    {/* <Link to="/events/detail-event/123" className="btn">
                                        <button className="detailBtn">
                                            Xem chi tiết
                                        </button>
                                    </Link> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                className="pagination"
                count={Math.ceil(rows.length / rowsPerPage)} // Calculate total pages
                page={page}
                onChange={handleChangePage}
            />
        </div>
    );
};

export default Accounttable;
