import React, { Component } from "react";
import dynamic from 'next/dynamic'
import { createUserWebHref, getParamByName } from "@/utils/helpers";
import { setCookie } from "@/utils/cookie";

export default class index extends Component {

  componentDidMount(){
    let token = getParamByName("token");
    let redirect = getParamByName("redirect");
    let url = env.PATHS.USER_OVERVIEW;

    if(token){
      setCookie(env.TOKEN_KEY, token);
    }

    if(redirect){
      url = redirect;
    }

    window.location.href = url;
  }

  render(){
    return(
      <div/>
    )
  }
}