"use strict";


/**
 * Super class for all implementation classes of different cryptocurrencies to be used by application
 * Programatical implementation of ES6 style Abstract classes:
 * Cannot be instanciated alone, and enforce interface method implementations
 */
class LotDevisAbs{

  constructor(lotDevisJson){
    this._lotDevisJson = lotDevisJson;

    if (new.target === Transaction) {
      throw new TypeError("Cannot construct Transaction instances directly");
    }

    if (this.getValueMovementforAddress === undefined && typeof this.getValueMovementforAddress !== "function") {
      throw new TypeError("Must override method ()");
    }
  }

  get lotDevisJson(){
    return this._lotDevisJson;
  }
}

module.exports = LotDevisAbs;
