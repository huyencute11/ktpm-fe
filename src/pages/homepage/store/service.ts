import axios from "axios";
import axiosInstance from "../../../services/axios";

export const getListSubjectData = async (data: object) => {
  try {
    // const res = await axiosInstance.get(
    //     `https://fakestoreapi.com/products`
    // );
    const response = await axiosInstance.get(
      `/credit-class?subjectId=1&semesterId=1`
    );
    console.log(response);
    debugger;
    return response;
  } catch (error) {
    console.log(error);
  }
};
