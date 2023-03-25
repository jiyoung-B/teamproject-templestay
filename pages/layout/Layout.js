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

const Layout =({children, meta, pathname, session}) => {

    let sess = children.props.session;

    const title = meta?.title;
    //console.log('레이아웃'+children);
    useEffect(() => {
        document.title = title ?? 'Temfo';
    })

    return(
        <>
            <Header pathname={pathname} session={session} className="mb-2" />
            <div className="container" id="wrapper">
                <main>{children}</main>
            </div>
            <Footer />
        </>

    )
}



export default Layout ;