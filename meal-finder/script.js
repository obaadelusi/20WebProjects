const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const random = document.querySelector("#random");
const resultHeading = document.querySelector("#result-heading");
const mealsEl = document.querySelector("#meals");
const singleMealEl = document.querySelector("#single-meal");

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    //Clear single meal
    singleMealEl.innerHTML = "";

    //Get search term-
    const searchTerm = search.value;
    console.log(searchTerm);

    //Check for empty
    if (searchTerm.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                // return data;
                resultHeading.innerHTML = `<h2>Search results for: '${searchTerm}'</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no '${searchTerm}. Try again'</p>`;
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(
                            (meal) => `<div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    </div>`
                        )
                        .join("");
                }
            });
        //Clear search text
        search.value = "";
    } else {
        alert("Please enter a search term");
    }
}

//Event listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
    console.log(e);
    console.log(e.path);

    const mealInfo = mealsEl.getElementsByClassName("meal-info");
    for (let i = 0; i < mealInfo.length; i++) {
        console.log(mealInfo[i]);
    }
    // const meal = e.path.find((item) => {
    //    if (item.classList) {
    //       return item.classList.contains('meal');
    //    } else {
    //       return false;
    //    }
    // });
    // console.log(meal);

    // if (meal) {
    //    for (let i = 0; i < meal.children.length; i++) {
    //       if (mealInfoTag === 'div') {
    //          console.log(mealInfoTag);
    //       }
    //    }
    // }
});
