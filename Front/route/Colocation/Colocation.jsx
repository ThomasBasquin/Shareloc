import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Box from "../../components/Box/Box";
import "./Colocation.css";
import { COLOR } from "../../constant/color";
import Title from "../../components/Title/Title";
export default function Colocation() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between"}} >
        <Title title="Colocation" />
        <Resume />
        

      </div>
    </>
  );
}

const Resume = () => {
  return (
    <div className="resume">
      <Box style={{ width: "60%", marginRight: 700, marginTop: 40 }}>
        <div className="text-white">
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <h1 style={{fontWeight: 500, fontSize : 38}}>Résumé</h1>
          </div>
          <div className="itemResume">
            <Box style={{ backgroundColor: COLOR.bleuFonce, width: 200, display : 'flex', justifyContent: 'center', margin : 20}}>
              <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center'}}>
              <p className="titreItemResume">Participants</p>
              <p className="valeurItemResume">5</p>
              </div>

            </Box>
            <Box style={{ backgroundColor: COLOR.bleuFonce, width: 200, display : 'flex', justifyContent: 'center', margin : 20}}>
              <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center'}}>
              <p className="titreItemResume">Services</p>
              <p className="valeurItemResume">12</p>
              </div>

            </Box>
            
          </div>
          <div className="itemResume">
          <Box style={{ backgroundColor: COLOR.bleuFonce, width: 200, display : 'flex', justifyContent: 'center', margin : 20}}>
              <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center'}}>
              <p className="titreItemResume">Points</p>
              <p className="valeurItemResume">667</p>
              </div>

            </Box>
            <Box style={{ backgroundColor: COLOR.bleuFonce, width: 200, display : 'flex', justifyContent: 'center', margin : 20}}>
              <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center'}}>
              <p className="titreItemResume">Top coloc</p>
              <p className="valeurItemResume">Hugo</p>
              </div>

            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};
