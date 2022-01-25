import 'antd/dist/antd.css';
import {ChestComponent} from '../utils/chest';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return(
  <>
    <Head>

      
      <link rel="stylesheet" href="/statics/styles/global.css"/>
      <link rel="stylesheet" href="/statics/styles/colors.css"/>
      <link rel="stylesheet" href="/statics/styles/fonts.css"/>
      <link rel="stylesheet" href="/statics/styles/forced.css"/>
      <link rel="stylesheet" href="/statics/styles/shadows.css"/>
      <link rel="stylesheet" href="/statics/styles/animate.min.css"/>

      <script src="/statics/js/theme.js"/>
      <script src="/statics/js/consts.js"/>
      <script src="/statics/js/env.js"/>
      <script src="/statics/js/poly.js"/>

    </Head>
    <ChestComponent/>
    <Component {...pageProps}/>
  </>
  )
}

export default MyApp;


