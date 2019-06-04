window.onload = function()
{
    let getRandJokeBtn = (<HTMLElement>document.querySelector("main > button"));
    getRandJokeBtn.onclick = getRandomJoke;
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
        let response = JSON.parse(currRequest.responseText);
        let sendPara = (<HTMLInputElement>document.getElementById("joke-output"));
        sendPara.innerText = response.value.joke;
        /*
            alert(response.value.joke);
            console.log(response.value.joke);
            console.log(response.value.text);
        */
    }
}