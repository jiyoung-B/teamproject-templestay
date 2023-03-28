import ToIntro from "./ToIntro";
import Nav from "./Nav";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import IntroHead from "./IntroHead";
import {getSession} from "next-auth/client";
import axios from "axios";
import * as pageProps from "next-auth/client";





const Header = ({ props, children, pathname, menu, session }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const ref = useRef(null);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (ref.current) {
    //             const { top } = ref.current.getBoundingClientRect();
    //             setShowIntro(top >= 0);
    //         }
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= 0) setShowIntro(true)
            // setScrollPosition(window.scrollY); *******해결해~
            if (window.scrollY >= 1) setShowIntro(false)
        };
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setShowIntro(currentPath === "/");
    }, [currentPath]);

    useEffect(() => {
        setShowIntro(currentPath === "/intro");
    }, [currentPath]);

     // className="mb-5 text-right position-relative">
     //    <div className="position-absolute top-0 end-0">

        return (
            <>
                {(currentPath === "/intro") ? (<IntroHead />) :(<div>
                <div ref={ref}>
                    <div style={{ height: showIntro ? "auto" : 0, opacity: showIntro ? 1 : 0 }}>
                        <ToIntro />
                    </div>
                </div>
                <div className={showIntro ? "" : "fixed-top"}>
                    <Nav menu={menu} session={session}/>
                </div>
            </div>)}
            </>
        );

}



export default Header
