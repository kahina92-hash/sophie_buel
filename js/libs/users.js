export async function login(id) {


    const alredyLoggedError = document.querySelector(".alredyLogged__error");
    const loginEmailError = document.querySelector(".loginEmail__error");
    const loginMdpError = document.querySelector(".loginMdp__error");
    // Validation de l'email
    if (!id.email) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer une addresse mail valide";
        loginEmailError.appendChild(p);
        return;
    }

    // Validation du mot de passe
    if (id.password.length < 5) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer un mot de passe valide";
        loginMdpError.appendChild(p);
        return;
    }

    // Requête de connexion
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(result => {
            if (result.error || result.message) {
                const p = document.createElement("p");
                p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
                loginMdpError.appendChild(p);
            } else if (result.token) {
                localStorage.setItem("token", result.token);
                // Afficher/masquer les éléments après la connexion




                window.location.href = "index.html"; // Rediriger après connexion
            }
        })
        .catch(error => {
            console.log(error);
        });
}

