const config = {
    development: {
        api: "http://122.112.216.70:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    },
    production: {
    	api: "http://122.112.216.70:8888"
        //api: "https://blog-api.lee-cloud.xyz"
    }
};
module.exports = config[process.env.NODE_ENV];
 
