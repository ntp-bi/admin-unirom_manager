import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/room/admin",
});

export async function getAllHistory() {
    try {
        const result = await api.get("BookingHistory/Search");
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

export async function completeHistory(historyId) {
    try {
        const result = await api.put(`/histories/${historyId}`, { endTime: new Date() });
        return result.data;
    } catch (error) {
        throw new Error(`Error completing history: ${error.message}`);
    }
}

// export async function updateHistoryStatus(historyId, newStatus) {
//     try {
//         const result = await api.put(`/histories/${historyId}`, { status: newStatus });
//         return result.data;
//     } catch (error) {
//         throw new Error(`Error updating history status: ${error.message}`);
//     }
// }
