let buttonTheme = document.getElementsByClassName("button-element")[0];
let buttonThemeTitle = document.getElementsByClassName("button-element__title")[0];
let buttonThemeIcon = document.getElementsByClassName("nav-item-button__icon")[0];

let theme;
let themes = {
    light: "LIGHT",
    dark: "DARK",
}


initTheme();
buttonTheme.addEventListener("click", changeTheme);


function initTheme() {

    if(localStorage.getItem("theme") || getPreferredColorScheme()){
       
        if(localStorage.getItem("theme")){
            theme = localStorage.getItem("theme");
        }else {
            theme = getPreferredColorScheme();
        }
        

        switch (theme) {
            case themes.dark:
                document.body.classList.add("theme_dark");
                SetButtonThemeContent(themes.light, "./images/icon-sun.svg");
                break;
        
            default:
                document.body.classList.remove("theme_dark");
                break;
        }

        return;
    }
    
    theme = "LIGHT";
    document.body.classList.remove("theme_dark");
}


function getPreferredColorScheme() {
    if (window.matchMedia) {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            return 'DARK';
        } else {
            return 'LIGHT';
        }
    }

    return;
}

function changeTheme() {

    document.body.classList.toggle("theme_dark");

    if(theme == themes.light){         
        theme = themes.dark;
        SetButtonThemeContent(themes.light, "./images/icon-sun.svg");
        localStorage.setItem("theme", theme);
        return;
    }
    
    theme = themes.light;
    SetButtonThemeContent(themes.dark, "./images/icon-moon.svg");
    localStorage.setItem("theme", theme);
}

function SetButtonThemeContent(theme, src) {
    buttonThemeTitle.innerText = theme;
    buttonThemeIcon.setAttribute("src", src);
}