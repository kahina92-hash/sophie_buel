

export async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    console.log("Données brutes reçues :", data);
    return data;
}

//function to delete work
export async function deleteWork(workId) {
    console.log("Deleting work with ID:", workId);

    const deletee = "http://localhost:5678/api/works/";
    const token = localStorage.token;

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    let response = await fetch(deletee + workId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (response.status !== 200) {
        return false
    } else {
        return true
    }
}


export async function createWork(imageFile, title, category) {
    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append("image", imageFile); // Ajouter l'image sélectionnée
    formData.append("title", title); // Ajouter le titre
    formData.append("category", category); // Ajouter la catégorie

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing or invalid.");
        return;
    }

    console.log("Token:", token);  // Vérification du token
    console.log("FormData content:", formData.get('image'), formData.get('title'), formData.get('category'));  // Vérification des données

    try {
        const url = "http://localhost:5678/api/works";
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token,  // Utilisation du token JWT
            },
            body: formData, // FormData avec l'image, le titre et la catégorie
        });

        let data = await response.json();

        if (!response.ok) {
            console.error("Upload failed:", data.message);
            return false;
        } else {
            console.log("Image uploaded successfully!");
            return {
                id: data.id,
                title,
                category,
                imageUrl: data.imageUrl  // Utiliser l'URL de l'image renvoyée par le serveur
            };
        }

    } catch (error) {
        console.error("Error occurred:", error);
    }
}

