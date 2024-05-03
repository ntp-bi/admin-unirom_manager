import axios from "axios";

export const api = axios.create({
    baseURL: "https://66332f56f7d50bbd9b4872b3.mockapi.io",
});



// This function gets all room types from the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetch room types");
    }
}
