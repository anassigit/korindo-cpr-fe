import React, { Component } from "react"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
// Carousel images
import noimage from "../assets/images/no-image.jpg"
// import img5 from "../assets/images/small/img-5.jpg"
// import img6 from "../assets/images/small/img-6.jpg"
import PropTypes from "prop-types";

const Slidewithcontrol = (props) => {
    
    return (
        <Carousel>
            
            {props.foto1 == null ? 
             <div><img src={noimage} />
             <p className="legend">Foto 1</p></div>
            :<div style={{height : "100%"}}>
                <img src={(process.env.REACT_APP_APIKEY === "production" ? process.env.REACT_APP_FILE_PROD :process.env.REACT_APP_FILE_DEV) +props.foto1} />
                <p className="legend">Foto 1</p>
            </div>}

            {props.foto2 == null ? 
            <div><img src={noimage} />
               <p className="legend">Foto 2</p></div>
            :<div style={{height : "100%"}}>
                <img src={(process.env.REACT_APP_APIKEY === "production" ? process.env.REACT_APP_FILE_PROD :process.env.REACT_APP_FILE_DEV)+props.foto2} />
                <p className="legend">Foto 2</p>
            </div>}
            {props.foto3 == null ? 
            <div><img src={noimage} />
              <p className="legend">Foto 3</p></div>
            :<div style={{height : "100%"}}>
                <img src={(process.env.REACT_APP_APIKEY === "production" ? process.env.REACT_APP_FILE_PROD :process.env.REACT_APP_FILE_DEV)+props.foto3} />
                <p className="legend">Foto 3</p>
            </div>}
            {props.foto4 == null ? 
            <div><img src={noimage} />
              <p className="legend">Foto 4</p></div>
            :<div style={{height : "100%"}}>
                <img src={(process.env.REACT_APP_APIKEY === "production" ? process.env.REACT_APP_FILE_PROD :process.env.REACT_APP_FILE_DEV)+props.foto4} />
                <p className="legend">Foto 4</p>
            </div>}
        </Carousel>
    );
  }

  Slidewithcontrol.propTypes = {
    foto1: PropTypes.any,
    foto2: PropTypes.any,
    foto3: PropTypes.any,
    foto4: PropTypes.any,
}
export default Slidewithcontrol
