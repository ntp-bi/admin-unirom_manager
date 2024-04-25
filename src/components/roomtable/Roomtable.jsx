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
import "./roomtable.scss";

export const rows = [
    {
        id: "DRBDM063",
        img: "/assets/carbattery.jpg",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        status: "Trống",
    },
    {
        id: "51Wy1UhvbZL",
        img: "/assets/engineoil.jpg",
        nameRoom: "Auto Parts Engine Oil Viscosity",
        roomType: "Turbo",
        status: "Hỏng",
    },
    {
        id: "HJKDM063",
        img: "/assets/engineoil2.jpg",
        nameRoom: "ENGINE OIL",
        roomType: "Turbo",
        status: "Đặt",
    },
    {
        id: "31CTWTB2",
        img: "/assets/engineoil.jpg",
        nameRoom: "HONDA 4 STROKE ENGINE OIL",
        roomType: "Platinum",
        status: "Trống",
    },
    {
        id: "HRDDR3055",
        img: "/assets/wheel.jpg",
        nameRoom: "Platinum Plus - Wheel",
        roomType: "Platinum",
        status: "Đặt",
    },
    {
        id: "FGH543",
        img: "/assets/carbrush.jpg",
        nameRoom: "Short Handle Car and Motocycle Wheel Brush",
        roomType: "Amazon",
        status: "Trống",
    },
    {
        id: "YABYBX3055",
        img: "/assets/carbattery.jpg",
        nameRoom: "YUASA 055 3000 SERIES CAR BATTERY -4 YEAR WARRANTY",
        roomType: "YUASA",
        status: "Đặt",
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
        <div className="roomtable">
            <TableContainer component={Paper} className="tablecontainer">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell tabble-header">Ảnh</TableCell>
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
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img src={row.img} alt="" className="image" />
                                        {row.product}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.nameRoom}
                                </TableCell>
                                <TableCell className="tableCell">
                                    {row.roomType}
                                </TableCell>
                                <TableCell className="tableCell">
                                    <span className={`status ${row.status}`}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell className="tableCell btn-action">
                                    <button className="deleteBtn btn">Xóa</button>
                                    <Link to="/rooms/update-room/123" className="btn">
                                        <button className="updateBtn">
                                            Cập nhật
                                        </button>
                                    </Link>
                                    <Link to="/rooms/detail-room/123" className="btn">
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

export default Roomtable;
