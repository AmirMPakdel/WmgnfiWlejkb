import CourseLicenseModel from "@/models/components/modals/stdPanel/CourseLicenseModel";
import chest from "@/utils/chest";
import CourseLicenseModal from "@/views/components/modal/stdPanel/CourseLicenseModal";

export default class CourseLicenseController{
    
    /**@param {CourseLicenseModal} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseLicenseModel();
    }
    
    loadLicenseData(){
        
        let v = this.view;

        v.setState({loading: true});

        let params = {
            course_id: v.props.data.id
        }

        this.model.getLicenseData(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                v.setState({
                    loading: false,
                    license: d.key,
                    device_one: d.device_one,
                    device_two: d.device_two,
                });
            }
        });
    }

    copyCode(){

        let text = this.view.state.license;

        copyTextToClipboard(text);
    }

    onCancel(){

        chest.ModalLayout.visibleToggle(1, false);
    }
    
}

function fallbackCopyTextToClipboard(text) {
    
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        chest.openNotification("کد خرید دوره در کلیپ بورد کپی شد.", "success");
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });

}
