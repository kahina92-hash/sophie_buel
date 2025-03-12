
import { fetchWorks } from "../libs/works.js";


export async function initWorks() {
    window.works = await fetchWorks();
    displayWorks(window.works);
}
export function displayWorks(works) {
    const $gallery = document.querySelector(".gallery");

    // Vérifiez que la galerie existe
    if (!$gallery) {
        console.error("La galerie n'a pas été trouvée.");
        return;
    }

    // Effacez le contenu précédent de la galerie
    $gallery.innerHTML = "";

    // Parcourez chaque œuvre et ajoutez-la à la galerie
    works.forEach((work, index) => {
        if (work && work.imageUrl && work.title) {  // Vérifiez que chaque œuvre contient les données nécessaires
            let $work = workToElement(work);
            $gallery.appendChild($work);
        } else {
            console.error(`Données manquantes ou incorrectes pour l'œuvre à l'index ${index}:`, work);
        }
    });
}



export function workToElement(data) {
    if (!data || !data.imageUrl || !data.title) {
        console.error("L'image ou le titre est manquant pour cette œuvre :", data);
        return null;  // Retournez null si les données sont invalides
    }

    let $figure = document.createElement("figure");

    $figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}" /> <figcaption>${data.title}</figcaption>`;

    return $figure;
}














