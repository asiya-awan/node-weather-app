// console.log('Clinet side javascipt file loaded')

// const form = document.querySelector('form');
// const searchLocation = document.querySelector('input');

// form.addEventListener('submit', (e) => {
//    e.preventDefault();

//    const place = searchLocation.value;
//    const url = `http://localhost:3000/weather?address=${place}`;
//    console.log(url);

//    fetch(url).then((response) => {
//         response.json().then((data) => {
//             debugger
//             if(data.error){
//                 console.log(data.error)
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
//     })

// })

console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent='Loading...';
messageTwo.textContent='';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error;            
            } else {
                messageOne.textContent=`Location:  ${data.location}`;
                messageTwo.textContent= `Forecast: ${data.forecast}`;
                
            }
        })
    })
})