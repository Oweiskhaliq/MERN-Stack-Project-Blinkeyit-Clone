import summaryApi from "../common/summaryApi";
import Axios from "./Axios";

const fetchedUserDetails = () => {
  try {
    const response = Axios({
      ...summaryApi.userDetails,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchedUserDetails;
