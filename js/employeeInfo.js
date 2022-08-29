const teamsURL = 'https://pcfy.redberryinternship.ge/api/teams'; 
const positionURL = 'https://pcfy.redberryinternship.ge/api/positions';

// const getTeamsSelectedText = document.querySelector('#teams')
const getTeamsSelectDiv = document.querySelector('#selectDiv')
const getPositionSelectDiv = document.querySelector('#positionDiv')

// get inputs
const allInputs = document.querySelectorAll('input');
// clicks
let clickedOnATeam = false;
let clickedOnAPosition = false;
// 

allInputs.forEach(item => {
    item.addEventListener('keydown', function() {
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
    if(localStorage.getItem('positionId')) {
        const positionClick = document.getElementById('position').onclick = function() {
            createPositionsDiv(localStorage.getItem('positionId'));
        } ;
        if(localStorage.getItem('position'))
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('positionId'))"> ${localStorage.getItem('position')}</p>`
        
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
    localStorage.setItem('positionId', team.title)
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('positionId'))">პოზიცია</p>`
    localStorage.removeItem('position')
    // click on a team list
    clickedOnATeam = false;
    if(team.title) {
        const positionClick = document.getElementById('position').onclick = function() {
            createPositionsDiv(localStorage.getItem('positionId'));
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
    getPositionSelectDiv.innerHTML = `<p id='positions' onClick = "createPositionsDiv(localStorage.getItem('positionId'))"> ${position.innerText}</p>`

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

