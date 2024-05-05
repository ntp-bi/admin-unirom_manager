import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { addTeacher } from "../../../components/api/ApiTeacher";
import "./add-teacher.scss";

const AddTeacher = () => {
    const [newTeacher, setNewTeacher] = useState({
        fullName: "",
        birthday: "",
        img: null,
        gentle: "",
        email: "",
    });
    const [imagePreview, setImagePreview] = useState("");

    const handleTeacherInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher({ ...newTeacher, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        // Kiểm tra xem selectedImage có tồn tại không và có phải là đối tượng File không
        if (selectedImage instanceof File) {
            // Tạo một đối tượng FileReader để đọc dữ liệu của tệp hình ảnh
            const reader = new FileReader();
            reader.onload = () => {
                // Khi FileReader đọc xong, gán dữ liệu hình ảnh vào thuộc tính img của newRoom
                setNewTeacher((prevTeacher) => ({ ...prevTeacher, img: reader.result }));
                // Hiển thị xem trước hình ảnh
                setImagePreview(reader.result);
            };
            // Bắt đầu đọc dữ liệu của tệp hình ảnh
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTeacher(
                newTeacher.fullName,
                newTeacher.birthday,
                newTeacher.img,
                newTeacher.gentle,
                newTeacher.email
            );
            toast.success("Phòng đã được thêm vào cơ sở dữ liệu");
            setNewTeacher({
                fullName: "",
                birthday: "",
                img: null,
                gentle: "",
                email: "",
            });
            setImagePreview("");
        } catch (error) {
            toast.error(error.message);
        }
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
                                    required
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
                                    required
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    name="fullName"
                                    value={newTeacher.fullName}
                                    onChange={handleTeacherInputChange}
                                />
                            </div>

                            <div className="formInput radio">
                                <label>Giới tính:</label>
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value="Nam"
                                    name="gentle"
                                    checked={newTeacher.gentle === "Nam"}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nam
                                <input
                                    className="input-radio"
                                    type="radio"
                                    value="Nữ"
                                    name="gentle"
                                    checked={newTeacher.gentle === "Nữ"}
                                    onChange={handleTeacherInputChange}
                                />{" "}
                                Nữ
                            </div>

                            <div className="formInput">
                                <label>Ngày sinh:</label>
                                <input
                                    required
                                    type="date"
                                    placeholder=""
                                    value={newTeacher.birthday}
                                    name="birthday"
                                    onChange={handleTeacherInputChange}
                                />
                            </div>
                            <div className="formInput email">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập email"
                                    value={newTeacher.email}
                                    name="email"
                                    onChange={handleTeacherInputChange}
                                />
                            </div>

                            <div className="btn-action">
                                <Link to="/teachers">
                                    <button className="back">Trở về</button>
                                </Link>
                                <button className="btn-add" type="submit">
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;
