import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../components/api/ApiHistories";
import "./detail-history.scss";

const DetailHistory = () => {
    const { historyId } = useParams();
    const [histories, setHistories] = useState([]);
    const [isCompleteBtnVisible, setCompleteBtnVisible] = useState(true);
    const [isDeleteBtnVisible, setDeleteBtnVisible] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

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
                setStatus(historyData.status); // Cập nhật trạng thái từ dữ liệu API

                // Kiểm tra trạng thái và ẩn nút xác nhận hoàn thành nếu cần
                if (historyData.status !== 2) {
                    setCompleteBtnVisible(false);
                }

                if (
                    historyData.status === 1 ||
                    historyData.status === 2 ||
                    historyData.status === 3
                ) {
                    setDeleteBtnVisible(false);
                }
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
                    navigate("/histories");
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

    // Hàm xử lý xác nhận hoàn thành
    const handleConfirmCompleted = async () => {
        try {
            const result = await api.confirmCompleted(historyId); // Gọi API xác nhận hoàn thành
            if (result) {
                // Nếu kết quả trả về true (xác nhận thành công)
                toast.success(`Lịch sử đặt ${historyId} đã được xác nhận hoàn thành!`);
                // Cập nhật giao diện hoặc chuyển hướng nếu cần
                setCompleteBtnVisible(false); // Ẩn nút sau khi xác nhận thành công
            } else {
                // Nếu kết quả trả về false (xác nhận thất bại)
                toast.error(`Có lỗi khi xác nhận hoàn thành.`);
            }
        } catch (error) {
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    return (
        <div className="detailHitory">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span className="title">Xem chi tiết lịch sử đặt và hủy phòng</span>
                </div>
                {histories && (
                    <div className="bottom">
                        <div className="historry-action">
                            {isCompleteBtnVisible &&
                                status === 2 && ( // Kiểm tra trạng thái và isCompleteBtnVisible để ẩn nút
                                    <button
                                        className="completeBtn btn"
                                        onClick={handleConfirmCompleted}
                                    >
                                        Xác nhận hoàn thành
                                    </button>
                                )}
                            {isDeleteBtnVisible &&
                                status !== 1 &&
                                status !== 2 &&
                                status !== 3 && (
                                    <button
                                        className="deleteBtn btn"
                                        onClick={() => handleDelete(histories.id)}
                                    >
                                        Xóa
                                    </button>
                                )}

                            <Link to="/histories" style={{ textDecoration: "none" }}>
                                <button className="backBtn">Quay lại</button>
                            </Link>
                        </div>
                        <form>
                            <div className="left">
                                <img
                                    src={histories.photo || "/assets/person/no-image.png"}
                                    alt=""
                                />
                            </div>
                            <div className="right">
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
                                        Số lượng chỗ ngồi:
                                        <span className="info name-room">
                                            {histories.countOfSeats}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Giới tính:
                                        <span className="info name">
                                            {histories.gender}
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
                                        Ngày sinh:
                                        <span className="info name">
                                            {histories.birthDay}
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
                                            {histories.typeName}
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
                                        Diện tích phòng:
                                        <span className="info name-room">
                                            {histories.area}
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
                                <div className="formInput">
                                    <label>
                                        Mô tả:
                                        <span className="info status">
                                            {histories.description}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Thời gian chấp nhận:
                                        <span className="info time-end">
                                            {histories.acceptTime}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailHistory;
