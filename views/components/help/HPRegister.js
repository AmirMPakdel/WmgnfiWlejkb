import React, { Component } from "react";
import styles from "./HPRegister.module.css";

/**
* Props of HPRegister Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HPRegister extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new HPRegisterController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <h2>{"ثبت نام در سایت"}</h2>

                <div className={styles.text1+" bdyt fdc1"}>{text1}</div>

                <div className={styles.image_con}>
                    <img className={styles.image1} src={"/statics/help_assets/1.png"}/>
                </div>

                <div className={styles.text1+" bdyt fdc1"}>{text1}</div>

                <div className={styles.image_con}>
                    <img className={styles.image1} src={"/statics/help_assets/2.png"}/>
                </div>

                <div className={styles.text1+" bdyt fdc1"}>{text1}</div>
                
            </div>
        )
    }
}

const text1 = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."