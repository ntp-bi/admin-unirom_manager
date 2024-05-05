import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { updateAccount,getAccountById } from "../../../components/api/ApiAccount";

import "./update-account.scss"

const UpdateAccount = () => {
    const { accountId } = useParams();

    const [account, setAccount] = useState({
        userName: "",
        password: "",
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const accountData = await getAccountById(accountId);
                setAccount(accountData);
            } catch (error) {
                console.error("Error fetching account:", error);
            }
        };

        fetchAccount();
    }, [accountId]);

    const handleAccountInputChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Account Data to be updated:", account); // Xem dữ liệu phòng trước khi gửi đi

        try {
            const response = await updateAccount(accountId, account);
            console.log("Update account Response:", response); // Xem phản hồi từ server
            if (response.status === 200) {
                toast.success("Cập nhật tài khoản thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật tài khoản!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="update__account">
            <Sidebar />
            <div className="updateContainer">
                <Navbar />
                <div className="top">
                    <span>Cập nhật thông tin tài khoản</span>
                </div>
                <div className="bottom bottom-update">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Tên tài khoản:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    required
                                    name="userName"
                                    value={account.userName}
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
                                    value={account.password}
                                    onChange={handleAccountInputChange}
                                />
                            </div>

                            <div className="btn-action">
                                <Link to="/accounts">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;
