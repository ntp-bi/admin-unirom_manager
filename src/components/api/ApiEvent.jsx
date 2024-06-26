import axios from "axios";

export const api = axios.create({
    baseURL: "https://66332f56f7d50bbd9b4872b3.mockapi.io",
});

export async function addEvent(eventName) {
    try {
        const response = await api.post("/events", { eventName });
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw new Error("Có lỗi xảy ra khi thêm sự kiện!");
    }
}

export async function getAllEvent() {
    try {
        const result = await api.get("/events");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching Event");
    }
}

export async function deleteEvent(eventId) {
    try {
        const result = await api.delete(`/events/${eventId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateEvent(eventId, eventName) {
    try {
        const response = await api.put(`/events/${eventId}`, eventName);
        return response;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getEventById(eventId) {
    try {
        const result = await api.get(`/events/${eventId}`);
        return result.data;
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