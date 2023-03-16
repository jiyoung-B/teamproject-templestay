import Nav from "./Nav";
import Footer from "./Footer";
import ToIntro from "./ToIntro";
import {Component} from "react";
import {Head} from "next/document";

// 반영이 안돼?
const Layout =({children, menu, meta}) =>{
    const {description, icon} = meta;

    return(
        <html lang="ko">
        <head>
            <link rel="icon" href="/comma1.png" />
            <title>Temfo,</title>
        </head>

        <body>
        <div id="wrapper">
            <main>{children}</main>
            <Footer />

        </div>
        </body>
        </html>
    )
}



export default Layout ;