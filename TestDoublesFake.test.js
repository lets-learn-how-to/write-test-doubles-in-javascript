const Location = require('./Location');

class HttpClientFake {
    constructor() {
        this.data = [{
            "title": "London",
            "location_type": "City",
            "woeid": 44418,
            "latt_long": "51.506321,-0.12714"
        }];
    }
    async get(url) {
        return { data: {...this.data} };
    }
    async put(url, params) {
        this.data[0] = {...params};
        return await this.get(url);
    }
}

it('Doesn\'t have a database, but looks like it does (Fake)', async () => {
    const london = new Location(new HttpClientFake());
    london.setLocation('london');
    const locationData = await london.getData();

    expect(locationData).toHaveProperty('woeid');

    await london.updateData({
        ...locationData,
        woeid: 12345
    });

    const updatedLocationData = await london.getData();
    expect(updatedLocationData).toHaveProperty('woeid', 12345);
});
