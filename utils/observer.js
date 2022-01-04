export default class Observer{

    static observers = {
        
        onResize:[],
        onUserFetched:[],
        onSideMenuToggle:[],
    }

    static add(name, func){

        Observer.observers[name].push(func);
    }

    static remove(name, func){

        Observer.observers[name].forEach((e,i) => {
            
            if(e === func){
                Observer.observers[name].splice(i, 1);
            }
        });
    }
    
    static execute(name, ...params){
    
        Observer.observers[name].forEach(func => {
            
            if(typeof func === "function"){
                func(...params);
            }
        });
    }
}