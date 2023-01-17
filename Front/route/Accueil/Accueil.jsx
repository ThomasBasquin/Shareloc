import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import Title from "../../components/Title/Title"
import BoxGrise from "../../components/BoxGrise/BoxGrise"
import Box from "../../components/Box/Box"
import { COLOR } from "../../constant/color";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import './Accueil.css'
export default function Accueil() {
  const [nom, setNom] = useState("Roméo");
  return (
    <>
    <div style={{display : 'flex', justifyContent : 'center', flexDirection : 'column'}}>
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <Title title={"Bonjour, "+nom+"."} />
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
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-yellow-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width : 40}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</div>
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
