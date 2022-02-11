const moment = require("jalali-moment");

const time = {
    secondsToTime,
    getCurrentShamsiDate,
    shamsi2Miladi,
}

export default time;


export function secondsToTime(seconds){

    let sec = seconds % 60;
    let min = Math.floor((seconds % 3600) / 60);
    let sec_t = sec>9?sec:`0${sec}`;
    let min_t = min>9?min:`0${min}`;
    if(seconds < 3600){
        return min_t+":"+sec_t;
    }else{
        let hour = Math.floor(seconds / 3600);
        let hour_t = hour>9?hour:`0${hour}`;
        return hour_t+":"+min_t+":"+sec_t;
    }
}

export function getCurrentShamsiDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy+"/"+mm+"/"+dd;
    return moment.from(today,"YYYY/MM/DD").locale('fa').format('YYYY/MM/DD');
}

export function shamsi2Miladi(shamsi, seperator){

    let res =  moment.from(shamsi, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');

    if(seperator){
        res = res.split("/").join(seperator);
    }

    if(res === "Invalid date"){
        return false;
    }

    return res;
}