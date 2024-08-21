const searchBtn = document.querySelector("#search-button");
const cocktailsContainer = document.querySelector(".cocktails-container");

searchBtn.addEventListener("click", getCocktail);

function getCocktail() {
  const searchbarInput = document
    .querySelector("#searchbar")
    .value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchbarInput}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.drinks);
      let cocktailIngredients = ''
      let cocktailDescription = ''
      data.drinks.forEach((element) => {
        for (let i = 0; i <= 14; i++) {
          if (element[`strIngredient${i + 1}`] != null) {
            cocktailIngredients += element[`strIngredient${i + 1}`] + ', ';
          }

        }
        cocktailDescription += `
          <div class="cocktail-description">
              <h1>${element.strDrink}</h1>
              <img src="${element.strDrinkThumb}" alt="cocktail-image">
              <p>Ingredients: ${cocktailIngredients}</p>
          </div>
      `;
        cocktailIngredients = ''
      })
      cocktailsContainer.innerHTML = cocktailDescription

    })
    .catch((error) => {
      console.error("Fetch error", error);
    });
}

