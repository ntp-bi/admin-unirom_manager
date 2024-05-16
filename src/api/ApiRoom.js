import api from "./apiConfig";

export async function addRoom(
    file,
    roomname,
    area,
    countofseats,
    description,
    status,
    typeid
) {
    try {
        const token = localStorage.getItem("token");

        // Create a FormData object to handle the file upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("roomname", roomname);
        formData.append("area", area);
        formData.append("countofseats", countofseats);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("typeid", typeid);

        const response = await api.post("/room/admin/addnewroom", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding room:", error);
        throw new Error("Có lỗi xảy ra khi thêm phòng mới!");
    }
}

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get("/room/both/getallroom", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// This function delete a room by the id
export async function deleteRoom(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/room/admin/deleteroom/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateRoom(
    id,
    file,
    roomname,
    area,
    countofseats,
    description,
    status,
    typeid
) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        if (file) {
            formData.append("file", file);
        }
        formData.append("roomname", roomname);
        formData.append("area", area);
        formData.append("countofseats", countofseats);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("typeid", typeid);

        const response = await api.put(`/room/admin/editroom/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        console.error("Error updating room:", error);
        throw new Error("Có lỗi xảy ra khi cập nhật phòng!");
    }
}

// This function gets a room by the id
export async function getRoomById(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/room/both/getroom/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

export async function searchRoom(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
