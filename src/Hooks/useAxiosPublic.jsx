import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://todo-app-server-rosy.vercel.app",
});

// 'http://localhost:2100'

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;