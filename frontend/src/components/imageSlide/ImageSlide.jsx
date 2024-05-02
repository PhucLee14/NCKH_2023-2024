import React from "react";
// import "react-slideshow-image/dist";
import { Fade, Slide, Zoom } from "react-slideshow-image";

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    backgroundSize: "cover",
};

const ImageSlide = ({ imageArr }) => {
    return (
        <div>
            <Fade>
                {imageArr.map((image, index) => {
                    <div key={index}>
                        <div
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${image})`,
                            }}
                        ></div>
                    </div>;
                })}
            </Fade>
        </div>
    );
};

export default ImageSlide;
