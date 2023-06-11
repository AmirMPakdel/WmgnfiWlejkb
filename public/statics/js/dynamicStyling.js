

var setStyleSheet = function(css){

    var sheet = document.createElement('style');

    sheet.innerHTML = css;
    
    document.body.appendChild(sheet);
}

var changeCSSVars = function(theme){

    var myroottag = document.querySelector(':root');

    theme.forEach(element => {
        
        myroottag.style.setProperty("--"+element.name, element.value);
    });
}
