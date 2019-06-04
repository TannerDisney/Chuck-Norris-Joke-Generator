/**
 * Represents the result from the chuck norris API
 */
class Result 
{
    type:string;
    value:Joke;
}
/**
 * Retrieves the joke from the chuck norris api.
 */
class Joke
{
    id:number;
    /**
     * The Text of the joke through the API
     */
    joke:string;
    categories:Array<string>;
}

window.onload = function()
{
    let getRandJokeBtn = (<HTMLElement>document.querySelector("main > button"));
    getRandJokeBtn.onclick = getRandomJoke;
    getRandomJoke();


    let getDate = new Date().getFullYear();
    let copywrite = document.getElementById("date");
    copywrite.innerText = getDate.toString();
}

/**
 * Gets a random joke from the ICNDB.com web service.
 */
function getRandomJoke()
{
    // Create request object
    let request = new XMLHttpRequest();

    // Everytime readyState is changed, this function is called.
    request.onreadystatechange = handleRequestChange;

    // Prepare request object
    let url = "https://api.icndb.com/jokes/random";
    request.open("GET", url);

    // Send request object
    request.send();
    
}
/**
 * Fires everytime the readyState property is changed.
 * https://www.w3schools.com/js/js_ajax_http.asp
 * 0: request not initialized 
 * 1: server connection established
 * 2: request received 
 * 3: processing request 
 * 4: request finished and response is ready
 */
function handleRequestChange()
{
    let currRequest = <XMLHttpRequest>this;
    /*
        console.log(currRequest.readyState);
        console.log(currRequest.status);
        console.log("\n");
    */

    // When Processing is done and response/data is ready.
    if(currRequest.readyState == 4 && currRequest.status == 200)
    {
        let response = <Result>JSON.parse(currRequest.responseText);
        let newJoke = response.value;
        displayJoke(newJoke);
        
        /*
            alert(response.value.joke);
            console.log(response.value.joke);
            console.log(response.value.text);
        */
    }
}
/**
 * Displays a joke on the webpage
 * @param currJoke The joke that will be displayed.
 */
function displayJoke(currJoke:Joke):void
{
    let idElem = <HTMLElement>document.getElementById("joke-id");

    let jokeTextElem = <HTMLElement>document.querySelector("main > p:nth-of-type(1)");

    let categoriesElem = <HTMLElement>document.querySelector("main > p:nth-of-type(2)");

    idElem.innerText = "Id: " + currJoke.id.toString();
    jokeTextElem.innerHTML = currJoke.joke;
    categoriesElem.innerText = "Categories: " + currJoke.categories.toString();
}