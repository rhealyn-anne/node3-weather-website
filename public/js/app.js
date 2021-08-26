console.log("Client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
///////////////FETCHING
// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

/////////////CREATING A SEARCH FORM
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From JavaScript";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  ///////////////WIRING UP THE USER INTERFACE
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=!" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );

  //   fetch("http://localhost:3000/weather?address=!" + location).then(
  //     (response) => {
  //       response.json().then((data) => {
  //         if (data.error) {
  //           console.log(data.error);
  //         } else {
  //           console.log(data.location);
  //           console.log(data.forecast);
  //         }
  //       });
  //     }
  //   );
});
