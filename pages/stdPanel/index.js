import React, { Component } from "react";
import dynamic from 'next/dynamic'

export default class index extends Component {

  componentDidMount(){
    window.location.href=env.PATHS.STUDENT_COURSES;
  }

  render(){
    return(
      <div/>
    )
  }
}