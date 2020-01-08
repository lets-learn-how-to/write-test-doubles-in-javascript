const Location = require('./Location');

class HttpClientDummy {
    async get(url) {
        throw new Error('It wasn\'t me');
    }
}

it('Doesn\' get any info (Dummy)', async () => {
    const london = new Location(new HttpClientDummy());
    london.setLocation('london');

    expect(london).toHaveProperty('location', 'london');
});
