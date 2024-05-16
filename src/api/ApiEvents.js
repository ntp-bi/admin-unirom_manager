import api from "./apiConfig";

export async function addEvent(eventName) {
    try {
        const token = localStorage.getItem("token");
        const response = await api.post(
            "/events/add",
            { eventName },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw new Error("Có lỗi xảy ra khi thêm sự kiện!");
    }
}

export async function getAllEvent() {
    try {
        const token = localStorage.getItem("token");
        const result = await api.get("/events/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching Event");
    }
}

export async function deleteEvent(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/events/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateEvent(id, eventName) {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(`/events/update/${id}`, eventName, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getEventById(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching event ${error.message}`);
    }
}

export async function searchEvent(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
