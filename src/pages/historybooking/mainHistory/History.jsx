import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Historytable from "../../../components/historytable/Histotytable";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import "./main-history.scss";

const History = () => {
    return (
        <div className="history">
            <Sidebar />
            <div className="historyContainer">
                <Navbar />
                <div className="historyList">
                    <div className="datatableTitle">
                        <span>Lịch sử đặt và hủy phòng</span>
                    </div>
                    <div className="historySearch">
                        <select className="select">
                            <option value="">-- Trạng thái --</option>
                            <option value="">Hoàn thành</option>
                            <option value="">Đang chờ duyệt</option>
                        </select>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["SingleInputDateRangeField"]}>
                                <DateRangePicker
                                    slots={{ field: SingleInputDateRangeField }}
                                    name="allowedRange"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Nhập tên phòng hoặc họ tên khách hàng muốn tìm."
                            />
                            <SearchOutlinedIcon className="icon" />
                        </div>
                    </div>
                    <Historytable />
                </div>
            </div>
        </div>
    );
};

export default History;
