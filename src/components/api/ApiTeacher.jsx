import axios from "axios";

export const api = axios.create({
    baseURL: "https://663520f39bb0df2359a3e3f0.mockapi.io",
});

export async function addTeacher(fullName, birthday, img, gentle, email) {
    try {
        const response = await api.post("/teachers", {
            fullName,
            birthday,
            img,
            gentle,
            email
        });
        return response.data;
    } catch (error) {
        console.error("Error adding teacher:", error);
        throw new Error("Có lỗi xảy ra khi thêmthêm giáo viên mới!");
    }
}

// This function gets all Teachers from the database
export async function getAllTeachers() {
    try {
        const result = await api.get("/teachers");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching teachers");
    }
}

// This function delete a Teacher by the id
export async function deleteTeacher(teacherId) {
    try {
        const result = await api.delete(`/teachers/${teacherId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

// This function update a Teacher by the id
export async function updateTeacher(teacherId, fullName, birthday, img, gentle, email) {
    const response = await api.put(
        `/teachers/${teacherId}`,
        fullName,
        birthday,
        img,
        gentle,
        email
    );
    return response;
}

// This function gets a Teacher by the id
export async function getTeacherById(teacherId) {
    try {
        const result = await api.get(`/teachers/${teacherId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching Teacher ${error.message}`);
    }
}
