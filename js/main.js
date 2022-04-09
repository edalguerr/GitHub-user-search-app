let buttonTheme = document.getElementsByClassName("button-element")[0];
let buttonThemeTitle = document.getElementsByClassName("button-element__title")[0];
let buttonThemeIcon = document.getElementsByClassName("nav-item-button__icon")[0];
let themes = {
    light: "LIGHT",
    dark: "DARK",
}

let theme = "LIGHT";

buttonTheme.addEventListener("click", changeTheme);

function changeTheme() {

    document.body.classList.toggle("theme_dark");

    if(theme == themes.light){
        buttonThemeTitle.innerText = themes.light;
        buttonThemeIcon.setAttribute("src","./images/icon-sun.svg");
        theme = themes.dark;
        return;
    }

    buttonThemeTitle.innerText = themes.dark;
    buttonThemeIcon.setAttribute("src","./images/icon-moon.svg");
    theme = themes.light;
}
