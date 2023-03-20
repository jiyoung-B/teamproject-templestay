import React from "react";
import img from "next/image";
import {NavLink} from "react-bootstrap";


const IntroHead = () => {
    return (
        <div>
            <NavLink className={"text-center pb-1"} style={{color: "white"}} href="/">
                <div className="card bg-dark text-white">
                    <img className="card-img" src="/img/sampleImg_1.png" alt="Card image" />
                        <div className="card-img-overlay text-center"  style={{color: "white"}}>
                            <h1> Temfo, </h1>
                            <p className="card-text">마음챙김, 템포와 함께 떠나보아요.</p>
                        </div>
                </div>
            </NavLink>


        </div>
    )
}

export default IntroHead
