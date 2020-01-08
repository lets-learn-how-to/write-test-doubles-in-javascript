const Location = require('./Location');

class Mock {
    constructor(methods) {
        this.methods = methods;
        this.expectations = {};
        this.counters = {};
        let self = this;

        this.methods.forEach(method => {
            const callback = this[method];
            this[method] = function () {
                if (!!self.counters[method]) {
                    self.counters[method] += 1;
                } else {
                    self.counters[method] = 1;
                }
                return callback.call(self, arguments);
            };
        });
    }
    setExpectation(method, called) {
        this.expectations[method] = called;

        return this;
    }
    verify() {
        let pass = true;

        for (let key in this.expectations) {
            expect(this.counters[key]).toBe(this.expectations[key]);
        }

        return pass;
    }
}

class HttpClientMock extends Mock {
    constructor() {
        super(['get', 'put']);
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
        return true;
    }
}

it('The client library verifies that it did some things (Mock)', async () => {
    const http_client = new HttpClientMock();
    http_client.setExpectation('get', 2)
        .setExpectation('put', 1);

    const london = new Location(http_client);
    london.setLocation('london');
    const locationData = await london.getData();

    await london.updateData({
        ...locationData,
        woeid: 12345
    });

    await london.getData();

    http_client.verify();
});
