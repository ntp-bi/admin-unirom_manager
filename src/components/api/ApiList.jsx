import axios from "axios";

export const api = axios.create({
    baseURL: "https://663907424253a866a2500d04.mockapi.io",
});

export const getAllList = async () => {
    try {
        const result = await api.get("/lists");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching Account");
    }
};

export const updateListStatus = async (listId, status) => {
    try {
        const response = await api.put(`/lists/${listId}`, { status });
        if (response.status !== 200) {
            throw new Error("Cập nhật trạng thái không thành công.");
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteList = async (listId) => {
    try {
        const response = await api.delete(`/lists/${listId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};