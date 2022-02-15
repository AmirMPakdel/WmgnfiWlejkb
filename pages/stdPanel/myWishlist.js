import React, { Component } from "react";
import dynamic from 'next/dynamic'

const MyWishlist = dynamic(() => import("@/views/dynamics/stdPanel/MyWishlist"), { ssr: false });

export default class myWishlist extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <MyWishlist/>
    )
  }
}