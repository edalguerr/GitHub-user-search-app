let buttonTheme = document.getElementById("buttonTheme");
let buttonThemeTitle = document.getElementById("buttonThemeTitle");
let buttonThemeIcon = document.getElementById("buttonThemeIcon");
let buttonSearch = document.getElementById("buttonSearch");
let searchInput = document.getElementById("searchInput");

let profileInterfaceElements = {
    avatarimage,
    profileName,
    userName,
    registrationDate,
    biography,
    repos,
    followers,
    following,
    twitter,
    website,
    company,
};

let theme;
let themes = {
    light: "LIGHT",
    dark: "DARK",
}


initTheme();
buttonTheme.addEventListener("click", changeTheme);
buttonSearch.addEventListener("click", getUser);
document.body.addEventListener("load", initInterfaceElements);


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

function initInterfaceElements() {
    profileInterfaceElements = {
        avatarimage: document.getElementById("avatarimage"),
        profileName: document.getElementById("profileName"),
        userName: document.getElementById("userName"),
        registrationDate: document.getElementById("registrationDate"),
        biography: document.getElementById("biography"),
        repos: document.getElementById("repos"),
        followers: document.getElementById("followers"),
        following: document.getElementById("following"),
        twitter: document.getElementById("twitter"),
        website: document.getElementById("website"),
        company: document.getElementById("company"),
    };

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

function getUser() {
    let user = searchInput.value;
    fetch(`https://api.github.com/users/${user}`)
        .then( response => response.json())
        .then(showDates)
        .catch((err)=>{
            alert("Estamos presentado inconveniente. Por favor intentelo de nuevo");            
        });
}

function showDates(user) {
    
    if(!(user?.login)){
        alert(`El usuario ${searchInput.value} no fué encontrado en GitHub`);
        return;
    }
    
    profileInterfaceElements.avatarimage.setAttribute("src", user.avatar_url);
    profileInterfaceElements.profileName.textContent = user.name;
    profileInterfaceElements.userName.textContent = `@${user.login}`;
    profileInterfaceElements.registrationDate.textContent = `Joined ${formattedDate(user.created_at)}`;
    profileInterfaceElements.biography.textContent = user.bio;
    profileInterfaceElements.repos.textContent = user.public_repos;
    profileInterfaceElements.followers.textContent = user.followers;
    profileInterfaceElements.following.textContent = user.following;

    checkElementContent(document.getElementById("location"), user, "location");
    checkElementContent(profileInterfaceElements.twitter, user, "twitter_username");
    checkElementContent(profileInterfaceElements.website, user, "blog");
    checkElementContent(profileInterfaceElements.company, user, "company");
}

function checkElementContent(element, user, property) {

    if((user?.[property])){
        element.textContent = user[property];
        element.parentElement.classList.remove("profile-contact__item--disabled");
        return;
    }

    element.parentElement.classList.add("profile-contact__item--disabled");
    element.textContent = "Not available";
}

function formattedDate(dateTime) {
    let date = new Date(dateTime);
    let months = [
        "JAN", 
        "FEB", 
        "MAR", 
        "ABR", 
        "MAY", 
        "JUN", 
        "JUL", 
        "AUG", 
        "SEP", 
        "OCT",
        "NOV",
        "DEC",
    ]
    
    return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}