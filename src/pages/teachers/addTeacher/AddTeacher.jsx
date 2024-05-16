import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addTeacher } from "../../../api/ApiTeacher";
import "./add-teacher.scss";

const AddTeacher = () => {
    const defaultBirthday = "2000-01-01";

    const [newTeacher, setNewTeacher] = useState({
        fullName: "",
        birthDay: defaultBirthday,
        gender: true,
        photo: null,
    });
    const [imagePreview, setImagePreview] = useState("");

    const [errors, setErrors] = useState({
        fullName: "",
    });

    const handleTeacherInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher({ ...newTeacher, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setNewTeacher({ ...newTeacher, photo: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!newTeacher.fullName) {
            newErrors.fullName = "Vui lòng nhập họ tên.";
            hasErrors = true;
        } else {
            newErrors.fullName = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await addTeacher(
                newTeacher.fullName,
                newTeacher.birthDay,
                newTeacher.photo,
                newTeacher.gender
            );
            toast.success("Giảng viên đã được thêm vào cơ sở dữ liệu");
            setNewTeacher({
                fullName: "",
                birthDay: defaultBirthday,
                photo: null,
                gender: true,
            });
            setImagePreview("");
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
        <div className="addTeacher">
            <Sidebar />
            <div className="addContainer">
                <Navbar />
                <div className="top">
                    <span>Thêm giảng viên mới</span>
                </div>
                <div className="bottom">
                    <form onSubmit={handleSubmit}>
                        <div className="left">
                            <img
                                src={
                                    imagePreview
                                        ? imagePreview
                                        : "/assets/person/no-image.png"
                                }
                                alt=""
                                className="image"
                            />
                            <div className="formInput input-image">
                                <input
                                    id="img"
                                    name="photo"
                                    type="file"
                                    className="form-control file"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="formInput">
                                <label>Họ tên:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    name="fullName"
                                    value={newTeacher.fullName}
                                    onChange={handleTeacherInputChange}
                                    onFocus={() => handleInputFocus("fullName")}
                                />
                                {errors.fullName && (
                                    <div className="error">{errors.fullName}</div>
                                )}
                            </div>

                            <div className="formInput radio">
                                <label>Giới tính:</label>
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value={true}
                                    name="gender"
                                    checked={newTeacher.gender === true}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nam
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    checked={newTeacher.gender === false}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nữ
                            </div>

                            <div className="formInput">
                                <label>Ngày sinh:</label>
                                <input
                                    type="date"
                                    value={newTeacher.birthDay}
                                    name="birthDay"
                                    onChange={handleTeacherInputChange}
                                />
                            </div>

                            <div className="btn-action">
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                                <Link to="/teachers">
                                    <button className="back">Trở về</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;
