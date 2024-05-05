import axios from "axios";

export const api = axios.create({
    baseURL: "https://66359f0e415f4e1a5e24f92a.mockapi.io/reports",
});

export const fetchReportsByDate = async (day, month, year) => {
    try {
        const response = await api.get(`?day=${day}&month=${month}&year=${year}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
