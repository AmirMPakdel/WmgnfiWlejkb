import StoreModel from "@/models/dynamics/index/StoreModel";
import { getParamByName } from "@/utils/helpers";
import Store from "@/views/dynamics/index/Store";

export default class StoreController{
    
    /**@param {Store} view*/
    constructor(view){
        this.view = view;
        this.model = new StoreModel();
    }
    
    loadCourses=()=>{

        let v = this.view;

        v.setState({loading:true});

        let params = storeUrl2ApiParams();

        this.model.getCourses(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                console.log(data);
            }
        });
    }
    
}

export function storeUrl2ApiParams(){

    let sorting_mode = "sm_newest";
    let sort_p = getParamByName("sort");
    if(sort_p){
        sorting_mode = sort_p;
    }

    let group = null;
    let group_p = getParamByName("group");
    if(group_p){
        group_p = group_p.split("-");
        group = {
            level: group_p[0],
            id: group_p[1]
        }
    }

    let search_phrase = null;
    let search_p = getParamByName("search");
    if(search_p){
        search_phrase = search_p;
    }

    let chunk_count = 20;

    let page_count = 1;
    let page_p = getParamByName("page");
    if(page_p && !isNaN(Number(page_p))){
        page_count = Number(page_p);
    }

    return {
        filters:{
            search_phrase,
            group
        },
        sorting_mode,
        chunk_count,
        page_count,
    };
}