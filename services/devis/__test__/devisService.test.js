"use strict";

const assert = require('assert');
var sinon = require('sinon');
var fs = require('fs');

var DevisAPIClient = require('../devisAPIClient');
var DevisService = require('../devisService');
var LotDevis = require('../model/lotDevis');


let sandbox;
var devisRespMock;


beforeAll (async () => {
  let devisMock = await fs.readFileSync('services/devis/__mocks__/devisJsonMock.json');
  devisRespMock = JSON.parse(devisMock);
});

describe('DevisService', function(){

  beforeEach(async () =>{
    sandbox = sinon.createSandbox();

    this.getDevisListStub = sandbox.stub(DevisAPIClient.prototype, "getDevisList");

    this.getDevisListStub.onCall(0).returns( devisRespMock );
    this.getDevisListStub.onCall(1).returns( devisRespMock );
    this.getDevisListStub.returns( devisRespMock );

  });

  afterEach(function() {;
    sandbox.restore();
  });

  it('calls travauxLib Devis-PRO API to fetch all devis info', async () => {
    await DevisService.getDevisList();
    assert.ok(this.getDevisListStub.called);
    assert.equal(this.getDevisListStub.callCount, 1);
  });

});
