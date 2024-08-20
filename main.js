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
      //   let drinksArray = getDrinksNames(data.drinks);
      //   console.log(drinksArray);
    })
    .catch((error) => {
      console.error("Fetch error", error);
    });
}

// function getDrinksNames(array) {
//   return array.map((drink) => drink.strDrink);
// }
