import ToIntro from "./ToIntro";
import Nav from "./Nav";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import IntroHead from "./IntroHead";





const Header = ({ pathname }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const { top } = ref.current.getBoundingClientRect();
                setShowIntro(top >= 0);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
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
                <div>{/* className={showIntro ? "" : "sticky-xxl-top"}>*/}
                    <Nav />
                </div>
            </div>)}
            </>
        );

}

export default Header
