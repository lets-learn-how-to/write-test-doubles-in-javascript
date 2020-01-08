const axios = require('axios');

module.exports = class Location {
    constructor(http_client = axios) {
        this.service = 'http://metaweather.com/api/location/search/?query=';
        this.http_client = http_client;
    }
    setLocation(location) {
        this.location = location;
    }
    async getData() {
        const response =
            await this.http_client
                .get(this.service + this.location);

        return response.data[0];
    }
    async updateData(newData) {
        const response =
            await this.http_client
                .put(this.service + this.location, newData);

        return response.status;
    }
};
