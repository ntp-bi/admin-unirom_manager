import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../components/api/ApiHistories";
import "./detail-history.scss";

const DetailHistory = () => {
    const { historyId } = useParams();
    const [histories, setHistories] = useState(null);

    const STATUS_LABELS = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Trả phòng",
        4: "Đã hủy",
        5: "Từ chối",
    };

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

    const handleComplete = async (historyId) => {
        // Hiển thị hộp thoại xác nhận
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xác nhận hoàn thành lịch sử đặt phòng này không?"
        );
        if (confirmed) {
            try {
                const result = await api.completeHistory(historyId); // Gọi API xác nhận hoàn thành
                if (result) {
                    // Nếu kết quả trả về không rỗng (cập nhật thành công)
                    toast.success(`Lịch sử đặt ${historyId} đã được hoàn thành!`);
                    // Cập nhật state của histories với thông tin mới
                    setHistories((prevHistories) => ({
                        ...prevHistories,
                        endTime: moment().format('DD-MM-YYYY HH:mm:ss') // Format the date
                    }));
                } else {
                    // Nếu kết quả trả về rỗng (có lỗi xảy ra)
                    toast.error(`Có lỗi khi xác nhận hoàn thành lịch sử đặt phòng.`);
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
                                <button
                                    className="completeBtn btn"
                                    onClick={() => handleComplete(histories.id)}
                                >
                                    Xác nhận hoàn thành
                                </button>
                                <button
                                    className="deleteBtn btn"
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
                                            {STATUS_LABELS[histories.status]}
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
