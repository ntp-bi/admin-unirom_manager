import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { getTeacherById, updateTeacher } from "../../../api/ApiTeacher";

import moment from "moment";
import { baseIMG } from "../../../api/apiConfig";

const UpdateTeacher = () => {
    const { teacherId } = useParams();

    const [teacher, setTeacher] = useState({
        fullName: "",
        birthDay: "",
        gender: true,
        file: null,
    });

    const [imagePreview, setImagePreview] = useState("");

    const [errors, setErrors] = useState({
        fullName: "",
    });

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const teacherData = await getTeacherById(teacherId);
                // Convert birthDay format from dd/MM/yyyy to yyyy-MM-dd
                teacherData.birthDay = moment(teacherData.birthDay, "YYYY/MM/DD").format(
                    "YYYY-MM-DD"
                );
                setTeacher(teacherData);
                setImagePreview(teacherData.file);
            } catch (error) {
                console.error("Error fetching teacher:", error);
            }
        };

        fetchTeacher();
    }, [teacherId]);

    const handleTeacherInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "gender" ? e.target.value === "true" : value;
        setTeacher({ ...teacher, [name]: newValue });
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
            setTeacher({ ...teacher, file: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!teacher.fullName) {
            newErrors.fullName = "Vui lòng nhập họ tên.";
            hasErrors = true;
        } else {
            newErrors.fullName = "";
        }

        // Check if gender is not selected
        if (teacher.gender === "") {
            newErrors.gender = "Vui lòng chọn giới tính.";
            hasErrors = true;
        } else {
            newErrors.gender = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateTeacher(teacherId, teacher);
            if (response.status === 200 || response.status === 201) {
                toast.success("Cập nhật thông tin giáo viên thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật thông tin giáo viên!");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Có lỗi xảy ra khi kết nối đến máy chủ.");
            }
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
                    <span>Cập nhật thông tin giảng viên</span>
                </div>
                <div className="bottom">
                    <form onSubmit={handleSubmit}>
                        <div className="left">
                            <img
                                src={`${baseIMG}/${teacher.file}`}
                                alt=""
                                className="image"
                            />
                            <div className="formInput input-image">
                                <input
                                    id="img"
                                    name="file"
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
                                    value={teacher.fullName}
                                    onChange={handleTeacherInputChange}
                                    onFocus={() => handleInputFocus("fullName")}
                                />

                                {errors.fullName && (
                                    <div className="error">{errors.fullName}</div>
                                )}
                            </div>

                            <div className="formInput radio">
                                <label>Giới tính:</label>
                                <div className="form-radio">
                                    <input
                                        className="input-radio"
                                        type="radio"
                                        value={true}
                                        name="gender"
                                        checked={teacher.gender === true}
                                        onChange={handleTeacherInputChange}
                                    />{" "}
                                    Nam
                                    <input
                                        className="input-radio"
                                        type="radio"
                                        value={false}
                                        name="gender"
                                        checked={teacher.gender === false}
                                        onChange={handleTeacherInputChange}
                                    />{" "}
                                    Nữ
                                </div>
                            </div>

                            <div className="formInput">
                                <label>Ngày sinh:</label>
                                <input
                                    type="date"
                                    placeholder=""
                                    value={teacher.birthDay}
                                    name="birthDay"
                                    onChange={handleTeacherInputChange}
                                />
                            </div>

                            <div className="btn-action">
                                <button className="btn-add" type="submit">
                                    Cập nhật
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

export default UpdateTeacher;
