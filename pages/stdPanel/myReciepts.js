import React, { Component } from "react";
import dynamic from 'next/dynamic'

const MyReciepts = dynamic(() => import("@/views/dynamics/stdPanel/MyReciepts"), { ssr: false });

export default class myReciepts extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <MyReciepts/>
    )
  }
}