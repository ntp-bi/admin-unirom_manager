import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Thay thế bằng endpoint API thực tế của bạn
            const response = await axios.post(
                "http://localhost:8080/account/login",
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            if (response.status === 200) {
                // Giả sử API trả về một token và thông tin vai trò của người dùng
                localStorage.setItem("token", data.data);
                console.log(data);
                // const decoded = jwtDecode(data.data);

                // console.log(decoded);
                // Chuyển hướng dựa trên vai trò người dùng
                if (data.role === "teacher") {
                    navigate("/abc");
                
                } else {
                    navigate("/admin");
                }
            } else {
                // Xử lý lỗi trả về từ API
                setError(data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error) {
            // Xử lý lỗi mạng hoặc các lỗi không mong muốn khác
            setError(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <>
            <h2>Đăng nhập</h2>         
            <form onSubmit={handleClick}>
              
                    <input
                        type="email"
                        placeholder="Email"
                        id="username"
                        required
                        onChange={handleChange}
                        value={credentials.username}
                    />
               
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        id="password"
                        required
                        onChange={handleChange}
                        value={credentials.password}
                    />
              
              <button type="submit">Dang nhap</button>
            </form>
        </>
    );
};

export default Login;
