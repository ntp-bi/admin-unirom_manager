import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { updateAccount, getAccountById } from "../../../components/api/ApiAccount";
import { getAllTeachers } from "../../../components/api/ApiTeacher";

import "./update-account.scss"

const UpdateAccount = () => {
    const { accountId } = useParams();

    const [account, setAccount] = useState({
        userName: "",
        password: "",
        id: "",
        fullName: "",      
        accountId: ""
    });

    const [accountTeachers, setAccountTeachers] = useState([]);

    const [errors, setErrors] = useState({
        userName: "",
        password: "",
        fullName: "",
    });

    useEffect(() => {
        const fetchAccountTeacher = async () => {
            try {
                const result = await getAllTeachers();
                setAccountTeachers(result);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };
        fetchAccountTeacher();
    }, []);

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
        setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
    };

    const handleAccountTeacherChange = (e) => {
        const selectedAccountTeacher = e.target.value;
        const selectedTeacher = accountTeachers.find(
            (teacher) => teacher.fullName === selectedAccountTeacher
        );

        if (selectedTeacher) {
            setAccount({
                ...account,
                id: selectedTeacher.accountId,
                fullName: selectedAccountTeacher,
            });

            setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: "", // Xóa thông báo lỗi khi người dùng chọn một loại phòng mới
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!account.userName) {
            newErrors.userName = "Vui lòng nhập tên tài khoản.";
            hasErrors = true;
        } else {
            newErrors.userName = "";
        }

        if (!account.password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
            hasErrors = true;
        } else {
            newErrors.password = "";
        }

        if (!account.id) {
            newErrors.fullName = "Vui lòng chọn giảng viên.";
            hasErrors = true;
        } else {
            newErrors.fullName = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateAccount(accountId, account);

            if (response.status === 200) {
                toast.success("Cập nhật tài khoản thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật tài khoản!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleInputFocus = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
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
                                    name="userName"
                                    value={account.userName}
                                    onChange={handleAccountInputChange}
                                    onFocus={() => handleInputFocus("userName")}
                                />
                                {errors.userName && (
                                    <div className="error">{errors.userName}</div>
                                )}
                            </div>
                            <div className="formInput">
                                <label>Mật khẩu:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={account.password}
                                    onChange={handleAccountInputChange}
                                    onFocus={() => handleInputFocus("password")}
                                />
                                {errors.password && (
                                    <div className="error">{errors.password}</div>
                                )}
                            </div>

                            {/* <div className="formInput">
                                <label>Tên giảng viên: </label>
                                <select
                                    className="select"
                                    name="fullName"
                                    onChange={handleAccountTeacherChange}
                                    value={account.fullName}
                                    onFocus={() => handleInputFocus("fullName")}
                                >
                                    <option>-- Chọn giảng viên --</option>
                                    {accountTeachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.fullName}>
                                            {teacher.fullName}
                                        </option>
                                    ))}
                                </select>
                                {errors.fullName && (
                                    <div className="error">{errors.fullName}</div>
                                )}
                            </div> */}

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
