import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/room/admin/",
});

export const fetchReportsByDate = async (day, month, year) => {
    try {
        const response = await api.get(
            `Statistical?day=${day}&month=${month}&year=${year}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const exportExcelByYear = async (day, month, year) => {
    try {
        const response = await api.get(
            `StatisticalByYear/excel/all?day=${day}&month=${month}&year=${year}`,
            { responseType: "arraybuffer" }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xuất file Excel:", error);
        throw error;
    }
};
