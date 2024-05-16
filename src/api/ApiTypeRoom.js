import api from "./apiConfig";

export async function addType(typeName) {
    try {
        const token = localStorage.getItem("token");
        const response = await api.post(
            "/roomtypes/add",
            { typeName },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding type:", error);
        throw new Error("Có lỗi xảy ra khi thêm sự kiện!");
    }
}

export async function getAllType() {
    try {
        const token = localStorage.getItem("token");
        const result = await api.get("/roomtypes/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching type");
    }
}

export async function deleteType(id) {
    try {
        const token = localStorage.getItem("token");
        const result = await api.delete(`/roomtypes/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateType(id, typeName) {
    try {
        const token = localStorage.getItem("token");
        const response = await api.put(`/roomtypes/update/${id}`, typeName, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getTypeById(id) {
    try {
        const token = localStorage.getItem("token");
        const result = await api.get(`/roomtypes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching type ${error.message}`);
    }
}

export async function searchTypeRoom(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
