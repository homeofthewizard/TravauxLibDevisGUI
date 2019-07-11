import React, { Component } from 'react';
import { Table, Button, Message, Form } from 'semantic-ui-react';

class DevisRowParMetier extends Component {

  render(){
    const { Row, Cell } = Table;
    const {
      designation,
      description,
      prixUnitaireHT,
      quantite,
      unite,
      prixHT,
      tauxTVA,
      montantTVA,
      prixTTC,
      location
    } = this.props;

    return (
      <Row>
        <Cell>{designation}</Cell>
        <Cell>{description}</Cell>
        <Cell>{prixUnitaireHT}</Cell>
        <Cell>{quantite}</Cell>
        <Cell>{unite}</Cell>
        <Cell>{prixHT}</Cell>
        <Cell>{tauxTVA}</Cell>
        <Cell>{montantTVA}</Cell>
        <Cell>{prixTTC}</Cell>
        <Cell>{location}</Cell>
      </Row>
    );
  }
}

export default DevisRowParMetier;
