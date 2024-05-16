import api from "./apiConfig";

export async function addTeacher(fullName, birthDay, photo, gender) {
    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("birthDay", birthDay);
        formData.append("photo", photo);
        formData.append("gender", gender);

        const response = await api.post("/users/add", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding teacher:", error);
        throw new Error("Có lỗi xảy ra khi thêm giáo viên mới!");
    }
}

// This function gets all Teachers from the database
export async function getAllTeachers() {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get("/users/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching teachers");
    }
}

// This function delete a Teacher by the id
export async function deleteTeacher(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/users/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

// This function update a Teacher by the id
export async function updateTeacher(id, teacher) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        if (teacher.file) {
            formData.append("file", teacher.file);
        }
        formData.append("fullName", teacher.fullName);
        formData.append("birthDay", teacher.birthDay);
        formData.append("gender", teacher.gender);

        const response = await api.put(`/users/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error updating teacher:", error);
        throw new Error("Có lỗi xảy ra khi cập nhật giáo viên!");
    }
}

// This function gets a Teacher by the id
export async function getTeacherById(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching Teacher ${error.message}`);
    }
}

export async function searchTeacher(name) {
    try {
        const result = await api.get(`/BookingHistory/Search?key=${name}`);
        return result.data.data;
    } catch (error) {
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
