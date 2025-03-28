import React, { useState,Component,useEffect } from "react"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
// Carousel images
import noimage from "../assets/images/no-image.jpg"
import PropTypes from "prop-types";


const SlidewithcontrolUnlimited = (props) => {

    const [activeSlidePos, setActiveSlidePos] = useState(props.activeSlide)
    const slideChangeHandler = val => setActiveSlidePos(val)

    useEffect(() => {
        if(props.foto != undefined){
            if(props.foto.length > 0){
                if(props.appKeterangan == ""){
                    props.foto.map((row,i) => (
                        i == 0 ? props.setAppKeterangan(row.ket) : ""
                    ))
                }
            }
        }
      }, [props.appKeterangan,props.foto])

      useEffect(() => {
        if(props.appMap){
            setActiveSlidePos(props.mapIdx)
            slideChangeHandler
        }else{
            if (activeSlidePos != props.activeSlide) {
                    setActiveSlidePos(props.activeSlide)
                    props.setActiveSlide(0)            
            }
        }
      }, [props.activeSlide,props.appMap,props.mapIdx])
    
    
    return (
        <>
        <Carousel 
            selectedItem={activeSlidePos}
            onChange={(index, item) => {
                slideChangeHandler
                props.foto.map((row,i) => (
                        index == i ? props.setAppKeterangan(row.ket) : ""
                ))
            }}
            onClickThumb={(index, item) => {
                slideChangeHandler
                props.foto.map((row,i) => (
                        index == i ? props.setAppKeterangan(row.ket) : ""
                ))
            }}
            onClickItem={(index, item) => {
                slideChangeHandler
                props.foto.map((row,i) => (
                        index == i ? props.setAppKeterangan(row.ket) : ""
                ))
            }} 
      >
            {
                props.foto.length == 0 ?
                <div>
                    <img src={noimage} />
                    <p className="legend">
                        Foto 1 </p>
                </div> : 
                (props.foto.map((row, i) =>
                        row.poto.length == 0 ? 
                        <div>
                            <img src={noimage} />
                            <p className="legend">
                                Foto 1</p>
                        </div>
                        : 
                    <div key={i} style={{height : "100%"}}>
                        <img src={(process.env.REACT_APP_APIKEY === "production" ? process.env.REACT_APP_FILE_PROD :process.env.REACT_APP_FILE_DEV) + row.poto} />
                        <p className="legend">Foto {i+1}</p>
                    </div>
                ))
            }
        </Carousel>
        </>
    );
  }

  SlidewithcontrolUnlimited.propTypes = {
    foto: PropTypes.any,
    setAppKeterangan: PropTypes.any,
    appKeterangan: PropTypes.any,
    activeSlide: PropTypes.any,
    setActiveSlide: PropTypes.any,
    appMap: PropTypes.any,
    mapIdx: PropTypes.any
}
export default SlidewithcontrolUnlimited
