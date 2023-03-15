import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import '../styles/css/MyinfoCommon.css'
import '../styles/css/likes.css'
import '../styles/css/myinfo.css'
import Layout from "./layout/Layout"


function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp