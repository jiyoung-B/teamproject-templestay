import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css';

import { useEffect } from 'react';

/*
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
*/

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;