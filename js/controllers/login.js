import { login } from "../libs/users.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

// Si l'utilisateur est déjà connecté, on supprime le token
alredyLogged();

function alredyLogged() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        const p = document.createElement("p");
        p.innerHTML = "<br><br><br>Vous avez été déconnecté, veuillez vous reconnecter";

        return;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initLogin();

});

export async function initLogin() {
    const submitButton = document.getElementById("submit");


    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent form from submitting
            let id = {
                email: email.value,
                password: password.value
            };
            login(id);
        });
    } else {
        console.error("Le bouton de soumission avec l'ID 'submit' n'a pas été trouvé.");
    }
}







export function initlogOut() {
    const logout = document.querySelector("a.logout");
    const logIn = document.querySelector("a.logIn");
    const lien = document.querySelector(".edit");
    const bloclien = document.querySelector(".bloc-lien")
    if (logout) {
        logout.addEventListener("click", () => {
            console.log("Logout button clicked");

            // Supprimer le token de session
            localStorage.removeItem("token");

            // Rediriger vers la page d'accueil ou de connexion
            window.location.href = "index.html";

            // Afficher le bouton login et cacher le bouton logout
            logIn.classList.remove("hidden");
            logout.classList.add("hidden");

        });

    } else {
        console.error("Le bouton logout n'a pas été trouvé.");
    }

    // Logique pour cacher/montrer les boutons en fonction de l'état de connexion
    const token = localStorage.getItem("token");
    if (token) {
        // Si l'utilisateur est connecté (token présent), afficher "logout" et cacher "logIn"
        logIn.classList.add("hidden");
        logout.classList.remove("hidden");
        lien.classList.remove("hidden")
        bloclien.classList.remove("hidden")

    } else {
        // Si l'utilisateur n'est pas connecté, afficher "logIn" et cacher "logout"
        logIn.classList.remove("hidden");
        logout.classList.add("hidden");
        lien.classList.add("hidden")
        bloclien.classList.add("hidden")
    }
}





