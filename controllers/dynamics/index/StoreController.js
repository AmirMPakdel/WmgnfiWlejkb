import StoreModel from "@/models/dynamics/index/StoreModel";
import CategorySelectModel from "@/models/components/modals/global/CategorySelectModel";
import { getParamByName } from "@/utils/helpers";
import Store, { STORE_PAGE_SIZE } from "@/views/dynamics/index/Store";
import Observer from "@/utils/observer";

export default class StoreController{
    
    /**@param {Store} view*/
    constructor(view){
        this.view = view;
        this.model = new StoreModel();
    }

    loadData=()=>{

        let categorySelectModel = new CategorySelectModel();

        categorySelectModel.getCategories({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let v = this.view;

                let params = storeUrl2ApiParams();

                this.model.getCourses(params, (err, data)=>{

                    if(data.result_code === env.SC.SUCCESS){

                        let d = data.data;
                        v.setState({
                            loading: false,
                            list: d.list,
                            currentPage: params.page_count,
                            total: d.total_size,
                        });
                    }
                });
            }
        });
    }
    
    loadCourses=()=>{

        scrollTo({top:0, behavior:"smooth"});

        this.view.setState({course_loading:true});

        setTimeout(()=>{

            let params = storeUrl2ApiParams();
    
            this.model.getCourses(params, (err, data)=>{
    
                if(data.result_code === env.SC.SUCCESS){
    
                    let d = data.data;
                    this.view.setState({
                        loading: false,
                        course_loading: false,
                        list: d.list,
                        total: d.total_size,
                        currentPage: params.page_count,
                    });
                }
            });

        }, 1000);
    }

    onPageChange(page){

        let state = {page};
        pushState(state);
        Observer.execute("onUrlStateChange", {type:"page"});
    }

    onSearch(phrase){

        if(phrase === "" || !phrase){ phrase=null }
        let state = {search: phrase, page:1};
        pushState(state);
        Observer.execute("onUrlStateChange", {type:"search"});
    }

    onGroupSelect(group){

        let state = {group, page:1};
        pushState(state);
        Observer.execute("onUrlStateChange", {type:"group"});
    }

    onSortSelect(sort_mode){

        let state = {sort: sort_mode};
        pushState(state);
        Observer.execute("onUrlStateChange", {type:"sort"});
    }
}

export function pushState(state) {

    const url = new URL(window.location);

    Object.keys(state).forEach(k=>{
        if(state[k] != null){
            url.searchParams.set(k, state[k]);
        }else{
            url.searchParams.delete(k);
        }
    });
    
    window.history.pushState({}, '', url);
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
            level: group_p.length,
            id: Number(group_p[ group_p.length-1])
        }
    }

    let search_phrase = null;
    let search_p = getParamByName("search");
    if(search_p){
        search_phrase = search_p;
    }

    let chunk_count = STORE_PAGE_SIZE;

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

export function setStorePageTitle() {
    
    let title = "فروشگاه";

    document.title = title;
}