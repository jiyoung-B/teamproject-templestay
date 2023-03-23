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

    console.log('레이아웃 칠드런 프롭스 -', children.props);
    console.log('레이아웃 칠드런 프롭스세션 -', children.props.session);
    let sess = children.props.session;
    console.log('레이아웃 세션', session);

    const title = meta?.title;
    //console.log('레이아웃'+children);
    useEffect(() => {
        document.title = title ?? 'Temfo';
    })

    return(
        <>
            <Header pathname={pathname} session={session} />
            <div className="container" id="wrapper">
                <main>{children}</main>
            </div>
            <Footer />
        </>

    )
}



export default Layout ;