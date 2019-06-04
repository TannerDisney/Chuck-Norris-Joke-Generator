window.onload = function () {
    let getRandJokeBtn = document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;
    let getDate = new Date().getFullYear();
    let copywrite = document.getElementById("date");
    copywrite.innerText = getDate.toString();
};
function getRandomJoke() {
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
        let sendPara = document.getElementById("joke-output");
        sendPara.innerText = response.value.joke;
    }
}
