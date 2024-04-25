import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./add-event.scss";
import { Link } from "react-router-dom";

const AddEvent = () => {
    return (
        <div className="add__event">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Thêm sự kiện mới</span>
                </div>
                <div className="bottom">                    
                    <div className="right">
                        <form>                            
                            <div className="formInput">
                                <label>Tên sự kiện:</label>
                                <input type="text" placeholder="Nhập tên sự kiện" />
                            </div>                            

                            <div className="btn-action">
                                <Link to="/events">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
