const errorFunction = (errorBit:any, msg:any, data:any) => {
    if (errorBit) return { is_error: errorBit, message: msg };
    else return { is_error: errorBit, message: msg, data };
};
export default errorFunction;