import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../components/api/ApiRoom";
import "./detail-room.scss";

const DetailRoom = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);

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
                                        src={
                                            room && room.img
                                                ? room.img
                                                : "/assets/person/no-image.png"
                                        }
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
                                                {room.nameRoom}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Loại phòng:
                                            <span className="info type-room">
                                                {room.roomType}
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
                                                {room.countOfSeat}
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
