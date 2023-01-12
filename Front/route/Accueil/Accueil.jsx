import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import Title from "../../components/Title/Title"
import BoxGrise from "../../components/BoxGrise/BoxGrise"
import Box from "../../components/Box/Box"
import { COLOR } from "../../constant/color";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import './Accueil.css'
export default function Accueil() {
  return (
    <>
    <Navbar />
    <div style={{display : 'flex', justifyContent : 'center', flexDirection : 'column'}}>
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <Title title="Bonjour, Roméo" />
      <MesPoints />
    </div>
      <ServicesEnCours />
    </div>
      

    </>
  );
}

const MesPoints = () => {
  return (
    <BoxGrise style={{width:'700px', marginRight : '200px', marginTop : "50px"}}>
      <div style={{ display : 'flex', flexDirection: "row", justifyContent: "space-between" }}>
        <p className="mesPoints">Mes points</p>
        <div style={{ display : 'flex', flexDirection : "row"}}>
        <p className="points">
          76
        </p><img src="../../src/assets/star-solid.svg" style={{height:40, color: COLOR.jaune}}/></div>
      </div>
    </BoxGrise>
  );
};

const ServicesEnCours = () => {
  return (<div className="" style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
    <Box style={{margin : 20, width : 1600, backgroundColor : COLOR.bleuFonce}}>
    <p className="titreServicesEnCours">Mes services en cours :</p>
    <div className="servicesEnCours">
      
      <ServiceComponent
          date="18/02/2022"
          by="Hugo"
          pour="Roméo"
          label="Passer l'aspirateur"
          score={10}
        />
        <ServiceComponent
          date="19/02/2022"
          by="Lucas"
          pour="Roméo"
          label="Embrasser Roméo"
          score={12}
        />
        <ServiceComponent
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Faire le repas de Noël"
          score={25}
        />
        <ServiceComponent
          date="15/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
    </div>
    </Box>
    </div>
  )
}
