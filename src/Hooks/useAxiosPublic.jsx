import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:2100",
});

// https://todo-app-server-rosy.vercel.app
// 'http://localhost:2100'

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;