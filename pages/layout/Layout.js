import Nav from "./Nav";
import Footer from "./Footer";
import ToIntro from "./ToIntro";
import {Component} from "react";
import IntroHead from "./IntroHead";


// 함수로 url받아서 if 문으로 표시하고 안하고.
const Layout =({children}) =>{

    // Intro.getLayout = (page) => <Footer>{page}</Footer>;
    return(
        <div id="wrapper">
            <ToIntro />
            <Nav />
            {/*{getLayout(<Component {...pageProps} />)}*/}
            {/*<IntroHead />*/}

            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout ;