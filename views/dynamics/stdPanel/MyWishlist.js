import MyWishlistController from "@/controllers/dynamics/stdPanel/MyWishlistController";
import React, { Component } from "react";
import styles from "./MyWishlist.module.css";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import Loading from "@/views/components/global/Loading";
import EmptyList from "@/views/components/global/EmptyList";
import MainButton from "@/views/components/global/MainButton";
import myServer from "@/utils/myServer";
import Pagination from "@/views/components/global/Pagination";
import WrapperT1 from "@/views/layouts/WrapperT1";
import chest from "@/utils/chest";
import RemoveWishlistModal from "@/views/components/modal/stdPanel/RemoveWishlistModal";
import Observer from "@/utils/observer";

/**
* Props of MyWishlist Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyWishlist extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyWishlistController(this);
        this.state = {
            loading:true,
            list:[],
            pageSize:10,
            currentPage:0,
            total:0,
        }

        Observer.add("onAuthenticate", ()=>{
            this.controller.loadWishlistPage(1);
        });
    }
    
    componentDidMount(){
    }

    onChangePage=(page)=>{
        this.controller.loadWishlistPage(page);
    }
    
    render(){
        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.list_con}>
                    {
                        this.state.loading?
                        <Loading style={{minHeight:"16rem"}}/>:
                        <>
                        {
                            this.state.list.length?
                            this.state.list.map((v,i)=>(
                                <MyWishListCard key={i}
                                data={v}
                                onDelete={()=>this.onChangePage(1)}/>
                            )):
                            <EmptyList style={{minHeight:"16rem"}}/>
                        }

                        <div className={styles.pagination_con}>
                            <Pagination 
                            onPageChange={this.onChangePage}
                            currentPage={this.state.currentPage}
                            total={this.state.total}
                            pageSize={this.state.pageSize}/>
                        </div>
                        </>
                    }
                    </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}

class MyWishListCard extends Component{

    onShow=()=>{
        window.location.href = env.PATHS.COURSE+ this.props.data.id;
    }

    onRemove=()=>{
        chest.ModalLayout.setAndShowModal(1, 
        <RemoveWishlistModal data={this.props.data}
        onDelete={this.props.onDelete}/>);
    }

    render(){
        let d = this.props.data;
        return(
            <div className={styles.mcc_con+" bgw"}>

                <div className={styles.mcc_icon}
                style={{ backgroundImage:`url("${myServer.MediaFiles.publicImage(d.logo)}")`}}/>

                <div className={styles.mcc_title+" bdyt"}>{d.title}</div>

                <MainButton className={styles.mcc_show_btn}
                title={"نمایش"}
                onClick={this.onShow}/>

                <img className={styles.remove_icon+" amp_btn"}
                src={"/statics/svg/fav_card_heart.svg"}
                onClick={this.onRemove}/>

            </div>
        )
    }
}