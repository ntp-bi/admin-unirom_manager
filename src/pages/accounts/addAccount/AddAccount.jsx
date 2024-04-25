import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./add-account.scss";
import { Link } from "react-router-dom";

const AddEvent = () => {
    return (
        <div className="add__account">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Thêm tài khoản mới</span>
                </div>
                <div className="bottom">                    
                    <div className="right">
                        <form>                            
                            <div className="formInput">
                                <label>Tên tài khoản:</label>
                                <input type="text" placeholder="Nhập tên tài khoản" />
                            </div>       
                            <div className="formInput">
                                <label>Mật khẩu:</label>
                                <input type="password" placeholder="Nhập mật khẩu" />
                            </div>        
                            <div className="formInput">
                                <label>Nhập lại mật khẩu:</label>
                                <input type="password" placeholder="Nhập lại mật khẩu" />
                            </div>                  

                            <div className="btn-action">
                                <Link to="/accounts">
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
