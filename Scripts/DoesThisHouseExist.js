const autofillResults = document.querySelector('.js-autofill-results');
const userInput = document.getElementById('js-search-bar-inputs');

let autofillWords = []

for(let i = 0; i < addressList.length; i++){
    autofillWords.push(`${addressList[i].address}, ${addressList[i].city}, ${addressList[i].state} ${addressList[i].country}`);
}

userInput.onkeyup = function(){
    let result = [];
    let input = userInput.value;

    if(input.length){
        result = autofillWords.filter((keyword) =>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    renderAutofillResults(result);
}

function renderAutofillResults(result){
    const content = result.map((list)=>{
        return `<li><a href="Address-Pages/${list}.html"> ${list}</a></li>`;
    });

    autofillResults.innerHTML = "<ul>" + content.join('') + "</ul>";
}
