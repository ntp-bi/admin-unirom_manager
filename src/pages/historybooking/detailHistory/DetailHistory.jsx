import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../components/api/ApiHistories";
import "./detail-history.scss";

const DetailHistory = () => {
    const { historyId } = useParams();
    const [histories, setHistories] = useState(null);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const statuses = await api.getAllHistory();
                setStatus(statuses);
            } catch (error) {
                console.error("Error fetching room statuses:", error);
            }
        };
        fetchStatus();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await api.getHistoryById(historyId);
                setHistories(historyData);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [historyId]);

    const handleChangeStatus = async (e) => {
        const newStatus = e.target.value;
        try {
            await api.updateHistoryStatus(historyId, newStatus);
            setHistories((prevHistories) => ({
                ...prevHistories,
                status: newStatus,
            }));
            toast.success(
                `Trạng thái của lịch sử đặt phòng đã được cập nhật thành công!`
            );
        } catch (error) {
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    // Hàm xử lý xóa sự kiện
    const handleDelete = async (historyId) => {
        // Hiển thị hộp thoại xác nhận
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa lịch sử đặt phòng này không?"
        );
        if (confirmed) {
            try {
                const result = await api.deleteHistory(historyId); // Gọi API xóa lịch sử đặt phòng
                if (result) {
                    // Nếu kết quả trả về không rỗng (xóa lịch sử đặt phòng thành công)
                    toast.success(`Lịch sử đặt ${historyId} đã được xóa thành công!`);
                } else {
                    // Nếu kết quả trả về rỗng (có lỗi xảy ra)
                    toast.error(`Có lỗi khi xóa lịch sử đặt phòng.`);
                }
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);
    };

    return (
        <div className="detailHitory">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span>Xem chi tiết lịch sử đặt và hủy phòng</span>
                </div>
                {histories && (
                    <div className="bottom">
                        <div className="right">
                            <div className="historry-action">
                                <div className="formInput">
                                    <select
                                        className="select"
                                        onChange={handleChangeStatus}
                                        name="status"
                                        value={histories.status}
                                    >
                                        <option>-- Xử lý trạng thái --</option>
                                        {status.map((state) => (
                                            <option key={state} value={state.status}>
                                                {state.status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    className="deleteBtn"
                                    onClick={() => handleDelete(histories.id)}
                                >
                                    Xóa
                                </button>
                                <Link to="/histories" style={{ textDecoration: "none" }}>
                                    <button className="backBtn">Quay lại</button>
                                </Link>
                            </div>
                            <form>
                                <div className="formInput">
                                    <label>
                                        Họ tên:
                                        <span className="info name">
                                            {histories.fullName}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Trạng thái:
                                        <span className="info status">
                                            {histories.status}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Tên phòng:
                                        <span className="info name-room">
                                            {histories.roomName}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Thời gian đặt phòng:
                                        <span className="info time-reserve">
                                            {histories.reserveTime}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label htmlFor="">
                                        Loại phòng:
                                        <span className="info type-room">
                                            {histories.typeRoom}
                                        </span>
                                    </label>
                                </div>
                                
                                <div className="formInput">
                                    <label>
                                        Thời gian trả phòng:
                                        <span className="info time-return">
                                            {histories.returnTime}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Tên sự kiện:
                                        <span className="info">
                                            {histories.eventName}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Thời gian kết thúc:
                                        <span className="info time-end">
                                            {histories.endTime}
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailHistory;
