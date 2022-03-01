import React, { Component } from "react";
import dynamic from 'next/dynamic'

export default class index extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <RoadMaps/>
    )
  }
}

class RoadMaps extends Component {
  
  render(){
    return(
      <div style={{padding:"4rem"}}>

        <h2 style={{fontFamily:"IranSansEng"}}>RoadMap1</h2>

        <ol style={{lineHeight:"2rem"}}>

          <li style={{fontFamily:"IranSansEng"}}>register and login in minfo website <a href={"/minfo/auth"}>here</a>.</li>

          <li style={{fontFamily:"IranSansEng"}}>visit user's dashboard <a href={"/dashboard"}>here</a>.</li>

          <li style={{fontFamily:"IranSansEng"}}>user's dashboard, settings and educators crud modal <a href={"/dashboard/settings"}>here</a>.</li>

          <li style={{fontFamily:"IranSansEng"}}>user's dashboard, create new course <a href={"/dashboard/newCourse"}>here</a>.</li>

          <li style={{fontFamily:"IranSansEng"}}>user's dashboard, view my courses <a href={"/dashboard/myCourses"}>here</a>.</li>

          <li style={{fontFamily:"IranSansEng"}}>user's dashboard, view my courses, edit a course by click on edit button.</li>

          <li style={{fontFamily:"IranSansEng"}}>user's dashboard, view my courses, view a course by click on the image.</li>

        </ol>
        
      </div>
    )
  }
}