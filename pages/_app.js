import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import '../styles/css/MyinfoCommon.css'
import '../styles/css/likes.css'
import '../styles/css/intro.css'
import '../styles/css/myinfo.css'
import Layout from "./layout/Layout"
import {useEffect} from "react";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
