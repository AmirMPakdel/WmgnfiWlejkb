import 'antd/dist/antd.css';
import {ChestComponent} from '../utils/chest';
import Head from 'next/head';
import 'react-nestable/dist/styles/index.css'


function MyApp({ Component, pageProps }) {
  return(
  <>
    <Head>

      <link rel="stylesheet" href="/styles/global.css"/>
      <link rel="stylesheet" href="/styles/colors.css"/>
      <link rel="stylesheet" href="/styles/fonts.css"/>
      <link rel="stylesheet" href="/styles/forced.css"/>
      <link rel="stylesheet" href="/styles/shadows.css"/>

      <script src="/js/consts.js"/>
      <script src="/js/env.js"/>
      <script src="/js/poly.js"/>

    </Head>
    <ChestComponent/>
    <Component {...pageProps}/>
  </>
  )
}

export default MyApp;


