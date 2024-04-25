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

import "./histotytable.scss";

export const rows = [
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "completed",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "pending",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "completed",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "pending",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "completed",
    },
    {
        id: "DRBDM063",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        fullName: "Nguyễn Tâm Phước",
        ReserveTime: "24/04/2024 12:00:00",
        ReturnTime: "24/04/2024 14:00:00",
        EndTime: "24/04/2024 14:00:00",
        status: "pending",
    },
];

const Historytable = () => {
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
                                Họ tên
                            </TableCell>
                            <TableCell className="tableCell tabble-header">
                                Loại phòng
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
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                       {row.nameRoom}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.fullName}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.roomType}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.ReserveTime}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.ReturnTime}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.EndTime}
                                </TableCell>
                                <TableCell className="tableCell">
                                    <span className={`status ${row.status}`}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell className="tableCell btn-action">                                    
                                    <Link to="/historys/detail-history/123" className="btn">
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
            <Pagination
                className="pagination"
                count={Math.ceil(rows.length / rowsPerPage)} // Calculate total pages
                page={page}
                onChange={handleChangePage}
            />
        </div>
    );
};

export default Historytable;
