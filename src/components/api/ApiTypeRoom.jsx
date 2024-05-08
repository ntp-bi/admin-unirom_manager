import axios from "axios";

export const api = axios.create({
    baseURL: "https://66332f56f7d50bbd9b4872b3.mockapi.io",
});

export async function addType(typeName) {
    try {
        const response = await api.post("/types", { typeName });
        return response.data;
    } catch (error) {
        console.error("Error adding type:", error);
        throw new Error("Có lỗi xảy ra khi thêm sự kiện!");
    }
}

export async function getAllType() {
    try {
        const result = await api.get("/types");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching type");
    }
}

export async function deleteType(typeId) {
    try {
        const result = await api.delete(`/types/${typeId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateType(typeId, typeName) {
    try {
        const response = await api.put(`/types/${typeId}`, typeName);
        return response;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getTypeById(typeId) {
    try {
        const result = await api.get(`/types/${typeId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching type ${error.message}`);
    }
}
