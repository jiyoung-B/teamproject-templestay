import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import '../styles/css/MyinfoCommon.css'
import '../styles/css/likes.css'
import '../styles/css/intro.css'
import '../styles/css/myinfo.css'
import React from 'react';
import {useEffect} from "react";
import Layout from "./layout/Layout";

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <React.Fragment>
            <Layout>
                {getLayout(<Component {...pageProps} />)}
            </Layout>
        </React.Fragment>
    )
}

export default MyApp
