import axios from "axios";

export const api = axios.create({
    baseURL: "https://66359f0e415f4e1a5e24f92a.mockapi.io",
});

export async function getAllHistory() {
    try {
        const result = await api.get("/histories");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching history");
    }
}

export async function deleteHistory(historyId) {
    try {
        const result = await api.delete(`/histories/${historyId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getHistoryById(historyId) {
    try {
        const result = await api.get(`/histories/${historyId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching history ${error.message}`);
    }
}

export async function updateHistoryStatus(historyId, newStatus) {
    try {
        const result = await api.put(`/histories/${historyId}`, { status: newStatus });
        return result.data;
    } catch (error) {
        throw new Error(`Error updating history status: ${error.message}`);
    }
}