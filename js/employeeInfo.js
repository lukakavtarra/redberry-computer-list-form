const teamsURL = 'https://pcfy.redberryinternship.ge/api/teams'; 
const positionURL = 'https://pcfy.redberryinternship.ge/api/positions';

// georgian alphabet
const alphabet = ['ა','ბ','გ','დ','ე','ვ','ზ','თ','ი','კ','ლ','მ','ნ','ო','პ','ჟ','რ','ს','ტ','უ','ფ','ქ','ღ','ყ','შ','ჩ','ც','ძ','წ','ჭ','ხ','ჯ','ჰ']

// georgian number regex
let georgianNumberRegex = /\+995[0-9]{9}$/gm;
const number = document.querySelector('#phoneNumber');


const getTeamsSelectDiv = document.querySelector('#selectDiv');
const getPositionSelectDiv = document.querySelector('#positionDiv')
// form
const form = document.querySelector('form');
// get inputs
const allInputs = document.querySelectorAll('input');
// clicks
let clickedOnATeam = false;
let clickedOnAPosition = false;


allInputs.forEach(item => {
    item.addEventListener('keyup', function() {
        if(item.id == 'name') localStorage.setItem('name', item.value) 
        if(item.id == 'surname') localStorage.setItem('surname', item.value) 
        if(item.id == 'email') localStorage.setItem('email', item.value) 
        if(item.id == 'phoneNumber') localStorage.setItem('phoneNumber', item.value) 
    })
})

window.onload = () => {
    allInputs.forEach(item => item.value = localStorage.getItem(`${item.id}`))
    if(localStorage.getItem('teamsName')) {
        getTeamsSelectDiv.innerHTML =`<p id="teams" onClick='teamsSelect()'>${localStorage.getItem('teamsName')}</p>`
    }
    // get positions 
    if(localStorage.getItem('teamId')) {
        const positionClick = document.getElementById('position').onclick = function() {
            createPositionsDiv(localStorage.getItem('teamId'));
        } ;
        if(localStorage.getItem('position'))
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('teamId'))"> ${localStorage.getItem('position')}</p>`
        
    }

}
// get api
const getApi = async (url) => {
    return fetch(url, {
      method:'GET',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
}


// create selectable div for teams
const createTeamsDiv = (data) => {
const getTeamslistDiv = document.createElement('div');

getTeamslistDiv.id = 'teamList';
getTeamsSelectDiv.append(getTeamslistDiv);

    data.forEach(item => {
        const teamName = document.createElement('div');
        teamName.title = item.id;
        teamName.classList = 'teams';
        teamName.innerText = item.name;
        teamName.onclick = function() {
            getTeam(this);
        }
        getTeamslistDiv.append(teamName)
    })
}

const getTeam = (team) => {
    team.parentNode.innerText = '';
    localStorage.setItem('teamsName', team.innerText)
    getTeamsSelectDiv.innerHTML =`<p id="teams" onClick='teamsSelect()'>${team.innerText}</p>`;
    localStorage.setItem('teamId', team.title)
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('teamId'))">პოზიცია</p>`
    localStorage.removeItem('position')
    // click on a team list
    clickedOnATeam = false;
    if(team.title) {
        const positionClick = document.getElementById('position').onclick = function() {
            createPositionsDiv(localStorage.getItem('teamId'));
        } ;

    }
}

//get selectable positions by selected team
const createPositionsDiv = async (searchValue) => {
    if(!clickedOnAPosition){
    const positionList = await (await getApi(positionURL)).json();
    let byChosedTeam = positionList.data.filter(position => position.team_id == searchValue);  

    const getPositionListDiv = document.createElement('div');

    getPositionListDiv.id = 'positionList'
    getPositionSelectDiv.append(getPositionListDiv);

    byChosedTeam.forEach(item => {
        const positionName = document.createElement('div');
        positionName.classList = 'teams'
        positionName.innerText = item.name;
        positionName.title = item.team_id;
        positionName.onclick = function() {
            getPosition(this);
        }
        getPositionListDiv.append(positionName)

    // click on a position list
        clickedOnAPosition = true;
    })
}
}

const getPosition = (position) => {
    position.parentNode.innerText = '';
    localStorage.setItem('position', position.innerText)
    localStorage.setItem('positionId', position.title)
    console.log(position)
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('teamId'))"> ${position.innerText}</p>`

    // on select position
    clickedOnAPosition = false;
}

//get Teams data
const teamsSelect = async () => {
    if(!clickedOnATeam) {
    const teamsList = await (await getApi(teamsURL)).json();
    createTeamsDiv(teamsList.data)

    //on select team
    clickedOnATeam = true;
}
}

const submitPersonalInfo = () => {
    let formValiditytest = true;
    const getTeamsSelectedText = document.querySelector('#teams')
    allInputs.forEach(item => {
        if(item.value.length < 2) {
            showError(item,'სიმბოლოები არასაკმარისია')
            formValiditytest = false;
        }
        
        if(item.type === 'text'){
        checkGeorgian(item,item.value)
        if(!checkGeorgian(item,item.value)){
            formValiditytest = false;
        }
    }
    })
    if(getTeamsSelectedText.innerText == 'თიმი') {
        getTeamsSelectDiv.style.borderColor = 'red'
        formValiditytest = false;
    }
    
    if(getPositionSelectDiv.innerText == 'პოზიცია') {
        getPositionSelectDiv.style.borderColor = 'red'
        formValiditytest = false;
    }
    if(!number.value.replaceAll(" ","").match(georgianNumberRegex)){
        console.log(number)
        showError(number, "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს")
    }
    console.log(formValiditytest)
}
const checkGeorgian = (input, string) => {
    for (let i = 0; i < string.length; i++ ) {
        if(!alphabet.includes((string[i]))){
            showError(input, 'გამოიყენე ქართული ასოები')
            return false
        }
    }
    return true;
}
const showError = (wrongInput,errorMessage) => {
    const label = document.querySelector(`label.requirement[for=${wrongInput.title}`);
    wrongInput.style.borderColor = "red"
    label.innerText = errorMessage
    label.style.color = "red"
    
}

const testErrors = (input) => {
    console.log()
    
}