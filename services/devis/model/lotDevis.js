"use strict";


/**
 * @prop {string} label - attribut du lot metier/location
 * @prop {boolean} isByLocation - flag "lot par metier"=false / "lot par location"=true
 * @prop {number} totalHT - le prix du lot de travaux hors tax
 * @prop {number} totalTTC - le prix du lot de travaux tout tax compris
 * @prop {[]} lignes - la list des devis de travaux compris dans ce lot
 */
class LotDevis{

  constructor(label, isByLocation, totalHT, totalTTC, lignes){
    this.label = label;
    this.isByLocation = isByLocation;
    this.prixTotalHT = Number(totalHT);
    this.prixTotalTTC = Number(totalTTC);
    this.lignes = lignes;
  }
}

module.exports = LotDevis;
