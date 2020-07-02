// necessary for grid

// new WOW().init();
// grid
imageDumpDiv = $("#imageDump");
newRow = $("<div>", { class: "row" });
newColumn1 = $("<div>", { class: "col-lg-4 col-md-12 mb-4" });
newColumn2 = $("<div>", { class: "col-lg-4 col-md-12 mb-4" });
newColumn3 = $("<div>", { class: "col-lg-4 col-md-12 mb-4" });
newImage = $("<img>", { class: "img-fluid mb4" });
search = $("#search");
searchBtn = $("#searchBtn");
// block of 9 images from api
// make repeatable
// make clickable
// make searchable
let makeGrid = (index) => {
  // to search more pages add '?page=N' where n is a number of a page of results
  url = `https://api.rawg.io/api/games`;
  $.get(url).then((response) => {
    imageDumpDiv.append(newRow.append(newColumn1, newColumn2, newColumn3));
    //id is rawg.io id
    //column1

    for (let i = index; i < index + 3; i++) {
      //   $(`#${i}`).addEventListener("click", () => {
      //     console.log(response.results[i].name);
      //   });
      newImage = $("<img>", {
        class: "img-fluid mb4 wow fadeIn z-depth-1-half",
        id: `${i}`,
        src: response.results[i].background_image,
      });
      newColumn1.append(newImage);
    }
    //column2
    for (let i = index + 3; i < index + 6; i++) {
      newImage = $("<img>", {
        class: "img-fluid mb4 wow fadeIn z-depth-1-half",
        id: `${i}`,
        src: response.results[i].background_image,
      });
      newColumn2.append(newImage);
    }
    //column3
    for (let i = index + 6; i < index + 10; i++) {
      newImage = $("<img>", {
        class: "img-fluid mb4 wow fadeIn z-depth-1-half",
        id: `${i}`,

        src: response.results[i].background_image,
      });
      newColumn3.append(newImage);
    }
    console.log(response);
  });
};

// search
searchBtn.on("click", (e) => {
  e.preventDefault();
  imageDumpDiv.html = "";
  alert("working");
});
$(document).ready(() => {
  // increment by 10 to get next 10 in response... only get 20 though needto fix this

  makeGrid(0);
  makeGrid(10);
});

// $(document).ready(() => {
//   let grid = () => {
//     id = 11;
//     urlID = `https://api.rawg.io/api/games/${id}`;
//     url = `https://api.rawg.io/api/games`;
//     $.get(url).then((response) => {
//       for (let i = 0; i < 10; i++) {
//         const fixedHeight = 20;
//         newItem = $("<div>", {
//           id: `item${id}`,
//           class: "item modal-trigger",
//           height: `${fixedHeight}em`,
//           "data-target": "modal1",
//         });
//         newImage = $("<img>", { src: response.results[i].background_image });
//         $("#list").append(newItem.append(newImage));
//       }
//       console.log(response);
//     });
//   };
//   grid();
// });

// response.results[i].rating;
// response.reults[i].background_image;
// response.results[i].reviews_count;
