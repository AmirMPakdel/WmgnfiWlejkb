import EditableElementCardModel from "@/models/components/editHomePage/EditableElementCardModel";
import chest from "@/utils/chest";
import EditableElementCard from "@/views/components/editHomePage/EditableElementCard";
import AskDeleteElementModal from "@/views/components/modal/editHomePage/AskDeleteElementModal";
import AddEditCourseListElementModal from "@/views/components/modal/editHomePage/AddEditCourseListElementModal";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";
import EditFooterElementModal from "@/views/components/modal/editHomePage/EditFooterElementModal";
import EditIntroElementModal from "@/views/components/modal/editHomePage/EditIntroElementModal";

export default class EditableElementCardController{
    
    /**@param {EditableElementCard} view*/
    constructor(view){
        this.view = view;
        this.model = new EditableElementCardModel();
    }

    onEdit(){

        let v = this.view;
        let modal = null;
        let d = v.props.data;
        let parent = v.props.parent;

        if(d.el_type==1){
            modal = <EditIntroElementModal data={d} parent={parent}/>
        }else if(d.el_type==2){
            modal = <EditFooterElementModal data={d} parent={parent}/>
        }else if(d.el_type==3){
            modal = <AddEditCourseListElementModal data={d} parent={parent} mode="edit"/>
        }else if(d.el_type==4){
            let footer_data = parent.state.footer;
            modal = <AddEditInfoBoxElementModal data={footer_data} parent={parent} mode="edit"/>
        }

        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
    onDelete(){
        
        let modal = <AskDeleteElementModal 
        data={this.view.props.data}
        ref={r=>this.AskDeleteElementModal=r}
        onCancel={this.onCancelDelete} 
        onConfirm={this.onConfirmDelete}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onCancelDelete=()=>{
        
        chest.ModalLayout.closeAndDelete(1);
    }

    onConfirmDelete=()=>{
        
        let v = this.view;
        let data = v.props.data;
        
        this.AskDeleteElementModal.setState({loading:true});

        let params = { element: data};

        this.model.Delete(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("آیتم موردنظر حذف شد.", "success");
                
                this.onCancelDelete();

                v.props.parent.reload();
            }

            this.AskDeleteElementModal.setState({loading:false});
        });
    }

    onToggleVisibility=()=>{

        let v = this.view;

        let type = this.view.props.data.type;
        
        if(type == "1" || type == "2"){

            chest.openNotification("شروع سایت و فوتر قابل پنهان سازی نمی باشند.", "alert");
            return;
        }

        let visible = v.props.data.visible;

        if(visible){
            this.hideElement();
        }else{
            this.showElement();
        }
    }

    showElement(){

        let v = this.view;
        
        this.changeVisiblity(true);

        let params = {
            element_id: v.props.data.id
        }

        let title = v.props.data.title;

        this.model.show(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification(
                    "آیتم "+title+" "
                    +"برای عموم قابل نمایش شد.", "success");
                
            }else{

                this.changeVisiblity(false);

                chest.openNotification("خطا در تغییر وضعیت نمایش آیتم", "error");
            }
        });
    }

    hideElement(){

        let v = this.view;
        
        this.changeVisiblity(false);

        let params = {
            element_id: v.props.data.id
        }

        let title = v.props.data.title;

        this.model.show(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification(
                    "آیتم "+title+" "
                    +"برای عموم پنهان شد.", "success");
                
            }else{

                this.changeVisiblity(true);

                chest.openNotification("خطا در تغییر وضعیت نمایش آیتم", "error");
            }
        });
    }

    changeVisiblity(visible, cb){

        let v = this.view;
        let HomePage = v.props.parent;

        let newElements = HomePage.state.elements.map((e, i)=>{
            if(e.id === v.props.data.id){
                e.visible = visible;
            }
            return e;
        });

        HomePage.setState({elements: newElements}, cb);
    }
    
}