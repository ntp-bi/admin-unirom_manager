import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addAccount, getAllRole } from "../../../api/ApiAccount";
import { getAllTeachers } from "../../../api/ApiTeacher";

import "./add-account.scss";

const AddEvent = () => {
    const [newAccount, setNewAccount] = useState({
        userName: "",
        password: "",
        userId: "",
        roleId: "",
        roleName: "",
    });

    const [accountTeachers, setAccountTeachers] = useState([]);
    const [accountRoles, setAccountRoles] = useState([]);

    const [errors, setErrors] = useState({
        userName: "",
        password: "",
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

    useEffect(() => {
        const fetchRoleAccount = async () => {
            try {
                const roles = await getAllRole();
                setAccountRoles(roles);
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };
        fetchRoleAccount();
    }, []);

    const handleAccountInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleAccountTeacherChange = (e) => {
        const selectedUserId = e.target.value;
        setNewAccount({ ...newAccount, userId: selectedUserId });
    };

    const handleAccountRoleChange = (e) => {
        const selectedRoleId = e.target.value;
        setNewAccount({ ...newAccount, roleId: selectedRoleId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!newAccount.userName) {
            newErrors.userName = "Vui lòng nhập tên tài khoản.";
            hasErrors = true;
        } else if (!emailRegex.test(newAccount.userName)) {
            newErrors.userName = "Tên tài khoản phải là email hợp lệ.";
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

        if (!newAccount.userId) {
            newErrors.userId = "Vui lòng chọn giảng viên.";
            hasErrors = true;
        } else {
            newErrors.userId = "";
        }

        if (!newAccount.roleId) {
            newErrors.roleId = "Vui lòng chọn quyền.";
            hasErrors = true;
        } else {
            newErrors.roleId = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await addAccount(
                newAccount.userName,
                newAccount.password,
                newAccount.userId,
                newAccount.roleId,
                newAccount.roleName
            );
            toast.success("Tài khoản đã được thêm thành công!");
            setNewAccount({
                userName: "",
                password: "",
                userId: "",
                roleId: "",
                roleName: "",
            });

            setErrors({
                userName: "",
                password: "",
                userId: "",
                roleId: "",
                roleName: "",
            });
        } catch (error) {
            toast.error("Tài khoản đã tồn tại!");
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
                                    name="userId"
                                    onChange={handleAccountTeacherChange}
                                    value={newAccount.userId}
                                    onFocus={() => handleInputFocus("userId")}
                                >
                                    <option>-- Chọn giảng viên --</option>
                                    {accountTeachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.fullName}
                                        </option>
                                    ))}
                                </select>
                                {errors.userId && (
                                    <div className="error">{errors.userId}</div>
                                )}
                            </div>

                            <div className="formInput">
                                <label>Quyền: </label>
                                <select
                                    className="select"
                                    name="roleId"
                                    onChange={handleAccountRoleChange}
                                    value={newAccount.roleId}
                                    onFocus={() => handleInputFocus("roleId")}
                                >
                                    <option>-- Chọn quyền --</option>
                                    {accountRoles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.roleName}
                                        </option>
                                    ))}
                                </select>
                                {errors.roleId && (
                                    <div className="error">{errors.roleId}</div>
                                )}
                            </div>

                            <div className="btn-action">
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                                <Link to="/accounts">
                                    <button className="back">Trở về</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
