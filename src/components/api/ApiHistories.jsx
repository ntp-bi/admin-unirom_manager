import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/admin",
});

export async function getAllHistory() {
    try {
        const result = await api.get("/BookingHistory/Search");
        return result.data.data;
    } catch (error) {
        throw new Error("Error fetching history");
    }
}

export async function deleteHistory(historyId) {
    try {
        const result = await api.delete(`/BookingHistory/Delete/${historyId}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getHistoryById(historyId) {
    try {
        const result = await api.get(`/BookingHistory/Detail/${historyId}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching history ${error.message}`);
    }
}

export async function searchHistories(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data || []; 
    } catch (error) {
        console.error(`Error searching histories: ${error.message}`);
        return []; 
    }
}

export const confirmCompleted = async (listId) => {
    try {
        const response = await api.get(`/BookingHistory/Accept/${listId}`);
        if (response.status === 200 && response.data.data === true) {
            return true; // Xác nhận thành công
        } else {
            return false; // Xác nhận thất bại
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
