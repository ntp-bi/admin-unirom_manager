import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../api/ApiRoom";
import * as typeApi from "../../../api/ApiTypeRoom";
import { baseIMG } from "../../../api/apiConfig";

import "./detail-room.scss";

const DetailRoom = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);

    const STATUS_LABELS = {
        1: "Bị hỏng hoặc bảo trì",
        2: "Có thể sử dụng",
    };

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const result = await typeApi.getAllType(); // Gọi API để lấy danh sách loại phòng
                setRoomTypes(result); // Lưu trữ danh sách loại phòng vào state
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        };
        fetchRoomTypes();
    }, []);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await api.getRoomById(roomId);
                console.log("Room data:", roomData); // Add this line
                setRoom(roomData);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };

        fetchRoom();
    }, [roomId]);

    return (
        <div className="detail">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span>Xem chi tiết thông tin phòng</span>
                </div>
                <div className="bottom">
                    {room && (
                        <>
                            <div className="left">
                                <div className="image">
                                    <img
                                        src={`${baseIMG}/${room.image}`}
                                        alt=""
                                        className="image"
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <form>
                                    <div className="formInput">
                                        <label>
                                            Tên phòng:
                                            <span className="info name-room">
                                                {room.roomName}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Loại phòng:
                                            <span className="info type-room">
                                                {room.typeName}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Trạng thái:
                                            <span className="info type-room">
                                                {STATUS_LABELS[room.status]}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Diện tích:
                                            <span className="info area">
                                                {room.area}m2
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Số lượng chỗ ngồi:
                                            <span className="info count-seat">
                                                {room.countOfSeats}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            <span className="desc">Mô tả:</span>
                                            <span className="info description">
                                                {room.description}
                                            </span>
                                        </label>
                                    </div>
                                </form>
                                <div className="btn-action">
                                    <Link to="/rooms">
                                        <button className="back">Trở về</button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailRoom;
