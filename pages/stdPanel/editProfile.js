import React, { Component } from "react";
import dynamic from 'next/dynamic'
import Head from "node_modules/next/head";

const EditProfile = dynamic(() => import("@/views/dynamics/stdPanel/EditProfile"), { ssr: false });

export default class editProfile extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <>
        <Head>
          <script src={"/statics/js/cities.js"}></script>
        </Head>
        <EditProfile/>
      </>
      
    )
  }
}