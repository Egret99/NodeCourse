const weatherForm = document.forms[0];
const contentDiv = document.querySelector("#content p");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    contentDiv.textContent = "Loading...\n"
    const address = e.target.address.value;

    const url = `/weather?address=${address}`;

    fetch(url).then(response => {
    response.json().then(data => {
        if(data.err) {
            contentDiv.textContent = data.err;
            return;
        }

        const {place_name, summary, temperature, precipProbability} = data;
        
        contentDiv.textContent = `${place_name} weather: ${summary} Temperature is ${temperature} degree. Probability of rain is ${precipProbability}.`;
    })
})
});


// fetch('http://localhost:3001/weather?address=!!').then(response => {
//     response.json().then(data => {
//         if(data.err) {
//             return console.log(data.err);
//         }

//         const {place_name, summary, temperature, precipProbability} = data;
//         console.log(`${place_name} weather: ${summary} Temperature is ${temperature}. Probability of rain is ${precipProbability}`)
//     })
// })