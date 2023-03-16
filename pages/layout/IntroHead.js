import React from "react";
import Link from "next/link";
import img from "next/image";

const IntroHead = () => {
    return (
        <div>
            <Link href="/">
                <div style={{background: "grey"}}>
                    <h1> Temfo, </h1>
                    <p>마음챙김, 템포와 함께 떠나보아요.</p>
                    <img src="/img/sampleImg_1.png" alt="intro_img_1" width={1940} height={400}/>
                </div>
            </Link>

        </div>
    )
}

export default IntroHead;