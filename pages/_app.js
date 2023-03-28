import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import '../styles/css/MyinfoCommon.css'
import '../styles/css/likes.css'
import '../styles/css/intro.css'
import '../styles/css/myinfo.css'
import '../styles/css/scrollbar.css'
import React from 'react';
import {useEffect} from "react";
import Layout from "./layout/Layout";
import {getSession} from "next-auth/client";
import App from "next/app";

function MyApp({ Component, pageProps, session }) {
    pageProps.session = session.user;
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <React.Fragment>
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        </React.Fragment>
    )
}

MyApp.getInitialProps = async (ctx) => {
    // next app의 기본 props객체 초기화 - application단위의 전역변수
    const appProps = await App.getInitialProps(ctx);
    let sess =await getSession(ctx);
    appProps.session = await sess;
    if(!sess) appProps.session = {user:{ name: 'guest', email: null, userid: 0 }};
    return {...appProps};

}

export default MyApp
