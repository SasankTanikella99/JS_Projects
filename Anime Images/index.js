const button_element = document.getElementById("btn");
const container_element = document.querySelector(".anime-container");
const image_element = document.querySelector(".anime-img");
const name_element = document.querySelector(".anime-name");

button_element.addEventListener("click", async function () {
  try {
    button_element.disabled = true;
    button_element.innerText = "Loading...";
    name_element.innerText = "Updating...";
    image_element.src = "Bean.svg";
    const response = await fetch("https://api.catboys.com/img");
    const data = await response.json();
    button_element.disabled = false;
    button_element.innerText = "Get Anime";
    container_element.style.display = "block";
    image_element.src = data.url;
    name_element.innerText = data.artist;
  } catch (error) {
    console.log(error);
    button_element.disabled = false;
    button_element.innerText = "Get Anime";
    name_element.innerText = " Sorry !!  try again";
  }
});

// anytime you are using await function use async function instead of normal function
// use trycatch because if the api gives error, exception handling is done.
// button gets disabled at start
// opposite of the above line 11
// it shows the container block if the button is clicked
// gives the name of the anime character because of the api
