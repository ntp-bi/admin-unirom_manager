import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./main-report.scss";

export const rows = [
    {
        id: "1",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
        countTeacher: "3",
    },
    {
        id: "2",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
        countTeacher: "3",
    },
    {
        id: "3",
        nameRoom: "DRIVETEC 063 CAR BATTERY",
        roomType: "DRIVETEC",
        countReserve: "10",
        countCanle: "2",
        countEvent: "10",
        countTeacher: "3",
    },
];

export const rowsReportMostRoomBookingtable = [
    {
        roomId: 1,
        roomName: "Phòng 304",
        typeName: "Single",
        area: 50.0,
        img: "/assets/carbattery.jpg",
        countOfSeats: 100,
        description: "Phòng dài",
    },
    {
        roomId: 2,
        roomName: "Phòng 304",
        typeName: "Single",
        area: 50.0,
        img: "/assets/carbattery.jpg",
        countOfSeats: 100,
        description: "Phòng dài",
    },
    {
        roomId: 3,
        roomName: "Phòng 304",
        typeName: "Single",
        area: 50.0,
        img: "/assets/carbattery.jpg",
        countOfSeats: 100,
        description: "Phòng dài",
    },
    {
        roomId: 4,
        roomName: "Phòng 304",
        typeName: "Single",
        area: 50.0,
        img: "/assets/carbattery.jpg",
        countOfSeats: 100,
        description: "Phòng dài",
    },
    {
        roomId: 5,
        roomName: "Phòng 304",
        typeName: "Single",
        area: 50.0,
        img: "/assets/carbattery.jpg",
        countOfSeats: 100,
        description: "Phòng dài",
    },
];

const Report = () => {
    const [selectedDate, setSelectedDate] = useState({
        day: "",
        month: "",
        year: "",
    });

    const [statisticsData, setStatisticsData] = useState(null);
    const [mostBookedRoom, setMostBookedRoom] = useState("");

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setSelectedDate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleStatistics = () => {
        // Kiểm tra xem người dùng đã chọn đủ ngày, tháng, năm chưa
        // if (!selectedDate.day || !selectedDate.month || !selectedDate.year) {
        //     // Nếu không đủ thông tin, hiển thị cảnh báo và không tiếp tục tính toán dữ liệu
        //     alert("Vui lòng chọn đầy đủ ngày, tháng và năm.");
        //     return;
        // }

        // Tiếp tục tính toán dữ liệu thống kê nếu đã chọn đủ ngày, tháng, năm
        const filteredRows = rows.filter((row) => {
            // Kiểm tra xem ngày, tháng, năm của row có trùng khớp với selectedDate không
            return (
                row.day === selectedDate.day &&
                row.month === selectedDate.month &&
                row.year === selectedDate.year
            );
        });

        const totalReserve = filteredRows.reduce(
            (total, row) => total + parseInt(row.countReserve),
            0
        );
        const totalCancel = filteredRows.reduce(
            (total, row) => total + parseInt(row.countCanle),
            0
        );
        const totalEvent = filteredRows.reduce(
            (total, row) => total + parseInt(row.countEvent),
            0
        );

        setStatisticsData({
            totalReserve,
            totalCancel,
            totalEvent,
        });

        const roomCounts = {};
        rowsReportMostRoomBookingtable.forEach((row) => {
            roomCounts[row.roomName] = (roomCounts[row.roomName] || 0) + 1;
        });

        let maxBookings = 0;
        let mostBookedRoomName = "";
        for (const roomName in roomCounts) {
            if (roomCounts[roomName] > maxBookings) {
                maxBookings = roomCounts[roomName];
                mostBookedRoomName = roomName;
            }
        }

        setMostBookedRoom(mostBookedRoomName);
    };

    const years = Array.from(
        { length: 10 },
        (_, index) => new Date().getFullYear() - index
    );

    const renderSelectOptions = (start, end, placeholder, name) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return (
            <select
                className="select"
                name={name}
                value={selectedDate[name]}
                onChange={handleDateChange}
            >
                <option value="">{placeholder}</option>
                {options}
            </select>
        );
    };

    return (
        <div className="report">
            <Sidebar />
            <div className="reportContainer">
                <Navbar />
                <div className="reportList">
                    <div className="datatableTitle">
                        <span>Thống kê báo cáo</span>
                    </div>
                    <div className="reportSearch">
                        {renderSelectOptions(1, 31, "-- Ngày --")}
                        {renderSelectOptions(1, 12, "-- Tháng --")}
                        {renderSelectOptions(
                            years[years.length - 1] - 10,
                            years[0],
                            "-- Năm --"
                        )}
                        <button onClick={handleStatistics}>Thống kê</button>
                    </div>
                    {statisticsData && (
                        <div className="reporttable">
                            <TableContainer component={Paper} className="tablecontainer">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableCell tabble-header header-start">
                                                Tên phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header header-start">
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
                                                    <div className="cellWrapper name-room">
                                                        {row.nameRoom}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="tableCell room-type">
                                                    {row.roomType}
                                                </TableCell>
                                                <TableCell className="tableCell count-reserve">
                                                    {row.countReserve}
                                                </TableCell>
                                                <TableCell className="tableCell count-canle">
                                                    {row.countCanle}
                                                </TableCell>
                                                <TableCell className="tableCell count-event">
                                                    {row.countEvent}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                    <div className="datatableTitle second">
                        <span>Số lượng phòng được đặt nhiều nhất</span>
                    </div>
                    {mostBookedRoom && (
                        <div className="reporttable">
                            <TableContainer component={Paper} className="tablecontainer">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableCell tabble-header header-start">
                                                Ảnh
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header header-start">
                                                Tên phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header header-start">
                                                Loại phòng
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Diện tích
                                            </TableCell>
                                            <TableCell className="tableCell tabble-header">
                                                Số lượng chỗ ngồi
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsReportMostRoomBookingtable.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell className="tableCell header-img">
                                                    <div className="cellWrapper">
                                                        <img
                                                            src={row.img}
                                                            alt=""
                                                            className="image"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="tableCell name-room most-room">
                                                    {row.roomName}
                                                </TableCell>
                                                <TableCell className="tableCell room-type most-room">
                                                    {row.typeName}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.area}
                                                </TableCell>
                                                <TableCell className="tableCell">
                                                    {row.countOfSeats}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Report;
