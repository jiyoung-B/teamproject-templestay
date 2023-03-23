import ToIntro from "./ToIntro";
import Nav from "./Nav";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import IntroHead from "./IntroHead";
import {getSession} from "next-auth/client";





const Header = ({ children, pathname, menu, session }) => {
    const user = session.user;
    //const user = children.props.session.user;
    console.log('헤더'+user);
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
                <div className={showIntro ? "" : "fixed-top"}>
                    <Nav menu={menu} session={session} sess={user.name}/>
                </div>
            </div>)}
            </>
        );

}

export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    console.log('header1 -', sess);


    return {props : {sess}}
}

export default Header
