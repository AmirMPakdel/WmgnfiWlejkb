import 'antd/dist/antd.css';
import {ChestComponent} from '@/utils/chest';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { Component as C } from "react";
import { getUrlPart } from '@/utils/helpers';

function checkIsMainSite(){

  let p2 = getUrlPart(1)

  return p2=="minfo"?true:false;
}

export default class App extends C {

    render(){


    let isMain = checkIsMainSite();
  
    let store_css = [
      "/statics/styles/colors.css",
    ];
  
    let main_css = [
      "/statics/styles/main_colors.css",
    ];
    
    let { Component, pageProps } = this.props;

    return(
    <>
      <Head>
  
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#2b5797"/>
        <meta name="theme-color" content="#ffffff"/>
        
        <link rel="stylesheet" href="/statics/styles/global.css"/>
        <link rel="stylesheet" href="/statics/styles/colors.css"/>
        <link rel="stylesheet" href="/statics/styles/fonts.css"/>
        <link rel="stylesheet" href="/statics/styles/forced.css"/>
        <link rel="stylesheet" href="/statics/styles/shadows.css"/>
        <link rel="stylesheet" href="/statics/styles/animate.min.css"/>
  
        {
          isMain?
          main_css.map((v,i)=>(
            <link key={i} rel="stylesheet" href={v}/>
          ))
          :
          store_css.map((v,i)=>(
            <link key={i} rel="stylesheet" href={v}/>
          ))
        }
  
        <script src="/statics/js/theme.js"/>
        <script src="/statics/js/consts.js"/>
        <script src="/statics/js/helpContent.js"/>
        <script src="/statics/js/env.js"/>
        <script src="/statics/js/poly.js"/>
  
      </Head>
      <ChestComponent/>
      <Component {...pageProps}/>
    </>
    )
  }
}