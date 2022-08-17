import TextResponse from "../constants/TextResponse";
const errorFunction = () => {
     return { is_error: true, message: TextResponse.SOMETHING_WENT_WRONG };
};
export default errorFunction;