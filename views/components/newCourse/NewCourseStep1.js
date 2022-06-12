import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./NewCourseStep1.module.css";
import SelectSearch from "@/views/components/global/SelectSearch";
import TextInput from "../global/TextInput";
import { InputFilter } from "@/utils/validation";

export default class NewCourseStep1 extends Component {

    state={
        can_continue:false,

        inputs:{
            title: "",
            price: "",
        }
    }

    componentDidMount(){

        this.continueCheck();
        //fakeInput(this);
    }

    onChangeInput = (k, v)=>{

        this.props.parent.state[k]=v;
        this.setState(this.state, this.continueCheck);
    }

    onCategory=(id, obj)=>{
        this.props.parent.state["category"]= id;
        this.setState(this.state, this.continueCheck);
    }

    continueCheck=(mark_red)=>{

        let ps = this.props.parent.state;
        let can = true;

        if(!ps.title){
            can = false;
        }
        if(!ps.price){
            can = false;
        }
        if(!ps.category){
            can = false;
        }

        this.setState({can_continue:can});
    }
    
    onNext=()=>{

        if(!this.state.can_continue){
            this.continueCheck(true);
            return;
        }
        
        this.props.parent.setState({
            step : 2
        }, ()=>{
            window.scrollTo(0,0);
        });
    }

    render(){
        
        let ps = this.props.parent.state;
        return(
            <>
            <div className={styles.con}>

                <div className={styles.sec_con}>

                    
                    
                    <div className={styles.sec_title}>{"عنوان و قیمت دوره"}</div>

                    
                    <div className={styles.info_sec1+" cpnt"}>{text1}</div>

                    <TextInput className={styles.txinput1} 
                    placeholder={"عنوان دوره"}
                    value={ps.title}
                    maxLength={32}
                    onChange={(t)=>this.onChangeInput("title", t)}/>

                    <div className={styles.info_sec2}>{text2}</div>

                    <TextInput className={styles.txinput1+" cpnt"} 
                    placeholder={"قیمت دوره (تومان)"}
                    value={ps.price}
                    type={"price"}
                    inputFilter={InputFilter.price}
                    onChange={(t)=>this.onChangeInput("price", t)}/>

                    <div className={styles.info_sec2}>{text3}</div>

                    <SelectSearch className={styles.category_con}
                    options={ps.categories}
                    placeholder={"انتخاب زمینه تدریس"}
                    value={ps.category}
                    onChange={this.onCategory}/>

                </div>

            </div>

            <div className={styles.wrapper2}>

                <MainButton className={styles.next_btn} 
                title={"تایید و ادامه"}
                onClick={this.onNext}
                disabled={!this.state.can_continue}/>

            </div>
            </>
        )
    }
}

const text1 = "در این قسمت عنوان دوره‌ای را که قصد دارید دوره با این نام ثبت شود و به فروش رود وارد کنید";
const text2 = "در این قسمت، قیمت مد نظر خود را برای فروش دوره وارد کنید";
const text3 = "در این قسمت زمینه تدریس مربوط به این دوره را انتخاب نمایید";

function fakeInput(c){
    c.props.parent.setState ({

        title:"2دروه ریاضی تکمیلی",

        price:"350000",

        category: 3,

    }, c.continueCheck);
}