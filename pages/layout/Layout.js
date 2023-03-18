import Nav from "./Nav";
import Footer from "./Footer";
import ToIntro from "./ToIntro";
import {Component} from "react";
import {Head} from "next/document";

// Layout 수정 반영이 안돼?
const Layout =({children, meta}) =>{
    const icon = meta;

    return(
<>
        <head>
            <link rel="icon" href={icon || '/favicon.ico'} />
            <title>Temfo,</title>
        </head>

        <body>
        <div id="wrapper">
            <main>{children}</main>
            <Footer />

        </div>
        </body>
</>

    )
}



export default Layout ;