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
    <div>
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <Title title="Accueil" />
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
  return (
    <Box style={{margin : 20}}>
    <div className="servicesEnCours">
      <p className="titreServicesEnCours">Mes services en cours :</p>
      <ServiceComponent
          navigation={navigation}
          date="18/02/2022"
          by="Hugo"
          pour="Roméo"
          label="Passez l'aspirateur"
          score={10}
        />
        <ServiceComponent
          navigation={navigation}
          date="19/02/2022"
          by="Lucas"
          pour="Roméo"
          label="Passez le balais"
          score={12}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Faire le repas de Noël"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="15/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
    </div>
    </Box>
  )
}
