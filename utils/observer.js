export default class Observer{

    /**
     * @typedef {("onResize"|"onUserChange"|
     * "onSideMenuToggle")} EventName
     */
    static observers = {
        
        onResize:[],
        onUserChange:[],
        onSideMenuToggle:[],
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
    
        Observer.observers[name].forEach(func => {
            
            if(typeof func === "function"){
                func(...params);
            }
        });
    }
}