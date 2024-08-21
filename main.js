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
      console.log(data); //obj
      console.log(data.drinks); //array of obj
      console.log(data.drinks[0]); // 1st obj of the array

      updateCarousel(data, 0);
    })
    .catch((error) => {
      console.error("Fetch error", error);
    });
}

function getIngredients(obj, index) {
  let ingredients = "";
  for (let i = 1; i <= 15; i++) {
    const ingredient = obj.drinks[index][`strIngredient${i}`];
    if (ingredient != null && ingredient !== "") {
      ingredients += ingredient + "<br>";
    }
  }

  const cocktailDescription = `
    <span class='carousel-arrows'><i id='left-arrow' class='bx bx-left-arrow-alt'></i></span>
    <div class="cocktail-description">
      <h1>${obj.drinks[index].strDrink}</h1>
      <img src="${obj.drinks[index].strDrinkThumb}" alt="cocktail-image">
      <p><span id="ingredients">Ingredients</span><br> ${ingredients}</p>
    </div>
    <span class='carousel-arrows'><i id='right-arrow' class='bx bx-right-arrow-alt'></i></span>
  `;

  return cocktailDescription;
}

function updateCarousel(obj, index) {
  cocktailsContainer.innerHTML = getIngredients(obj, index);

  document.querySelector("#right-arrow").addEventListener("click", () => {
    if (index < obj.drinks.length - 1) {
      updateCarousel(obj, index + 1);
    }
  });

  document.querySelector("#left-arrow").addEventListener("click", () => {
    if (index > 0) {
      updateCarousel(obj, index - 1);
    }
  });
}
