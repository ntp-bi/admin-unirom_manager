import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

import "./eventtable.scss";

export const rows = [
    {
        id: "DRBDM063",
        nameEvent: "DRIVETEC 063 CAR BATTERY",
    },
    {
        id: "DRBDM063",
        nameEvent: "Trung đi lấy chồng",
    },
    {
        id: "DRBDM063",
        nameEvent: "DRIVETEC",
    },
    {
        id: "DRBDM063",
        nameEvent: "CAR BATTERY",
    },
    {
        id: "DRBDM063",
        nameEvent: "DRIVETEC BATTERY",
    },
];

const Roomtable = () => {
    const [page, setPage] = useState(1); // State for current page
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <div className="eventtable">
            <TableContainer component={Paper} className="tablecontainer">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell tabble-header">
                                Mã sự kiện
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Tên sự kiện
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
                                <TableCell className="tableCell id-event">{row.id}</TableCell>
                                <TableCell className="tableCell name-event">
                                    {row.nameEvent}
                                </TableCell>
                                <TableCell className="tableCell btn-action">
                                    <button className="deleteBtn btn">Xóa</button>
                                    <Link to="/events/update-event/123" className="btn">
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

export default Roomtable;
