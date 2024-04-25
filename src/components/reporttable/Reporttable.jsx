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

import "./reporttable.scss";

export const rows = [
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
    },
];

const Reporttable = () => {
    const [page, setPage] = useState(1); // State for current page
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <div className="historytable">
            <TableContainer component={Paper} className="tablecontainer">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell tabble-header">
                                Tên phòng
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Loại phòng
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Số lượng đặt
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Số lượng hủy
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Số lượng sự kiện
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">{row.nameRoom}</div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.roomType}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.countReserve}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.countCanle}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.countEvent}
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

export default Reporttable;
