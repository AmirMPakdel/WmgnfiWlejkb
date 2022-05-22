import chest from "@/utils/chest";
import { setCookie } from "@/utils/cookie";
import myServer from "@/utils/myServer";
import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
import TextInput from "@/views/components/global/TextInput";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./SelectSite.module.css";

/**
* Props of SelectSite Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SelectSite extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new SelectSiteController(this);
        this.state = {
            loading:false,
            subdomain:"",
        }
    }
    
    componentDidMount(){
        this.input.input.focus();
    }

    invalidSubdomain=()=>{
        chest.openNotification("سایت وارد شده موجود نیست.", "alert");
    }

    onCheckAndGo=()=>{

        if(this.state.subdomain.length < 3){
            this.invalidSubdomain();
            return;
        }

        this.setState({loading:true});

        myServer.Get(myServer.urls.MINFO_REGISTER_CHECK_TENANT+"/"+this.state.subdomain, {hideError:1}, (err, data)=>{

            if(!err){
                
                if(data.result_code === env.SC.REPETITIVE_USERNAME){
                    setCookie(env.TENANT_KEY, this.state.subdomain, 365);
                    window.location.href = env.PATHS.HOMEPAGE;
                }else{
                    this.invalidSubdomain();
                }
            }

            this.setState({loading:false});
        });
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.wrapper}>

                    <div className={styles.title}>
                        {"نام سایت موردنظر خود را به انگلیسی وارد نمایید."}
                    </div>

                    <TextInput
                    className={styles.textInput}
                    inputClassName={styles.input}
                    ref={r=>this.input=r}
                    placeholder="نام سایت"
                    value={this.state.subdomain}
                    inputFilter={InputFilter.tenantInputFilter}
                    OnEnterKeyPressed={this.onCheckAndGo}
                    onChange={(t)=>this.setState({subdomain:t})}/>

                    <MainButton 
                    className={styles.go_btn}
                    onClick={this.onCheckAndGo}
                    title={"ورود"}
                    loading={this.state.loading}/>

                </div>

            </div>
        )
    }
}