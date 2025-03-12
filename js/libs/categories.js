
export async function fetchCategories() {
    const url = "http://localhost:5678/api/categories";
    const reponse = await fetch(url)
    const categorys = await reponse.json()
    return categorys

}
