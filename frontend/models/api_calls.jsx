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
};

export async function LoginUser(email, password) {
  const res = await api.post("/login", {
    email,
    password,
  });
  return res.data;
}

export async function SignUpUser(email, password) {
  try {
    const res = await api.post("/signup", { email, password }); 
    return res.data; 
  } catch (error) {
    console.error("SignUp error:", error);
    return { error: error.response?.data?.error || "Server error" };
  }
}
