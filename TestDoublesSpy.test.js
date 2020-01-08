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

class HttpClientSpy extends HttpClientStub {
    constructor() {
        super();
        this.get = jest.fn(this.get);
    }
}

it('tells us if get was called (Spy)', async () => {
    const client = new HttpClientSpy();
    const london = new Location(client);
    london.setLocation('london');
    const locationData = await london.getData();

    expect(client.get).toHaveBeenCalled();
    expect(client.get).toHaveBeenCalledWith('http://metaweather.com/api/location/search/?query=london');
    expect(client.get).toHaveBeenCalledTimes(1);
});
