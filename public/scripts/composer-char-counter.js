$(document).ready(function() {

  $('textarea').keyup(function() {  //everytime a key is lifted
    
    let count = $(this).val().length; //returns the number of characters typed

    if (count <= 140) {
      $(this)
        .closest(".new-tweet")  //finds the node that matches, goes up DOM
        .find(".counter")  //returns the descendant element, goes down DOM
        .removeClass("negative-count") //removes the negative count function
        .text(140 - count); //returns the updated character count
    } else {
      $(this)
        .closest(".new-tweet") //finds the node that matches, goes up DOM
        .find(".counter")  //goes to the descendant of the above, goes down DOM
        .addClass("negative-count") // if below 0, adds a negative counter function
        .text(140 - count); // if the count is above 140, goes into the negatives
    }
  });
});