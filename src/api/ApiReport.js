import api from "./apiConfig";

export const fetchReportsByDate = async (day, month, year) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(
            `/admin/history/Statistical?day=${day}&month=${month}&year=${year}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const exportExcelByYear = async (day, month, year) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(
            `/admin/history/StatisticalByYear/excel/all?day=${day}&month=${month}&year=${year}`,
            { responseType: "arraybuffer" },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xuất file Excel:", error);
        throw error;
    }
};
