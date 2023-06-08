import 'antd/dist/antd.css';
import {ChestComponent} from '@/utils/chest';
import Head from 'next/head';
import React, { Component as C } from "react";


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

function checkIsMainSite(){

  if(getTenant()){

    return false;

  }else{
    
    return true;
  }
}

export function isDevEnv() {
    
  if(location.hostname === "localhost"){
      return true;
  }
  return false;
}

function getCookie(cname){

  let name = cname + "=";

  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {

      let c = ca[i];

      while (c.charAt(0) == " ") {

          c = c.substring(1);

      }

      if (c.indexOf(name) == 0) {

          return c.substring(name.length, c.length);
      }
  }
  
  return "";
}

function getTenant(){
  let tenant_name = null;
  // for testing and dev environment
  if(isDevEnv()){
      tenant_name = getCookie("__mgnftnt");
  }else{ // for deployment environment
      let splited_hn = location.hostname.split(".");
      if(splited_hn.length == 3){
          tenant_name = splited_hn[0];
      }
  }
  return tenant_name;
}