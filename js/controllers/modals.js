
import { fetchCategories } from "../libs/categories.js";
import { createWork, deleteWork, fetchWorks } from "../libs/works.js";
import { displayCategories } from "./index.filter.js";
import { displayWorks } from "./index.works.js";



/*****************************************************fonction open Modal******************************************************* */
function openModal() {


    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    const addWorkButton = document.getElementById("add-work");
    addWorkButton.addEventListener("click", () => {
        modalSectionList.classList.add("hidden");
        modalSectionAdd.classList.remove("hidden");

        initModalUpload()

    });
    modalSectionList.classList.remove("hidden");

}
document.getElementById("add-work").addEventListener("click", () => {
    const btnValider = document.querySelector(".valider");
    console.log("je suis de retour")
    btnValider.disabled = true
    btnValider.classList.add("gris")



})
// Ajouter un écouteur pour fermer les modale
const closeModal = function (e) {
    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    const modaloverlay = document.querySelector(".modal-overlay")
    const closeModal = document.querySelectorAll(".js-modal-close");

    closeModal.forEach((element) => {
        element.addEventListener("click", () => {
            modalSectionList.classList.add("hidden");
            modalSectionAdd.classList.add("hidden");
            modaloverlay.classList.add("hidden");

        });
    });

}

function BackModal() {

    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    modalSectionAdd.classList.add("hidden")
    modalSectionList.classList.remove("hidden")
    initModalUpload()


}

//fonction principal qui decloncheles fonctions de la modale
export async function initModal() {
    const modallist = document.querySelector(".list");

    const modaloverlay = document.querySelector(".modal-overlay")
    const lienModal = document.querySelector(".edit-modale")
    lienModal.addEventListener("click", () => {


        if (modal && modaloverlay) {
            modal.classList.remove("hidden");

            modaloverlay.classList.remove("hidden");
            openModal();

        }
    });
    displayWorksModal()

    lienModal.addEventListener("click", () => {

        closeModal()

    });
    //Back to modale list
    const rowBack = document.querySelector(".js-modal-back");
    rowBack.addEventListener("click", BackModal);



};
/****************************************************gerer l affichage de la Modal********************************************************** */
export function uploadPictureModale(setImageFile) {
    const imageContainer = document.getElementById("image-container");
    const inputFile = document.querySelector('input[type="file"]');

    // Afficher tous les éléments ayant la classe 'picturelaoded'
    document.querySelectorAll(".picturelaoded").forEach((el) => {
        el.classList.remove("hidden");
    });

    // Ajouter un écouteur d'événements pour le changement de fichier
    if (!inputFile.dataset.listenerAdded) {  // Vérifier si l'écouteur a déjà été ajouté
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0]; // Sélectionner le premier fichier

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Créer un nouvel élément d'image
                    const image = document.createElement("img");
                    image.src = e.target.result;
                    image.width = 100;


                    imageContainer.innerHTML = ""; // Effacer le contenu précédent
                    imageContainer.appendChild(image); // Ajouter la nouvelle image au conteneur

                    // Masquer les éléments avec la classe 'picturelaoded'
                    document.querySelectorAll(".picturelaoded").forEach((el) => {
                        el.classList.add("hidden");
                    });

                    console.log("Selected Image:", file.name);

                    // Mettre à jour imageFile avec le fichier sélectionné
                    setImageFile(file);
                };

                // Lire le fichier comme une URL de données
                reader.readAsDataURL(file);
            } else {
                console.log("No file selected or file is invalid.");
            }
        });
        inputFile.dataset.listenerAdded = "true"; // Marquer que l'écouteur a été ajouté
    }
}
/**********************************************gerer l afigage de l image  sur la modal********************************************************************** */
async function initModalUpload() {
    let titleValue = "";
    let imageFile = null; // Réinitialiser la sélection de l'image

    const titleInput = document.getElementById("title-input");
    const categorySelect = document.getElementById("category");
    const pictureForm = document.getElementById("picture-form");
    const imageContainer = document.getElementById("image-container");
    const btnValider = document.querySelector(".valider");
    const inputFile = document.querySelector('input[type="file"]');

    // Réinitialiser les champs à vide à chaque chargement du programme
    titleInput.value = "";
    categorySelect.value = "";
    imageFile = null; // Réinitialiser imageFile à null
    let title
    let categorie
    // Passer une fonction pour mettre à jour imageFile

    uploadPictureModale((file) => {
        imageFile = file; // Mettre à jour imageFile avec le fichier sélectionné
    });

    // Assurez-vous que les éléments existent avant d'appeler checkFormCompletion
    if (!titleInput && !categorySelect && !btnValider) {

        console.error("Les éléments du formulaire ne sont pas initialisés.");
        return;
    }

    // Ajouter les écouteurs d'événements pour vérifier la complétion du formulaire
    titleInput.addEventListener("input", function () {
        title = titleInput.value
        checkFormCompletion(title);

    });

    categorySelect.addEventListener("change", function () {
        categorie = categorySelect.value
        checkFormCompletion(categorie);
    });

    // Simuler le chargement de l'image et appeler checkFormCompletion à ce moment-là
    uploadPictureModale((file) => {
        imageFile = file; // Mettre à jour imageFile lorsque l'utilisateur sélectionne une image
        checkFormCompletion(imageFile);
    });

    await displayCategoryModal(); // Afficher les catégories dans le modal

    // Mettre à jour titleValue à chaque changement de texte dans l'input title
    imageContainer.innerHTML = ""; // Effacer le contenu précédent
    titleInput.addEventListener("input", function () {
        titleValue = titleInput.value;
        checkFormCompletion()
    });

    // Réinitialiser le formulaire et gérer la soumission
    pictureForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Afficher les valeurs sélectionnées dans la console
        console.log("Selected Image:", imageFile);
        console.log("Title:", titleValue);
        console.log("Category:", categorySelect.value);

        // Vérifier si une image est sélectionnée
        if (!imageFile) {
            console.log("Image missing");
            return;
        }


        // Appeler la fonction createWork avec les valeurs sélectionnées
        const response = await createWork(imageFile, titleValue, categorySelect.value);
        const categories = await fetchCategories();  // On récupère les catégories

        if (response) {
            const newWork = response;
            console.log(newWork)


            // Mettez à jour les œuvres et affichez les nouvelles données
            window.works = window.works.concat(newWork);  // Mettez à jour la liste des œuvres globales
            displayWorksModal(window.works);
            displayWorks(window.works);

            // Filtrez les œuvres par catégorie correspondante
            window.works = await fetchWorks()
            const filteredWorks = window.works.filter((work) => {
                return work.categoryId === newWork.category;

            });

            // Mettez à jour l'affichage des catégories si nécessaire
            displayCategories(filteredWorks);

            BackModal();
        }

    });

}
// Sélection du bouton "Valider"

async function checkFormCompletion(title, categorie, imageFile, btnValider) {
    btnValider = document.querySelector(".valider");
    // categorie = displayCategoryModal()
    // for (let i = 0; i < categorie[i].length; i++) {
    //     categorie.value = categorie[i]
    // }
    // Vérifier si tous les champs sont remplis
    if (imageFile !== null && title !== "" && categorie !== "") {
        // Tous les champs sont remplis, bouton devient vert
        btnValider.classList.remove("gris");
        btnValider.classList.add("active");
        btnValider.disabled = false;
    } else {
        // Un ou plusieurs champs sont vides, bouton devient gris
        btnValider.classList.remove("active");
        btnValider.classList.add("gris");
        btnValider.disabled = true;
    }
}
// Fonction pour vérifier si tous les champs sont remplis






async function displayWorksModal() {
    const works = await fetchWorks()

    const $galleriemodal = document.querySelector(".gallerie-modal")

    $galleriemodal.innerHTML = ""
    works.forEach((work) => {
        let $el = createModalWorkElement(work)

        $galleriemodal.appendChild($el)



    })

    const tras = document.querySelectorAll(".fa-trash-can");

    tras.forEach((element) => {
        element.addEventListener("click", async (event) => {
            const workId = event.target.getAttribute("data-id");
            let result = deleteWork(workId);
            if (result) {
                window.works = await fetchWorks()
                window.works = window.works.filter((work) => {
                    return work.id !== workId
                })
                window.works.pop(result)
                displayWorksModal()
                displayWorks(window.works)
                displayWorksModal()


            }
            else {
                const errorBox = document.createElement("div");
                errorBox.className = "error-login";
                errorBox.innerHTML = "il y a une erreur ";

            }
        });
    });


}

export function createModalWorkElement(data) {

    let gallery = document.querySelector(".gallery");
    let $figure = document.createElement("figure"); //



    $figure.innerHTML = `<div class="image-container">
  <img src="${data.imageUrl}" alt="${data.title}">
  <figcaption>${data.title}</figcaption>
  <i class="fa-solid fa-trash-can delete-icon " data-id="${data.id}"></i>
</div>`;


    gallery.appendChild($figure);

    return $figure;

}


//upload category for the modal
export async function displayCategoryModal() {
    let selectValue = ""
    let categories = await fetchCategories()
    const select = document.getElementById("category");

    // Clear previous options to avoid duplication
    select.innerHTML = "";

    // Populate categories
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });

    // Initialize selectValue with the currently selected category
    selectValue = select.value;
}

