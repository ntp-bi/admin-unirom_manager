import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { updateAccount, getAccountById, getAllRole } from "../../../api/ApiAccount";

import "./update-account.scss";

const UpdateAccount = () => {
    const { accountId } = useParams();

    const [account, setAccount] = useState({
        id: "",
        userName: "",
        password: "",
        fullName: "",
        userId: "",
        roleId: "",
        roleName: "",
    });

    const [accountRoles, setAccountRoles] = useState([]);

    const [errors, setErrors] = useState({
        userName: "",
        password: "",
    });

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

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleAccountRoleChange = (e) => {
        const selectedRoleId = e.target.value;
        setAccount({ ...account, roleId: selectedRoleId });
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

        if (!account.userId) {
            newErrors.userId = "Vui lòng chọn giảng viên.";
            hasErrors = true;
        } else {
            newErrors.userId = "";
        }

        if (!account.roleId) {
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

                            <div className="formInput">
                                <label>Quyền: </label>
                                <select
                                    className="select"
                                    name="roleId"
                                    onChange={handleAccountRoleChange}
                                    value={account.roleId}
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
                                    Cập nhật
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

export default UpdateAccount;
