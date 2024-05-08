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

import { fetchReportsByDate } from "../../../components/api/ApiReport";

import "./main-report.scss";

const Report = () => {
    const [reports, setReports] = useState([]);
    const [mostBookedRooms, setMostBookedRooms] = useState([]);
    const [leastBookedRooms, setLeastBookedRooms] = useState([]);

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const handleStatistics = async () => {
        if (!selectedYear) {
            alert("Vui lòng chọn thông tin trước khi thực hiện thống kê.");
            return;
        }
    
        // gọi hàm fetchReportsByDate từ API để lấy dữ liệu báo cáo dựa trên ngày, tháng và năm được chọn.
        const data = await fetchReportsByDate(selectedDay, selectedMonth, selectedYear);
    
        if (data) {
            setReports(data);
    
            // Find the most and least booked rooms across all reports
            let allMostBookedRooms = [];
            let allLeastBookedRooms = [];
    
            data.forEach(report => {
                allMostBookedRooms.push(...report.theMostRoomTypeOfBooking);
                allLeastBookedRooms.push(...report.leastOfRoomTypeOfBooking);
            });
    
            // Sort rooms by count in descending order
            allMostBookedRooms.sort((a, b) => b.countOfBookingRoom - a.countOfBookingRoom);
            allLeastBookedRooms.sort((a, b) => a.countOfBookingRoom - b.countOfBookingRoom);
    
            // Set most and least booked rooms
            setMostBookedRooms(allMostBookedRooms);
            setLeastBookedRooms(allLeastBookedRooms);
        } else {
            setReports([]);
            setMostBookedRooms([]);
            setLeastBookedRooms([]);
        }
    };
    

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Tạo mảng chứa số ngày từ 1 đến 31
    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    // Tạo mảng chứa số tháng từ 1 đến 12
    const months = Array.from({ length: 12 }, (_, index) => index + 1);

    // Tạo mảng chứa năm từ 2021 đến 2030 (ví dụ)
    const years = Array.from({ length: 10 }, (_, index) => 2021 + index);

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
                        <select
                            className="select"
                            value={selectedDay}
                            onChange={handleDayChange}
                        >
                            <option value="">-- Chọn ngày --</option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            <option value="">-- Chọn tháng --</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            <option value="">-- Chọn năm --</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleStatistics}>Thống kê</button>
                    </div>

                    <div className="reportDetails">
                        {reports.length > 0 && (
                            <div className="reporttable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="tableCell tabble-header">
                                                    Ngày
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng đặt phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng loại phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng giáo viên
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng trả phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng sự kiện
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {reports.map((report, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="tableCell">
                                                        {`${report.day}/${report.month}/${report.year}`}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfBookingRoom}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfRoomType}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfTeacher}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfReturnBookingRoom}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfEvent}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}

                        {mostBookedRooms.length > 0 && (
                            <div>
                                <div className="datatableTitle second">
                                    <span>Số lượng phòng được đặt nhiều nhất</span>
                                </div>

                                <div className="reporttable">
                                    <TableContainer
                                        component={Paper}
                                        className="tablecontainer"
                                    >
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
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
                                                {mostBookedRooms.map((room) => (
                                                    <TableRow key={room.roomId}>
                                                        <TableCell className="tableCell header-img">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    src={room.photo}
                                                                    alt=""
                                                                    className="image"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell name-room most-room">
                                                            {room.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell room-type most-room">
                                                            {room.typeName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.area}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.countOfSeats}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}

                        {leastBookedRooms.length > 0 && (
                            <div>
                                <div className="datatableTitle second">
                                    <span>Số lượng phòng được đặt ít nhất</span>
                                </div>

                                <div className="reporttable">
                                    <TableContainer
                                        component={Paper}
                                        className="tablecontainer"
                                    >
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
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
                                                {leastBookedRooms.map((room) => (
                                                    <TableRow key={room.roomId}>
                                                        <TableCell className="tableCell header-img">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    src={room.photo}
                                                                    alt=""
                                                                    className="image"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell name-room most-room">
                                                            {room.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell room-type most-room">
                                                            {room.typeName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.area}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.countOfSeats}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
