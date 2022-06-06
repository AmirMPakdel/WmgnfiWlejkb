
export function setCookie(cname, cvalue, exdays=0, config={}){

    if(exdays){

        let d = new Date();
    
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        
        let expires = "expires=" + d.toUTCString();

        let c = cname + "=" + cvalue + ";" + expires + ";path=/";

        if(config.subdomain){
            c += ";domain="+config.subdomain+".minfo.ir";
        }
        
        document.cookie = c;

    }else{

        let c = cname + "=" + cvalue + ";path=/";

        if(config.subdomain){
            c += ";domain="+config.subdomain+".minfo.ir";
        }

        //creating session cookie
        document.cookie = c;
    }
}
    
export function getCookie(cname){

    let name = cname + "=";

    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) == " ") {

            c = c.substring(1);

        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);
        }
    }
    
    return "";
}
    
export function deleteCookie(cname){

    setCookie(cname, "", -5);
}
    
const cookie = {
    setCookie, 
    getCookie, 
    deleteCookie,
};
    
export default cookie;