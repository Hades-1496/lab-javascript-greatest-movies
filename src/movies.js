// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((x) => x.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(
    (x) => x.director == "Steven Spielberg" && x.genre.includes("Drama"),
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length < 1) return 0;
  return Number(
    (
      moviesArray.reduce((a, b) => a + (b.score || 0), 0) / moviesArray.length
    ).toFixed(2),
  );
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let drama = moviesArray.filter((x) => x.genre.includes("Drama"));
  return drama.length == 0 ? 0 : scoresAverage(drama);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
// function orderByYear(moviesArray) {
//     return [...moviesArray].sort((a,b) => {
//         if (a.year>b.year) return 1;
//         if (a.year<b.year) return -1;
//         if (a.year==b.year){
//             return a.title > b.title ? 1:-1;
//         };
//     });
//     let j = 0;
//     for(let i=0; i<moviesArray.length;i++){
//         if (ordered[i] == 0) ordered[i]= moviesArray[i];
//         if (moviesArray[i].year < ordered[i].year) {
//             j = 0;
//             while (j < ordered.length){
//                 if (moviesArray[i].year < ordered[j]){
//                     ordered.splice(j-1, 0, moviesArray[i]);
//                     break;
//                 }
//                 j++;
//             }
//         }
//         if (moviesArray[i].year > ordered[i].year) ordered.splice(i,0, moviesArray[i]);
//         if (moviesArray[i].year == ordered[i].year){
//             j=0;
//             while(j<moviesArray[i].title.length) {
//                 if (moviesArray[i].title[j] > ordered[i].title[j]) {ordered.splice(i,0,moviesArray[i]); break;}
//                 if (moviesArray[i].title[j] < ordered[i].title[j]) {ordered.splice(i-1,0, moviesArray[i]); break;}
//                 if (moviesArray[i].title[j] == ordered[i].title[j] && j == moviesArray[i].title.length-1) {ordered.splice(i-1,0, moviesArray[i]); break;}
//                 j++;
//             }
//         }
//     }
//     return ordered;
// }

function orderByYear(moviesArray) {
  return [...moviesArray].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return [...moviesArray]
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .splice(0, 20)
    .map((x) => x.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return [...moviesArray].map((x) => {
    if (typeof x.duration === "string") {
      let hours = x.duration.includes("h")
        ? Number(x.duration.slice(0, x.duration.indexOf("h")))
        : 0;
      let minutes =
        x.duration.includes("min") && x.duration.includes("h")
          ? Number(
              x.duration.slice(
                x.duration.indexOf(" "),
                x.duration.indexOf("min"),
              ),
            )
          : 0;
      if (x.duration.includes("min") && !x.duration.includes("h")) {
        minutes = Number(x.duration.slice(0, x.duration.indexOf("min")));
      }
      minutes = hours * 60 + minutes;
      return { ...x, duration: Number(minutes) };
    }
    return { ...x };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length >= 0) return null;
  let ordered = orderByYear(moviesArray);
  let year = ordered[0].year;
  let allMPY;
  let avgYear = 0;
  ordered.forEach((x) => {
    if (year != x.year) year = x.year;
    avgYear < scoresAverage(ordered.filter((x) => x.year == year))
      ? scoresAverage(ordered.filter((x) => x.year == year))
      : avgYear;
  });
  return avgYear;
}
