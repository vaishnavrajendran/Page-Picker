import createAxiosInstance from "@/axios";

const jsonInstance = createAxiosInstance("application/json");
const formDataInstance = createAxiosInstance("multipart/form-data");

export const loadUser = async (user) => {
  try {
    const { data } = await jsonInstance.post("/user/getUser", user);
    return data;
  } catch (error) {
    console.error("[Error loading user]:", error);
  }
};

export const getUserDocs = async (userId) => {
  try {
    const { data } = await jsonInstance.get("/user/user-docs", {
      params: {
        userId,
      },
    });
    return data;
  } catch (error) {
    console.error("[Error fetching user documents]");
  }
};

export const uploadFile = async (userId, formData) => {
  try {
    const { data } = await formDataInstance.post(
      "/user/file-upload",
      formData,
      {
        params: {
          userId,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("[Error occured while uploading file]:", error);
  }
};
