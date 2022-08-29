const gteamsURL = 'https://pcfy.redberryinternship.ge/api/teams'; 
const positionURL = 'https://pcfy.redberryinternship.ge/api/positions';
const cpuURL = 'https://pcfy.redberryinternship.ge/api/cpus';
const brandsURL = 'https://pcfy.redberryinternship.ge/api/brands';

const ggetApi = async (url) => {
    return fetch(url, {
      method:'GET',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
}

window.onload = async () => {
    const teamsList = await (await ggetApi(gteamsURL)).json();
    const positionList = await (await ggetApi(positionURL)).json();
    const cpuList = await (await ggetApi(cpuURL)).json();
    const brandsList = await (await ggetApi(brandsURL)).json();
    // console.log(teamsList)
    console.log(positionList.data)
    // console.log(cpuList)
    // console.log(brandsList)
    let obj = positionList.data.filter(o => o.team_id == 1);  
    console.log(obj)
  

}
const getteams = async () => {
    const getApis = await (await ggetApi(gteamsURL)).json();
    // const shop = await getApis.json();
    console.log(getApis)
}