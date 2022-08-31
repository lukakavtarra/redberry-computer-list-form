// const fileInput = document.querySelector('#imagefile')

// console.log(localStorage)
// const myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");
// myHeaders.append("0475a74591bb946b0bf47dafd7816ccb", "");

// const obj = {
// "name": localStorage.getItem('name'),
// "surname": localStorage.getItem('surname'),
// "email": localStorage.getItem('email'),
// "phone_number": localStorage.getItem('phoneNumber'),
// "team_id": localStorage.getItem('teamId'),
// "position_id": localStorage.getItem('positionId'),
// "laptop_cpu": "Intel Core i3",
// "laptop_price": "1600",
// "laptop_purchase_date": "10-10-2003",
// "laptop_state": "new",
// "laptop_cpu_threads": "128",
// "laptop_name": "HP",
// "laptop_brand_id": "1",
// "laptop_image": fileInput.files[0],
// "laptop_cpu_cores": "64",
// "laptop_ram": "34",
// "token": "0475a74591bb946b0bf47dafd7816ccb",
// "laptop_hard_drive_type": "HDD",
// }

// const postApi = () => {
// console.log(fileInput.files)
// const formdata = new FormData();
// formdata.append("name", localStorage.getItem('name'),);
// formdata.append("surname", localStorage.getItem('surname'));
// formdata.append("email", localStorage.getItem('email'));
// formdata.append("phone_number", localStorage.getItem('phoneNumber'));
// formdata.append("team_id", localStorage.getItem('teamId'));
// formdata.append("position_id", localStorage.getItem('positionId'));
// formdata.append("laptop_cpu", "Intel Core i3");
// formdata.append("laptop_price", "1600");
// formdata.append("laptop_purchase_date", "10-10-2003");
// formdata.append("laptop_state", "new");
// formdata.append("laptop_cpu_threads", "128");
// formdata.append("laptop_name", "HP");
// formdata.append("laptop_brand_id", "1");
// formdata.append("laptop_image", fileInput.files[0]);
// formdata.append("laptop_cpu_cores", "64");
// formdata.append("laptop_ram", "34");
// formdata.append("token", "0475a74591bb946b0bf47dafd7816ccb");
// formdata.append("laptop_hard_drive_type", "HDD");

// const requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: obj,
//   redirect: 'follow'
// };

// fetch("https://pcfy.redberryinternship.ge/api/laptop/create?", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }

// test regex
const postApi = () => {
let s =  '+995555702988'
let r = s.match(/\+995[0-9]{9}$/gm);
console.log(r)
}
