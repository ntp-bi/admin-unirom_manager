import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addAccount } from "../../../components/api/ApiAccount";
import { getAllTeachers } from "../../../components/api/ApiTeacher";

import "./add-account.scss";

const AddEvent = () => {
    const [newAccount, setNewAccount] = useState({
        userName: "",
        password: "",
        id: "",
        fullName: "",
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
                const teachers = await getAllTeachers();
                setAccountTeachers(teachers);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };
        fetchAccountTeacher();
    }, []);

    const handleAccountInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };
    const handleAccountTeacherChange = (e) => {
        const selectedAccountTeacher = e.target.value;
        const selectedTeacher = accountTeachers.find(
            (teacher) => teacher.fullName === selectedAccountTeacher
        );

        if (selectedTeacher) {
            setNewAccount({
                ...newAccount,
                id: selectedTeacher.id,
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

        if (!newAccount.userName) {
            newErrors.userName = "Vui lòng nhập tên tài khoản.";
            hasErrors = true;
        } else {
            newErrors.userName = "";
        }

        if (!newAccount.password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
            hasErrors = true;
        } else {
            newErrors.password = "";
        }

        if (!newAccount.id) {
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
            await addAccount(
                newAccount.userName,
                newAccount.password,
                newAccount.id,
                newAccount.fullName
            );
            toast.success("Tài khoản đã được thêm thành công!");
            setNewAccount({ userName: "", password: "", fullName: "" });

            setErrors({
                userName: "",
                password: "",
                fullName: "",
            });
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm tài khoản!");
            console.error("Error adding account:", error);
        }
    };

    const handleInputFocus = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
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
                                    name="userName"
                                    value={newAccount.userName}
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
                                    value={newAccount.password}
                                    onChange={handleAccountInputChange}
                                    onFocus={() => handleInputFocus("password")}
                                />
                                {errors.password && (
                                    <div className="error">{errors.password}</div>
                                )}
                            </div>
                            <div className="formInput">
                                <label>Tên giảng viên: </label>
                                <select
                                    className="select"
                                    name="fullName"
                                    onChange={handleAccountTeacherChange}
                                    value={newAccount.fullName}
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
