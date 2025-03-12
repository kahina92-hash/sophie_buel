
import { displayWorks } from "./index.works.js";


import { fetchCategories } from "../libs/categories.js";

export async function displayCategories() {

    let activeElement = null

    let $container = document.querySelector(".container");
    let tous = document.querySelector(".tous")
    let divtous = document.createElement("div")

    $container.innerHTML = ""
    divtous.textContent = "tous"
    $container.appendChild(divtous)
    divtous.addEventListener("click", function () {
        let activeElement = document.querySelector(".active")
        displayWorks(window.works)
        if (activeElement) {
            activeElement.classList.remove("active")
        }

        this.classList.add("active")
    })
    for (let i = 0; i < categories.length; i++) {

        let div = document.createElement("div");

        div.innerHTML = categories[i].name;

        div.addEventListener("click", function () {
            let activeElement = document.querySelector(".active")
            let textElement = document.querySelector(".text")
            if (activeElement) {
                activeElement.classList.remove("active");

            }
            if (textElement) {
                textElement.classList.add(".text");

            }
            this.classList.add("active")
            this.classList.remove(".text")

            displayWorks(
                window.works.filter((work) => {
                    return work.categoryId === categories[i].id
                })
            )
        });
        $container.appendChild(div)
    }


}

export async function initFilter() {
    window.categories = await fetchCategories();
    await displayCategories()


}


