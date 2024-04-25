import React from "react";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import AccountTable from "../../../components/accounttable/Accounttable"

import "./main-account.scss";

const Account = () => {
    return (
        <div className="account">
            <Sidebar />
            <div className="accountContainer">
                <Navbar />
                <div className="accountList">
                    <div className="datatableTitle">
                        <span>Quản lý tài khoản</span>
                    </div>
                    <div className="accountSearch">    
                        <h4>Tìm kiếm: </h4>                    
                        <div className="search">                            
                            <input type="text" placeholder="Nhập tên tài khoản muốn tìm." />
                            <SearchOutlinedIcon />
                        </div>
                        <Link
                            to="/accounts/add-account"
                            style={{ textDecoration: "none" }}
                        >
                            <span className="link">Thêm mới </span>
                        </Link>
                    </div>
                    <AccountTable />
                </div>
            </div>
        </div>
    );
};

export default Account;
