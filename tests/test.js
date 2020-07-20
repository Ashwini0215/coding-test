const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { json } = require('body-parser');
const { expect } = chai;

const payload = require('../testdata/payload');
const invalidPayload = require('../testdata/invalidPayload');

const url = '/transformation';

chai.use(chaiHttp);

const referenceData = {
    REF_MSISDN: '0406679321',
    REF_IMSI: '50002312344314',
    REF_SERVPROFID: '2'
}

describe('200 and 400 test cases', () => {
   let responseBody = {};
    it('200 ok', done => {
        chai
            .request(server)
            .post(`/transformation`)
            .send({
                payload,
                referenceData: referenceData
            })
            .end((err, res) => {
                responseBody = JSON.stringify(res.body);
                console.log("Response1",responseBody );
                expect(res.status).to.equal(200);
                done();
            })
    });

    it('400,Invalid input', done => {
        chai
            .request(server)
            .post(`/transformation`)
            .send({
                invalidPayload,
                referenceData: referenceData
            })
            .end((err, res) => {
                responseBody = JSON.stringify(res.body);
                console.log("Response2",responseBody );
                expect(res.status).to.equal(400);
                done();
            })
    });

});
