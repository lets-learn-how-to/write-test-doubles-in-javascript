const Location = require('./Location');

class HttpClientStub {
    async get(url) {
        return {
            data: [{
                "title": "London",
                "location_type": "City",
                "woeid": 44418,
                "latt_long": "51.506321,-0.12714"
            }],
        };
    }
}

it('Always returns the same thing (Stub)', async () => {
    const london = new Location(new HttpClientStub());
    london.setLocation('london');
    const locationData = await london.getData();

    expect(locationData).toHaveProperty('latt_long');
});
