import React, { useContext, useRef, useState, useEffect } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Switch from "@mui/material/Switch";
import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div className="navbar">
            <div className="navbarContainer">
                <div className="items">
                    {/* <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                        <span>Tiếng việt</span>
                    </div> */}
                    <div className="item">
                        <Switch
                            style={{ color: "#210876" }}
                            className="icon"
                            onClick={() => dispatch({ type: "TOGGLE" })}
                        />
                    </div>
                    {/* <div className="item">
                        <NotificationsActiveOutlinedIcon className="icon" />
                        <div className="counter">3</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">5</div>
                    </div> */}

                    <div className="item account-item">
                        <button className="btn-avatar">
                            {active ? !active : active}
                            <img
                                src="/assets/person/DefaultProfile.jpg"
                                alt=""
                                className="profileImg"
                                onClick={handleClick}
                            />
                        </button>
                        {active && (
                            <ul className="sub-item">
                                <Link to={"/login"} style={{ textDecoration: "none" }}>
                                    <li>Đăng nhập</li>
                                </Link>
                                <li>Thông tin tài khoản</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
