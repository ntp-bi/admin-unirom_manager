import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/room/both",
});

export async function addRoom(
    img,
    nameRoom,
    area,
    countOfSeat,
    description,
    status,
    typeId,
    typeName
) {
    try {
        const response = await api.post("/rooms", {
            img,
            nameRoom,
            area,
            countOfSeat,
            description,
            status,
            typeId,
            typeName,
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
        const result = await api.get("/getallroom", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data.data;
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
export async function updateRoom(
    roomId,
    img,
    nameRoom,
    area,
    countOfSeat,
    description,
    typeId,
    typeName
) {
    const response = await api.put(
        `/rooms/${roomId}`,
        img,
        nameRoom,
        area,
        countOfSeat,
        description,
        typeId,
        typeName
    );
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

export async function searchRoom(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
