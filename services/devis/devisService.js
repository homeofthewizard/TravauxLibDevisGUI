"use strict";

var DevisAPIClient = require('./devisAPIClient');
const config = require('./config');
var devisAPIClient = new DevisAPIClient(config.devis.apiKey, config.devis.api, config.devis.baseUrl);
var LotDevis = require('./model/lotDevis');


class DevisService{

  constructor() {
    if(! DevisService.instance){
      DevisService.instance = this;
    }
    return DevisService.instance;
  }


  async getDevisList(){
      var devis = {};
      devis.parMetier = [];
      devis.parLocations = [];

      var res = await this.requesDevis();
      devis.parMetier.push(...res.sections[0].lots.map(a => new LotDevis(a.label, false, a.prixTotalHT, a.prixTotalTTC, a.lignes)));
      devis.parLocation = this.buildLotDevisParLocationsFromMetier(devis.parMetier, res.locations);
      devis.locations = res.locations;
      devis.prixTotalHT = res.prixTotalHT;
      devis.prixTotalTTC = res.prixTotalTTC;
      return devis;
  }


  async requesDevis(){
    let res;
    res = await devisAPIClient.getDevisList();
    return res;
  };


  buildLotDevisParLocationsFromMetier(listLotParMetier, locations){
    var mapLotParLocation = {};

    listLotParMetier.forEach( lotMetier => {
      lotMetier.lignes.forEach( devis => {
        devis.metier = lotMetier.label;

        //there isn't any location info for this devis
        if(devis.locationsDetails.locations.length == 0) {
          this.updateMapLotDevis("Autres prestations", mapLotParLocation, devis);

        //there are some location info for this devis
        }else{
          devis.locationsDetails.locations.forEach( location => {
            this.updateMapLotDevis(this.mapLocationUUIDtoLabel(locations, location.uuid), mapLotParLocation, devis, location);
          });
        }

      });
    });

    return Object.values(mapLotParLocation);
  }


  updateMapLotDevis(locationName, map, devis, devisLocation){
    if(map[locationName] === undefined){
      map[locationName] = new LotDevis(locationName, true, 0, 0, []);
    }else{
      this.addDevisToLot(map[locationName], devis, locationName, devisLocation);
    }
  }


  addDevisToLot(lotDevis, devis, locationName, devisLocation){
    lotDevis.lignes.push(devis);
    if(locationName !== "Autres prestations"){
      var percentage = devisLocation.quantite / devis.quantite;

      lotDevis.prixTotalHT += (devis.prixHT * percentage);
      lotDevis.prixTotalTTC += (devis.prixTTC * percentage);
    }else{
      lotDevis.prixTotalHT += devis.prixHT;
      lotDevis.prixTotalTTC += devis.prixTTC;
    }
  }


  mapLocationUUIDtoLabel(locations, uuid){
    for(let location of locations){
      if(location.uuid === uuid){
        return location.label;
      }
    }
  }

}


const instance = new DevisService();
Object.freeze(instance);

module.exports = instance;
