import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addAccount } from "../../../components/api/ApiAccount";
import "./add-account.scss";

const AddEvent = () => {
    const [newAccount, setNewAccount] = useState({
        userName: "",
        password: "",        
    });

    const handleAccountInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAccount(
                newAccount.userName,
                newAccount.password,
            );
            toast.success("Tài khoản đã được thêm thành công!");
            setNewAccount({ userName: "", password: ""});
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm tài khoản!");
            console.error("Error adding account:", error);
        }
    };

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
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên tài khoản:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    required
                                    name="userName"
                                    value={newAccount.userName}
                                    onChange={handleAccountInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Mật khẩu:</label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={newAccount.password}
                                    onChange={handleAccountInputChange}
                                />
                            </div>                           

                            <div className="btn-action">
                                <Link to="/accounts">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
