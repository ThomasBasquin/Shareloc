import React, {useState} from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import BoxGrise from "../../components/BoxGrise/BoxGrise";
import Box from "../../components/Box/Box"
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import {COLOR} from "../../constant/color"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./DetailsService.css"
export default function DetailsService() {

  const [points, setPoints ] = useState(5);
  const [date, setDate ] = useState("20/12/2022");
  const [by, setBy ] = useState("Hugo");
  const [pour, setPour ] = useState("Roméo");
  const [label, setLabel ] = useState("La vaisselle");

  return (
    <div className="">
        <Title title={label} />
        <div style={{display : 'flex', justifyContent : 'center'}}>
          <BoxGrise style={{width : '70%', height : 400, alignItems : 'center'}}>
          <Details points={points}
        date={date}
        by={by}
        pour={pour}/>
          </BoxGrise>
         
        </div>
        <div className="centre">
         <Link to="/colocation" style={{margin : 20}}>
              <button className="button" id="button-disconnect" style={{fontSize : 40}}>
                Valider le service
              </button>
            </Link>
            <Link to="/colocation" style={{margin : 20}}>
              <button className="button" id="button-leave" style={{fontSize : 40}}>
               Retour en arrière
              </button>
            </Link>
            </div>
    </div>
  )
}

const Details = ({points, date, by, pour}) => {
  return (
    <div className="">
      <div className="text-white">
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: '30%',
                display: "flex",
                justifyContent: "center",
                margin: 30,              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Points</p>
                <p className="valeurItemResume">{points}</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: '30%',
                display: "flex",
                justifyContent: "center",
                margin: 30,              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Fait le</p>
                <p className="valeurItemResume">{date}</p>
              </div>
            </Box>
          </div>
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: '30%',
                display: "flex",
                justifyContent: "center",
                margin: 30,              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">De</p>
                <p className="valeurItemResume">{by}</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: '30%',
                display: "flex",
                justifyContent: "center",
                margin: 30,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Pour</p>
                <p className="valeurItemResume">{pour}</p>
              </div>
            </Box>
          </div>
        </div>
    </div>
  )
}
