import summaryApi from "../common/summaryApi";
import Axios from "./Axios";

const fetchedUserDetails = async () => {
  try {
    const response = await Axios({
      ...summaryApi.userDetails,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchedUserDetails;
