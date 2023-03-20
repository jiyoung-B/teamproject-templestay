import ToIntro from "./ToIntro";
import Nav from "./Nav";
import {useRouter} from "next/router";
import IntroHead from "./IntroHead";
import {useEffect, useRef, useState} from "react";





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

        return (
            <>
                <div>
                    <div ref={ref}>
                        <div style={{ height: showIntro ? "auto" : 0, opacity: showIntro ? 1 : 0 }}>
                            <ToIntro />
                        </div>
                    </div>
                    <div className={showIntro ? "" : "fixed-top"}>
                        <Nav />
                    </div>
                    {/* 나머지 컴포넌트들 */}
                </div>
            </>
        );

}

export default Header
