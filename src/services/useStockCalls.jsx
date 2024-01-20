import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  getProPurSucces,
  getStocksSuccess,
} from "../features/stockSlice";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosPublic, axiosWithToken } = useAxios();

  const getStocks = async (url) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithToken(`/${url}/`);
      const apiData = data.data;
      dispatch(getStocksSuccess({ url, apiData })); //*important*/
      toastSuccessNotify(`${url} fetched successfully`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} data could not be fetched`);
      console.log(error);
    }
  };

  const postStock = async (url, postData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, postData);
      getStocks(url);
      toastSuccessNotify(`${url} added`);
    } catch (error) {
      dispatch(fetchFail(`${url} failed`));
    }
  };

  const deleteStock = async (url, id) => {
    try {
      await axiosWithToken.delete(`/${url}/${id}`);
      getStocks(url);
      toastSuccessNotify(`${url} deleted successfully`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} deleted failed`);
    }
  };

  const putStocks = async (url, editInfo) => {
    try {
      await axiosWithToken.put(`/${url}/${editInfo._id}/`, editInfo);
      getStocks(url);
      toastSuccessNotify(`${url} Edit successfully`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} Edit Failed`);
    }
  };

  const getProPur = async () => {
    dispatch(fetchStart());
    try {
      const [products, purchases, brands, firms] = await Promise.all([
        axiosWithToken("/products/"),
        axiosWithToken("/purchases/"),
        axiosWithToken("/brands/"),
        axiosWithToken("/firms/"),
      ]);
      dispatch(
        getProPurSucces([
          products?.data?.data,
          purchases?.data?.data,
          brands?.data?.data,
          firms?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { getStocks, postStock, deleteStock, putStocks, getProPur };
};

export default useStockCalls;
