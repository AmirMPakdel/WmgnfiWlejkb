import BuyCourseController from "@/controllers/transaction/BuyCourseController";
import { priceFormat } from "@/utils/price";
import { sqlTimeStamp2ShamsiDateTime } from "@/utils/time";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./BuyCourse.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of BuyCourse Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class BuyCourse extends Component {
    
    constructor(props){
        super(props);
        this.controller = new BuyCourseController(this);
        this.state = {
            loading:true,
            details:{},
        }
    }
    
    componentDidMount(){
        this.controller.load()
    }

    

    onConfirm=()=>{
        window.location.href = env.PATHS.STUDENT_COURSES;
    }

    onPrint=()=>{

        this.btn_wrapper.style.display="none";

        let head = document.getElementsByTagName("head")[0];
        let content = document.getElementById("divcontents");
        let pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write('<html><head>');
        pri.document.write(head.innerHTML);
        pri.document.write('</head><body>');
        pri.document.write(content.innerHTML);
        pri.document.write('</body></html>');
        pri.document.close();
        pri.focus();
        pri.print();

        this.btn_wrapper.style.display="flex";
    }
    
    onBack=()=>{

        window.location.href = env.PATHS.COURSE+""+this.state.details.course_id+"/"+this.state.details.course_title.split(" ").join("-");
    }

    render(){

        let dt = this.state.details;

        let dateTime = sqlTimeStamp2ShamsiDateTime(dt.date).split("-");
        let date = dateTime[0];
        let time = dateTime[1];

        return(
            <IndexLayout accessType="student"
            showWithoutAuth={false}>
            
            <iframe id={"ifmcontentstoprint"} style={{height:"0px", width:"0px", position:"absolute"}}></iframe>
            
            <div className={styles.con} id={"divcontents"}>
            
            {
                this.state.loading?
                <Loading style={{minHeight:"60vh"}}/>
                :
                <div className={styles.card+" md_card_shd bgw"}>

                    <div className={styles.title+" tilt md_card_shd bglc1"}>{"???????????? ???????? ????????"}</div>

                    <div className={styles.list_wrapper}>

                        {
                            dt.success?
                            <ListRow title={"?????????? ????????????"} value={"????????"} valueClassName={"fsc"}/>:
                            <>
                                <ListRow title={"?????????? ????????????"} value={"????????????"} valueClassName={"fec"}/>
                                
                                <ListRow title={"?????????? ??????"}  value={dt.error_msg}
                                vertical={true} titleClassName=" fec "/>
                            </>
                        }
                        
                        <ListRow title={"?????????? ????????????"} value={"#"+dt.order_no}
                        valueClassName={"eng_num"}/>
                        
                        {
                            dt.success?
                            <ListRow title={"?????????? ????????????"} value={dt.ref_id}
                            valueClassName={"eng_num"}/>:null
                        }

                        <ListRow title={"?????? ???????????? ??????????"} value={dt.name}/>
                        
                        {/* <ListRow title={"?????????? ????????????"} value={dt.portal}/> */}
                        
                        {
                            dt.success?
                            <>
                            <ListRow title={"?????????? ????????????"} value={date}/>
                            <ListRow title={"???????? ????????????"} value={time}/>
                            </>:
                            <>
                            <ListRow title={"?????????? ????????"} value={date}/>
                            <ListRow title={"???????? ????????"} value={time}/>
                            </>
                        }

                        <ListRow title={"?????????? ???????????? ???????????? ??????"} value={priceFormat(dt.price)+" ??????????"}/>

                        <ListRow title={"???????? ???????????? ??????"} value={priceFormat(dt.price)+" ??????????"}/>

                        <ListRow title={"???????? ??????????"} value={0+"%"}/>

                        <ListRow title={"???????? ???? ???????????? ??????????"} value={priceFormat(dt.price)+" ??????????"}/>

                        <ListRow title={"???????? ???? ???? ????????"} value={persianNToText.getText(dt.price)+" ??????????"}/>

                        <ListRow title={"???????? ????"} value={priceFormat(dt.price)+" ??????????"}/>


                        <div className={styles.btn_wrapper} ref={r=>this.btn_wrapper=r}>

                        {
                            dt.success?
                            <MainButton className={styles.confirm_btn}
                            title={"?????? ????????????"}
                            onClick={this.onConfirm}/>
                            :
                            <MainButton className={styles.confirm_btn}
                            title={"????????????"}
                            onClick={this.onBack}/>
                        }

                            {/* {
                                dt.success?
                                <MainButton className={styles.pring_btn}
                                title={"??????"}
                                borderMode={true}
                                onClick={this.onPrint}/>:null
                            } */}
                            
                        </div>

                    </div>

                </div>
                }

            </div>

            </IndexLayout>
        )
    }
}