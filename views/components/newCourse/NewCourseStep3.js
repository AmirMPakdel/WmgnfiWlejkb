import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./NewCourseStep3.module.css";
import SelectBox from "@/views/components/global/SelectBox";
import chest from "@/utils/chest";
import EducatorsCrudModal from "@/views/components/modal/educators/EducatorsCrudModal";
import myServer from "@/utils/myServer";

export default class NewCourseStep3 extends Component {

    state={
        selected_edu_keys :[],
        selected_edus:[],
        educators:[],
    }

    onCancelAddEducatorModal=()=>{
        chest.ModalLayout.controlModal(false);
    }

    EducatorsCrudModalConfirm=(selectedRowKeys, selectedRows)=>{
        this.setState({
            selected_edu_keys:selectedRowKeys,
            selected_edus: selectedRows,
            educators: selectedRows2Educators(selectedRows),
        }, ()=>{
            this.EducatorsCrudModalCancel();
        });
    }

    EducatorsCrudModalCancel=()=>{ 
        chest.ModalLayout.closeAndDelete(1);
    }

    onAddEducator=()=>{

        let modal = <EducatorsCrudModal 
        selectable={true} 
        selectionType={"checkbox"}
        selectedRowKeys={this.state.selected_edu_keys}
        selectedRows={this.state.selected_edus}
        onConfirm={this.EducatorsCrudModalConfirm}
        onCancel={this.EducatorsCrudModalCancel}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        });
    }

    onRemoveEducator=(obj)=>{

        console.log(obj);
        let key = obj.key;

        let new_educators = 
        this.state.educators.filter((v)=>{
            if(v.key !== key){
                return v;
            }
        });

        let {selectedRowKeys, selectedRows} = educators2SelectedRows(this.state.selected_edus, new_educators);

        this.setState({
            selected_edu_keys: selectedRowKeys,
            selected_edus: selectedRows,
            educators: new_educators,
        });
    }

    onPrevious=()=>{
        this.props.parent.setState({
            step: 2
        },()=>{
            window.scrollTo(0,0);
        })
    }

    onCreate=()=>{
        
        //create mvc later
        this.props.parent.setState({step:"loading"});

        let ps = this.props.parent.state;
        let params = {
            title: ps.title,
            price: Number(ps.price),
            is_encrypted: ps.is_encrypted,
            educators: this.state.selected_edu_keys,
            category_id: ps.category,

            //TODO:
            tags:[],
            groups:{
                g1:null,
                g2:null,
                g3:null,
            }
        }

        myServer.Post(myServer.urls.COURSE_CREATE, params, {}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("دوره مورد نظر با موفقیت ایجاد شده.", "success");

                window.location.href = "/dashboard/editCourse/"+data.data.course_id

            }else{

                chest.openNotification("DEV::"+data.result_code, "error");

                this.props.parent.setState({step:3});
            }
        });
    }
    
    render(){
        return(
        <>
        <div className={styles.con}>

            <div className={styles.sec_con}>
            
                <div className={styles.sec_title}>{"انتخاب دبیر"}</div>

                <div className={styles.info_sec1+" cpnt"}>{text1}</div>

                <SelectBox className={styles.select_box}
                data={this.state.educators}
                onAdd={this.onAddEducator}
                editable={true}
                onRemove={this.onRemoveEducator}/>

            </div>

        </div>

        <div className={styles.wrapper2}>

            <MainButton className={styles.back_btn}
            title={"مرحله قبل"}
            borderMode={true}
            onClick={this.onPrevious}/>

            <MainButton className={styles.next_btn} 
            title={"ایجاد دوره"} 
            disabled={this.state.selected_edu_keys.length===0}
            onClick={this.onCreate}/>

        </div>
        </>
        )
    }
}

const text1 = "در این قسمت مدرس(مدرسین) این دوره را مشخص کنید.";

function selectedRows2Educators(rows){

    let list = []
    rows.forEach(e=>{
        list.push({key:e.id, title:e.first_name+" "+e.last_name});
    })
    return list;
}

function educators2SelectedRows(old_selectedRows, educators){

    let selectedRowKeys = [];
    let selectedRows = [];

    educators.forEach((e, i)=>{

        old_selectedRows.forEach((e2, i2)=>{

            if(e.key === e2.key){
                selectedRows.push(e2);
                selectedRowKeys.push(e2.key);
            }
        });
    });

    return {
        selectedRowKeys,
        selectedRows,
    }
}