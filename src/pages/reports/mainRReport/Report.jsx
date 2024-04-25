import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Reporttable from "../../../components/reporttable/Reporttable";

import "./main-report.scss"

const Report = () => {
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
                        <select className="select">
                            <option value="">-- Ngày --</option>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                        <select className="select">
                            <option value="">-- Tháng --</option>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                        <select className="select">
                            <option value="">-- Năm --</option>
                            <option value="">2024</option>
                            <option value="">2025</option>
                        </select>
                        <select className="select">
                            <option value="">-- Số lượng được đặt phòng --</option>
                            <option value="">Hoàn thành</option>
                            <option value="">Đang chờ duyệt</option>
                        </select>                                               
                    </div>
                    <Reporttable />
                </div>
            </div>
        </div>
    );
};

export default Report;
