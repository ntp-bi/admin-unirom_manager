import axios from "axios";

export const api = axios.create({
    baseURL: "https://663520f39bb0df2359a3e3f0.mockapi.io",
});

export async function addAccount(userName, password) {
    try {
        const response = await api.post("/accounts", {
            userName,
            password,      
        });
        return response.data;
    } catch (error) {
        console.error("Error adding account:", error);
        throw new Error("Có lỗi xảy ra khi thêm tài khoản!");
    }
}

export async function getAllAccount() {
    try {
        const result = await api.get("/accounts");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching Account");
    }
}

export async function deleteAccount(accountId) {
    try {
        const result = await api.delete(`/accounts/${accountId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateAccount(accountId, userName, password) {
    try {
        const response = await api.put(`/accounts/${accountId}`, userName, password);
        return response;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getAccountById(accountId) {
    try {
        const result = await api.get(`/accounts/${accountId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching account ${error.message}`);
    }
}
