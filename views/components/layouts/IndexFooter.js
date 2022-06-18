import IndexFooterController from "@/controllers/components/layouts/IndexFooterController";
import Observer from "@/utils/observer";
import React, { Component } from "react";
import styles from "./IndexFooter.module.css";

/**
* Props of IndexFooter Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {boolean} autoLoad
* 
* @extends {Component<Props>}
*/
export default class IndexFooter extends Component {
    
    constructor(props){
        super(props);
        this.controller = new IndexFooterController(this);
        this.state = {
            loading: true,
            social_links: [],
            contact_numbers: [],
        }
    }
    
    componentDidMount(){

        Observer.add("onFooterChange", this.loadFooter);

        // get the footer data from server
        if(this.props.autoLoad){
            this.fetchData();
        }
    }

    componentWillUnmount(){

        Observer.remove("onFooterChange", this.loadFooter);
    }

    fetchData=()=>{

        this.controller.fetchData();
    }

    loadFooter=(data)=>{

        let social_links = transforSocialMedias(data);
        let contact_numbers = transformNumbers(data);
        this.setState({loading:false, social_links, contact_numbers});
    }
    
    render(){
        
        let numbers = this.state.contact_numbers;
        let social_medias = this.state.social_links;

        return(
            <div className={styles.con+" bgw "}>

                <div className={styles.contact_numbers}>

                    {
                        numbers.length? "شماره تماس ":null
                    }

                    {
                        numbers.map((v,i,a)=>(
                            <React.Fragment key={i}>
                                <div className={styles.number}>{v}</div>
                                {
                                    i!=(a.length-1)?<div className={styles.numbers_sep}>|</div>:null
                                }
                            </React.Fragment>
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

    let numbers = [];

    let d = data.numbers;

    if(!d){return numbers};

    if(d.mobile1){
        numbers.push(d.mobile1);
    }
    if(d.mobile2){
        numbers.push(d.mobile2);
    }
    if(d.telephone1){
        numbers.push(d.telephone1);
    }
    if(d.telephone2){
        numbers.push(d.telephone2);
    }

    return numbers;
}

const transforSocialMedias=(data)=>{

    let d = data.links;

    let links = [];

    if(!d){return links};

    if(d.email){
        links.push({
            icon:"/statics/svg2/footer_email.svg",
            url:"mailto:" + d.email,
        });
    }
    if(d.instagram){
        links.push({
            icon:"/statics/svg2/footer_instagram.svg",
            url:d.instagram,
        });
    }
    if(d.linkedin){
        links.push({
            icon:"/statics/svg2/footer_linkedin.svg",
            url:d.linkedin,
        });
    }
    if(d.telegram){
        links.push({
            icon:"/statics/svg2/footer_telegram.svg",
            url:d.telegram,
        });
    }
    if(d.whatsapp){
        links.push({
            icon:"/statics/svg2/footer_whatsapp.svg",
            url: "https://wa.me/"+ d.whatsapp,
        });
    }
    return links;
}