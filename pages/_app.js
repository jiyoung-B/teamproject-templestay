import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import Layout from "./layout/Layout"

import '../styles/globals.css'
// 주석추가
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
