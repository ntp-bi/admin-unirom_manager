import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/detail/both",
});

export const getAllList = async () => {
    try {
        const result = await api.get("/getdetailnonaccept");
        return result.data.data;
    } catch (error) {
        throw new Error("Error fetching Account");
    }
};

export const deleteList = async (listId) => {
    try {
        const response = await api.delete(`/lists/${listId}`);
        return response.data.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const confirmReservation = async (listId) => {
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

export const rejectReservation = async (listId) => {
    try {
        const response = await api.post(`/BookingHistory/Reject/${listId}`);
        if (response.status === 200 && response.data.data === true) {
            return true; // Từ chối thành công
        } else {
            return false; // Từ chối thất bại
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export async function searchList(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}