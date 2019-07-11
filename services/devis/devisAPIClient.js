"use strict";

const axios = require('axios');


class DevisAPIClient{

  /**
   * @param {string} apiKey - (optional) Your APIkey
   * @param {string} api - (optional) Your API to request
   * @param {string} baseUrl - base url for travauxlib services.
   * @param {number} timeout - (optional) Timeout in milliseconds for requests, default 10000
   */
  constructor(apiKey = 'YourApiKeyToken', api, baseUrl, timeout = 10000) {
    this.apiKey = apiKey;
    this.api = api;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: timeout
    });
  }


  /**
   * Get a list of devis
   * @returns {Promise.<object>}
   */
  async getDevisList() {
    var devisQuery = this.api + '/' + this.apiKey;
    return await this.requestApi(devisQuery);
  }

  /**
   * request travauxlib api for getting list of devis
   * @param query
   * @example
   * var devislist = await client.requestApi('/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX');
   * @returns {Promise<any>}
   */
  async requestApi(query) {
    try{
      var response = await this.client.get('/api/' + query);
      return response.data;

    }catch(error){
      console.log(error);
      throw new Error(error);
    }
  }

}

module.exports = DevisAPIClient;
