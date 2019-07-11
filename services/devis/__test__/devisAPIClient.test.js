"use strict";

jest.mock('axios');
const axios = require('axios');
var fs = require('fs');

var DevisAPIClient = require('../devisAPIClient');
const config = require('../config');
var devisAPIClient = new DevisAPIClient(config.devis.apiKey, config.devis.api, config.devis.baseUrl);
var LotDevis = require('../model/lotDevis');


var devisRespMock;


beforeAll (async () => {
  let devisMock = await fs.readFileSync('services/devis/__mocks__/devisJsonMock.json');
  devisRespMock = JSON.parse(devisMock);
});


describe("TravauxLib Devis API Client", ()=> {

  it("fetches devis from travauxLib" , async () => {

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({data:devisRespMock})
    );


    const devisResponse = await devisAPIClient.getDevisList();

    expect(devisRespMock).toEqual(devisResponse);
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("calls etherscan with correct parameters", async () =>{

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({data:devisRespMock})
    );

    const devisResp = await devisAPIClient.getDevisList();

    expect(axios.create).toHaveBeenCalledWith({"baseURL": config.devis.baseUrl, "timeout": 10000});
    expect(axios.get).toHaveBeenCalledWith( "/api/devis-pro/" + config.devis.apiKey );
  });
});
