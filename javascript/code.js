class Result {
}
class Joke {
}
window.onload = function () {
    let getRandJokeBtn = document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;
    getRandJokeBtn.click();
};
function AlterButtonEnabledState(isDiabled, button) {
    let getJokeBtn = button;
    getJokeBtn.disabled = isDiabled;
    let loadingDiv = document.querySelector("#loaded");
    loadingDiv.classList.toggle("loading");
}
function getRandomJoke() {
    AlterButtonEnabledState(true, this);
    let request = new XMLHttpRequest();
    request.onreadystatechange = handleRequestChange;
    let url = "https://api.icndb.com/jokes/random";
    request.open("GET", url);
    request.send();
}
function handleRequestChange() {
    let currRequest = this;
    if (currRequest.readyState == 4 && currRequest.status == 200) {
        let response = JSON.parse(currRequest.responseText);
        let newJoke = response.value;
        let getRandJokeBtn = document.querySelector("main > button");
        displayJoke(newJoke);
        AlterButtonEnabledState(false, getRandJokeBtn);
    }
}
function displayJoke(currJoke) {
    let idElem = document.getElementById("joke-id");
    let jokeTextElem = document.querySelector("main > p:nth-of-type(1)");
    let categoriesElem = document.querySelector("main > p:nth-of-type(2)");
    idElem.innerText = "Id: " + currJoke.id.toString();
    jokeTextElem.innerHTML = currJoke.joke;
    categoriesElem.innerText = "Categories: " + currJoke.categories.toString();
}
