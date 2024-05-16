import api from "./apiConfig";

export async function getAllHistory() {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get("/admin/BookingHistory/Search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error("Error fetching history");
    }
}

export async function deleteHistory(historyId) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/admin/BookingHistory/Delete/${historyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getHistoryById(historyId) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/admin/BookingHistory/Detail/${historyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching history ${error.message}`);
    }
}

export async function searchHistories(name) {
    try {
        const result = await api.get(`/admin/BookingHistory/Search?key=${name}`);
        return result.data.data || [];
    } catch (error) {
        console.error(`Error searching histories: ${error.message}`);
        return [];
    }
}

export const confirmCompleted = async (listId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(`/admin/BookingHistory/Accept/${listId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200 && response.data.data === true) {
            return true; // Xác nhận thành công
        } else {
            return false; // Xác nhận thất bại
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
