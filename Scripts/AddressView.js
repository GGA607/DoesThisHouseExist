
/*
The following section includes the javascript code for the autofill function of the search bar
*/
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
        return `<li><a href="${list}.html"> ${list}</a></li>`;
    });

    autofillResults.innerHTML = "<ul>" + content.join('') + "</ul>";
}

/*
The following section includes the javascript code for the chart.js charts
*/

const totalVotesDoughnutChart = new Chart("total-votes-doughnut-chart", {
    type: "doughnut",
    data: {
        labels: ['Exists', 'Does Not Exist', 'Exists But Isn\'t a House'],
        datasets: [{
            backgroundColor: ['#1F9B0B', '#D34646', '#F6980A'],
            data: [currentAddress.exists, currentAddress.doesNotExist, currentAddress.existsBut]
        }]
    },
    options: {
        title:{
            display: false
        },
        responsive: true
    }
    });

const date = new Date();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function votesInAMonthCounter(month, year){
    returnCount = 0;
    for(let i = 0; i < currentAddress.doesNotExistTimes.length; i++){
        if(currentAddress.doesNotExistTimes[i].month === month && currentAddress.doesNotExistTimes[i].year === year){
            returnCount++;
        }
    }
    return returnCount;
}

function calculateLastSixMonthsLabels(date){
    const returnArray = [];

    for(let i = 0; i < 6; i++){
        
        let subtractOperator = date - (5 - i);
        
        if(subtractOperator < 0){
            subtractOperator += 12;
        }
        
        returnArray.push(months[subtractOperator]);
    }
    return returnArray;
}

function calculateLastSixMonthsTotals(date){
    
    const returnArray = [];

    for(let i = 0; i < 6; i++){
        let thisMonth = date.getMonth() - (5 - i);
        let thisYear = date.getFullYear();

        console.log(`${thisMonth}, ${thisYear}`)

        if(thisMonth < 0){
            thisMonth = 12 - thisMonth;
            thisYear--;
        }

        returnArray.push(votesInAMonthCounter(thisMonth, thisYear));
        console.log(votesInAMonthCounter(thisMonth, thisYear));
    }

    return returnArray;
}

const doesNotExistHistogram = new Chart("does-not-exist-histogram", {
    type: "line",
    data: {
        labels: calculateLastSixMonthsLabels(date.getMonth()),
        datasets: [{
            backgroundColor: '#D34646',
            data: calculateLastSixMonthsTotals(date),
        }]
    },
    options: {
        title:{
            display: true,
            text: ['Does Not Exist Votes Within The Last Six Months']
        },
        responsive: true
    }
    });

/*
The following section includes the javascript code for voting
*/

const votingDiv = document.querySelector('.voting-section');
const existsButton = document.querySelector('.js-exists-button');
const notExistsButton = document.querySelector('.js-not-exists-button');
const existsButButton = document.querySelector('.js-exists-but-button');

function hasVoted(buttonType){
    if(buttonType === 'exists'){
        currentAddress.exists++;
        totalVotesDoughnutChart.data.datasets[0].data[0] = currentAddress.exists;
    }
    else if(buttonType == 'existsBut'){
        currentAddress.existsBut++;
        totalVotesDoughnutChart.data.datasets[0].data[2] = currentAddress.existsBut;
    }
    else{
        currentAddress.doesNotExist++;
        totalVotesDoughnutChart.data.datasets[0].data[1] = currentAddress.doesNotExist;
    }

    votingDiv.innerHTML = '<p class="post-vote-message">Thank you for voting</p>';
    calculateReviewCount();
    renderDetermination();
    totalVotesDoughnutChart.update();
}

existsButton.addEventListener("click", () => {
    hasVoted('exists');
});

notExistsButton.addEventListener("click", () => {
    hasVoted('doesNotexist');
});

existsButButton.addEventListener("click", () => {
    hasVoted('existsBut');
});

let determinationMessage = 'Our data suggests...';
const determination = document.querySelector('.js-determination');

//Continue Working on this
function renderDetermination(){

    if(currentAddress.exists > (currentAddress.doesNotExist + currentAddress.existsBut)){
        determinationMessage = 'According to our data, this address exists.';
    }

    determination.innerHTML = determinationMessage;
}

renderDetermination();
