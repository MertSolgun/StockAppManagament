import useAxios from "./useAxios";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  logOutSucces,
  loginSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const useAuthCalls = () => {
  const { axiosPublic, axiosWithToken } = useAxios();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const register = async (registerInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", registerInfo);
      toastSuccessNotify("Register successfully");
      dispatch(registerSuccess(data));
    } catch (err) {
      console.log(err);
      toastErrorNotify("Register failed");
    }
  };

  const login = async (loginInfo) => {
    try {
      const { data } = await axiosWithToken.post("/auth/login/", loginInfo);
      toastSuccessNotify("Login successfully");
      dispatch(loginSuccess(data));
      navigate("/stock");
    } catch (err) {
      console.log(err);
      toastErrorNotify("Login failed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken("/auth/logout/");
      dispatch(logOutSucces());
      toastSuccessNotify("Log out successfully");
    } catch (error) {
      toastErrorNotify("Log out failed", error);
    }
  };

  return { register, login, logout };
};

export default useAuthCalls;

// mertSlgn2@gmail.com

//MertSolgun2@
