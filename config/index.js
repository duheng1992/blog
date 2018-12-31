const config = {
    development: {
        api: "http://127.0.0.1:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    },
    production: {
    	api: "http://127.0.0.1:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    }
};
module.exports = config[process.env.NODE_ENV];
 