import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import("@/views/dynamics/index/ContactUs"), { ssr: false });

export default class contactUs extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <ContactUs/>
    )
  }
}