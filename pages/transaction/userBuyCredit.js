import React, { Component } from "react";
import dynamic from 'next/dynamic'

const UserBuyCredit = dynamic(() => import("@/views/dynamics/transaction/UserBuyCredit"), { ssr: false });

export default class userBuyCredit extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <UserBuyCredit/>
    )
  }
}