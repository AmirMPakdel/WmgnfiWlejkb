import React, { Component } from "react";
import dynamic from 'next/dynamic';
import Head from "node_modules/next/head";

const Profile = dynamic(() => import("@/views/dynamics/dashboard/Profile"), { ssr: false });

export default class profile extends Component {

  render(){
    return(
      <>
        <Head>
          <script src={"/statics/js/cities.js"}></script>
        </Head>
        <Profile/>
      </>
    )
  }
}