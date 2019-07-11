import React, { Component } from 'react';
import { Accordion, Button, Dropdown, Form, Menu, Message, Radio, Table } from 'semantic-ui-react'
import Layout from '../components/shared/Layout';
import DevisService from '../services/devis/devisService';
import DevisRowParMetier from '../components/DevisRowParMetier';
import DevisRowParLocation from '../components/DevisRowParLocation';
//import '../components/shared/Styles.css';


class DevisIndex extends Component {

  static async getInitialProps(){
    const devis = await DevisService.getDevisList();
    return {devis};
  }

  state = {
    checked: false,
    activeIndex: -1
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  toggle = () => this.setState(prevState => ({ checked: !prevState.checked }))


  renderRows(index){
    const { checked, activeIndex } = this.state;
    var lots = this.state.checked ? this.props.devis.parMetier : this.props.devis.parLocation;

    return lots[index].lignes.map(d => {
      return (
        this.state.checked ?
        <DevisRowParMetier
          designation={d.designation}
          description={d.description}
          prixUnitaireHT={d.prixUnitaireHT}
          quantite={d.quantite}
          unite={d.unite}
          prixHT={d.prixHT}
          tauxTVA={d.tauxTVA}
          montantTVA={d.montantTVA}
          prixTTC={d.prixTTC}
          location={d.location}
        />
        :
        <DevisRowParLocation
          designation={d.designation}
          description={d.description}
          prixUnitaireHT={d.prixUnitaireHT}
          quantite={d.quantite}
          unite={d.unite}
          prixHT={d.prixHT}
          tauxTVA={d.tauxTVA}
          montantTVA={d.montantTVA}
          prixTTC={d.prixTTC}
          metier={d.metier}
        />
      )
    });
  }

  renderTable(index){
    const { Header, Row, HeaderCell, Body } = Table;

    return (
     <Table>
       <Header>
         <Row>
           <HeaderCell>designation</HeaderCell>
           <HeaderCell>description</HeaderCell>
           <HeaderCell>prixUnitaireHT</HeaderCell>
           <HeaderCell>quantite</HeaderCell>
           <HeaderCell>unite</HeaderCell>
           <HeaderCell>prixHT</HeaderCell>
           <HeaderCell>tauxTVA</HeaderCell>
           <HeaderCell>montantTVA</HeaderCell>
           <HeaderCell>prixTTC</HeaderCell>
           <HeaderCell>{this.state.checked ? "location" : "metier" }</HeaderCell>
         </Row>
       </Header>
       <Body>{this.renderRows(index)}</Body>
     </Table>
    );

  }

  renderAccordionMenuContent(lotDevis){
    return (
      <div style={{display: 'flex',  justifyContent:'space-between', alignItems:'stretch'}}>
        <div>{lotDevis.label}</div>
        <div>prixTotalHT: {Number(lotDevis.prixTotalHT).toFixed(2)} &nbsp;&nbsp;&nbsp; prixTotalTTC: {Number(lotDevis.prixTotalTTC).toFixed(2)}</div>
      </div>
    )

  }

  renderAccordionMenu(){
    const { checked, activeIndex } = this.state;
    var lots = this.state.checked ? this.props.devis.parMetier : this.props.devis.parLocation;

    return lots.map((lot, index) => {
         return (
           <Menu.Item>
              <Accordion.Title
                active={activeIndex === index}
                content={this.renderAccordionMenuContent(lot)}
                index={index}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === index} content={this.renderTable(index)} />
           </Menu.Item>
         )
    });
  }


  render(){
    const { checked, activeIndex } = this.state;

    return (
      <Layout>
      <div style={{display: 'flex',  justifyContent:'space-between', alignItems:'stretch'}}>
        <h3>Vos devis</h3>
        <div>
          <label>Classé par {this.state.checked ? "métiers" : "pièces"} </label>
          <Radio toggle position="right" onChange={this.toggle} checked={this.state.checked} />
          {` `}
        </div>
      </div>
      <div>
        <Accordion fluid as={Menu} vertical>{this.renderAccordionMenu()}</Accordion>
        <div style={{ display:'flex', justifyContent:'flex-end'}}>
          <div>Prix total HT: {this.props.devis.prixTotalHT} &nbsp;&nbsp;&nbsp; Prix total TTC: {this.props.devis.prixTotalTTC}</div>
        </div>
      </div>
      </Layout>
    )
  }
}

export default DevisIndex;
