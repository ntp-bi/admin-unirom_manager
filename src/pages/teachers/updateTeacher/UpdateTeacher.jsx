import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { getTeacherById, updateTeacher } from "../../../components/api/ApiTeacher";

const UpdateTeacher = () => {
    const { teacherId } = useParams();

    const [teacher, setTeacher] = useState({
        fullName: "",
        birthday: "",
        img: null,
        gentle: "",
        email: "",
    });

    const [imagePreview, setImagePreview] = useState("");

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
    });

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const teacherData = await getTeacherById(teacherId);
                setTeacher(teacherData);
                setImagePreview(teacherData.img);
            } catch (error) {
                console.error("Error fetching teacher:", error);
            }
        };

        fetchTeacher();
    }, [teacherId]);

    const handleTeacherInputChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
        }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        // Kiểm tra xem selectedImage có tồn tại không và có phải là đối tượng File không
        if (selectedImage instanceof File) {
            // Tạo một đối tượng FileReader để đọc dữ liệu của tệp hình ảnh
            const reader = new FileReader();
            reader.onload = () => {
                // Khi FileReader đọc xong, gán dữ liệu hình ảnh vào thuộc tính img của newRoom
                setTeacher((prevTeacher) => ({ ...prevTeacher, img: reader.result }));
                // Hiển thị xem trước hình ảnh
                setImagePreview(reader.result);
            };
            // Bắt đầu đọc dữ liệu của tệp hình ảnh
            reader.readAsDataURL(selectedImage);
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

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!teacher.email) {
            newErrors.email = "Vui lòng nhập email.";
            hasErrors = true;
        } else if (!emailRegex.test(teacher.email)) {
            newErrors.email = "Email không hợp lệ.";
            hasErrors = true;
        } else {
            newErrors.email = "";
        }

        // Set error state và ngừng submit nếu có lỗi
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateTeacher(teacherId, teacher);
            if (response.status === 200) {
                toast.success("Cập nhật thông tin giáo viên thành công!");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật thông tin giáo viên!");
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
                                    name="img"
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
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value="Nam"
                                    name="gentle"
                                    checked={teacher.gentle === "Nam"}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nam
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value="Nữ"
                                    name="gentle"
                                    checked={teacher.gentle === "Nữ"}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nữ
                            </div>

                            <div className="formInput">
                                <label>Ngày sinh:</label>
                                <input
                                    type="date"
                                    placeholder=""
                                    value={teacher.birthday}
                                    name="birthday"
                                    onChange={handleTeacherInputChange}
                                />
                            </div>
                            <div className="formInput email">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập email"
                                    value={teacher.email}
                                    name="email"
                                    onChange={handleTeacherInputChange}
                                    onFocus={() => handleInputFocus("email")}
                                />
                                {errors.email && (
                                    <div className="error">{errors.email}</div>
                                )}
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
