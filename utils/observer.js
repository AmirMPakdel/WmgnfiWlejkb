export default class Observer{

    /**
     * @typedef {("onResize"|"onUserChange"|
     * "onSideMenuToggle"|"onStudentChange"|
     * "onFooterChange")} EventName
     */
    static observers = {
        
        onResize:[],
        onUserChange:[],
        onSideMenuToggle:[],
        onStudentChange:[],
        onFooterChange:[],
    }

    /**
     * @param {EventName} name 
     * @param  {(...any)=>{}} func 
     */
    static add(name, func){

        Observer.observers[name].push(func);
    }

    /**
     * @param {EventName} name 
     * @param  {(...any)=>{}} func 
     */
    static remove(name, func){

        Observer.observers[name].forEach((e,i) => {
            
            if(e === func){
                Observer.observers[name].splice(i, 1);
            }
        });
    }
    
    /**
     * @param {EventName} name 
     * @param  {...any} params 
     */
    static execute(name, ...params){
    
        if(!Observer.observers[name]){
            console.log("No such Observer name");
            return;
        }
        
        Observer.observers[name].forEach(func => {
            
            if(typeof func === "function"){
                func(...params);
            }
        });
    }
}