import Axios from "axios";
import config from "~/config";

const http = Axios.create({
    baseURL: config.api,
    timeout: 8000,
    validateStatus: function (status) {
        return status >= 200;
    }
});

function LogicError (message, code, data) {
    this.message = message;
    this.code = code;
    this.data = data;
    this.name = "LogicError";
}

LogicError.prototype = new Error();
LogicError.prototype.constructor = LogicError;

http.interceptors.request.use((data, headers) => {
    return data;
});

http.interceptors.response.use(response => {
//    console.log(response.data)
    if(response && response.data){
    	const data = response.data.resData;
    	var resCode = response.data.resCode;
    // switch (resCode != '01') {
    //     case true:
    //         return data.data;
    //     default:
    //         throw new LogicError(data.msg);
    // }
    	if(resCode != '01'){
       	    return '[]';
    	}

        return data;
    } else {
        return '[]';
    }
}, err => {
    throw new LogicError("网络请求错误:");
});

export default http;
