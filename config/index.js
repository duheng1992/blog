const config = {
    development: {
        api: "http://192.168.1.88:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    },
    production: {
    	api: "http://192.168.1.88:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    }
};
module.exports = config[process.env.NODE_ENV];
 
