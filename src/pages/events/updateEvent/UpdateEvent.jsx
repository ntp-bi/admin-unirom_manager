import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { Link } from "react-router-dom";

const UpdateEvent = () => {
    return (
        <div className="add__event">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Cập nhật thông tin sự kiện</span>
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
                                <button className="btn-add" type="submit">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;
