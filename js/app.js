//variables
const formulario = document.querySelector('#formulario');
const tweetList = document.querySelector('#lista-tweets');
let tweets = [];



//event listeners
eventListeners();


function eventListeners(){
    
    //when the user add a new tweet
    formulario.addEventListener('submit', agregarTweet);

    //when the document is ready
    
        document.addEventListener('DOMContentLoaded', () => {
        tweets= JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        createHtml();
    })

        
    
    
}



//functions

function agregarTweet(e){
    e.preventDefault();

    //text area
    const tweet= document.querySelector('#tweet').value;

    
    //validation
    if(tweet ===''){
        showError("It can not be empty");
   
        return; //evita que se siga ejecutando el código
    }

    const tweetObj= {
        id: Date.now(),
        tweet //reempleza a la opción de poner: "tweet: tweet"
    }
    //adding to the tweets array
    tweets = [... tweets, tweetObj];
    console.log(tweets);

    createHtml();
    //reboot form
    formulario.reset();
}

function showError(error){
    const errorMessage= document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    //Insert on html
    const content = document.querySelector('#contenido');
    content.appendChild(errorMessage);

    //Erase de alert message
    setTimeout(()=>{
        errorMessage.remove();
    }, 3000);
}

//Muestra el listado de Tweets

function createHtml(){
    
    cleanHtml()

    if(tweets.length>0){
        
    tweets.forEach(tweet=>{

        //adding a new erase botton
        const btnErase = document.createElement('a');
        btnErase.classList.add('borrar-tweet');
        btnErase.innerText= 'X';

        //add erase function
        btnErase.onclick=()=>{
            eraseTweet(tweet.id);
        }

        //create html
        const li= document.createElement('li');

        //adding text
        li.innerText=tweet.tweet;

        //botton assingment
        li.appendChild(btnErase);


        //inserting on the html
        tweetList.appendChild(li);
        });

    }
    sincronaceStorage();

}

//Add the new tweets to local storage
function sincronaceStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//function for erase tweet
function eraseTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    createHtml();
}

//cleaning the html

function cleanHtml(){
    while(tweetList.firstChild){
        tweetList.removeChild(tweetList.firstChild);
    }
}

