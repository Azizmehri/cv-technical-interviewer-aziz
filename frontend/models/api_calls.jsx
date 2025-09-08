import api from "./api"

export async function UploadResume(file , userId) {
    const formdata = new FormData();
    formdata.append("file",file);
    formdata.append("userId",userId);
    const res = await api.post("/uploadCv", formdata, {
        headers :{
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data
}