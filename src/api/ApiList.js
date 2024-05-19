import api from "./apiConfig";

export const getAllList = async () => {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get("/detail/both/getdetailnonaccept", {
            headers: {
                Authorization: `Bearer ${token}`,                
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching Account");
    }
};

export const confirmReservation = async (detailId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(`/detail/admin/acceptbookingroom/${detailId}`, null, {
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

export const rejectReservation = async (detailId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(`detail/admin/refusebookingroom/${detailId}`, null, {
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

export async function searchList(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
