const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipesDiv = document.getElementById("recipes");

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  const ingredient = searchInput.value.trim();

  if (ingredient === "") {
    alert("Введите ингредиент!");
    return;
  }

  fetch(API_URL + ingredient)
    .then((res) => res.json())
    .then((data) => {
      recipesDiv.innerHTML = "";

      if (!data.meals) {
        recipesDiv.innerHTML = "<p>Ничего не найдено 😢</p>";
        return;
      }

      data.meals.forEach((meal) => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        // Собираем список ингредиентов
        const ingredients = getIngredients(meal);

        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <pre>${ingredients}</pre>
        `;

        recipesDiv.appendChild(card);
      });
    })
    .catch(() => {
      recipesDiv.innerHTML = "<p>Ошибка загрузки данных 😢</p>";
    });
});

// Функция для сборки списка ингредиентов
function getIngredients(meal) {
  let list = "";
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") list += `- ${ing} (${measure})\n`;
  }
  return list;
}
