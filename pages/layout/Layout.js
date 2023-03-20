import Footer from "./Footer";
import {Component, useEffect, useLayoutEffect} from "react";
import Header from "./Header";

export async function getServerSideProps(context) {
    return {
        props: {
            pathname: context.req.url,
        },
    };
}

const Layout =({children, meta, pathname}) => {
    const title = meta?.title;
    useEffect(() => {
        document.title = title ?? 'Temfo';
    })

    return(
        <>
            <Header pathname={pathname} />
            <div className="container" id="wrapper">
                <main>{children}</main>
            </div>
            <Footer />
        </>

    )
}



export default Layout ;