import React, { Component } from "react";
import styles from "./IndexFooter.module.css";

/**
* Props of IndexFooter Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class IndexFooter extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        
        let numbers = transformNumbers({});
        let social_medias = transforSocialMedias({});

        return(
            <div className={styles.con+" bgw "}>

                <div className={styles.contact_numbers}>

                    {"شماره تماس "}

                    {
                        numbers.map((v,i,a)=>(
                            <>
                            <div className={styles.number} key={"num"+i}>{v}</div>
                            {
                                i!=(a.length-1)?<div key={"sep"+i} className={styles.numbers_sep}>|</div>:null
                            }
                            </>
                        ))
                    }

                </div>

                <div className={styles.social_links_con}>

                    {
                        social_medias.map((v,i)=>(
                            <a key={"soc"+i} className={styles.social_link} href={v.url}
                            target="_blank" rel="noopener noreferrer">
                                <img className={styles.social_img}
                                src={v.icon}/>
                            </a>
                        ))
                    }

                </div>

                <div className={styles.footer_minfo+" bdyt fdc2"}>
                    
                    <span>{"با"}
                    <a href="https://minfo.ir">{" مینفو "}</a>
                    {"سایتت رو به سادگی بساز و دوره‌‌هات رو بفروش."}</span>

                </div>
                
            </div>
        )
    }
}

const transformNumbers=(data)=>{

    return ["09118015081","09118015081","09118015081","09118015081"];
}

const transforSocialMedias=(data)=>{

    return [
        {
            icon:"/statics/svg2/footer_email.svg",
            url: "https://p30download.ir",
        },
        {
            icon:"/statics/svg2/footer_telegram.svg",
            url: "https://p30download.ir",
        },
        {
            icon:"/statics/svg2/footer_instagram.svg",
            url: "https://p30download.ir",
        },
        {
            icon:"/statics/svg2/footer_twitter.svg",
            url: "https://p30download.ir",
        },
        {
            icon:"/statics/svg2/footer_linkedin.svg",
            url: "https://p30download.ir",
        }
    ]
}