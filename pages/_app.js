import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import Layout from "./layout/Layout"

//dkanrjsk
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
