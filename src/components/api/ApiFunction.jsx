import axios from "axios";

export const api = axios.create({
    baseURL: "https://66332f56f7d50bbd9b4872b3.mockapi.io",
});

export async function addRoom(img, nameRoom, roomType, area, countOfSeat, description) {
    try {
        const formData = new FormData();
        formData.append("img", img);
        formData.append("nameRoom", nameRoom);
        formData.append("roomType", roomType);
        formData.append("area", area);
        formData.append("countOfSeat", countOfSeat);
        formData.append("description", description);

        const response = await api.post("/rooms", formData);
        if (response.status === 201) {
            // Thêm phòng mới thành công, cập nhật lại danh sách phòng
            const updatedRooms = await getAllRooms();
            // Trả về danh sách phòng mới sau khi đã cập nhật
            return updatedRooms;
        } else {
            throw new Error(
                "Failed to add room. Server responded with status: " + response.status
            );
        }
    } catch (error) {
        console.error("Error adding room:", error);
        throw new Error("Có lỗi xảy ra khi thêm phòng mới!");
    }
}

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// This function delete a room by the id
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

// This function update a room by the id
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("img", roomData.img);
    formData.append("nameRoom", roomData.nameRoom);
    formData.append("roomType", roomData.roomType);
    formData.append("area", roomData.area);
    formData.append("countOfSeat", roomData.countOfSeat);
    formData.append("description", roomData.description);

    const response = await api.put(`/rooms/${roomId}`, formData);
    return response;
}

// This function gets a room by the id
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}
