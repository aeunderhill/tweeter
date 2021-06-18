/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//encloses entire function to make sure page is ready

$( document ).ready(function() {
  $('.error').hide()



  //loops through the tweets and adds new tweet to top

  const renderTweets = function(tweets) {
    $('.tweets-container').empty()
    for (let tweet of tweets) {
      $('.tweets-container').prepend(createTweetElement(tweet));
    };
  }



  //creates the HTML tweet to be inserted into the article

  const createTweetElement = function(tweet) {


  let tweetHTML =        
  `
  <article>
  <header>
  <div class="tweets-icons">
  <img src=${tweet.user.avatars} />
  <p>${tweet.user.name} </p>
  </div>
  <p>${tweet.user.handle} </p>

  </header>
  <div class="tweet-body">
  <p>${escape(tweet.content.text)} </p>
  </div>
  <footer>

  <div class="date-icon">
  <p>${timeago.format(tweet.created_at)}</p>
  </div>

  <div class="small-icons">
  <i class="fa fa-flag"></i>
  <i class="fa fa-retweet"></i>
  <i class="fa fa-heart"></i>
  </div>
  </footer>
  </article>
  `
  return tweetHTML;
  }


   //event loop for errors and changes page without reload

    const $form = $('#tweetForm');
    $form.submit(function (event) {
      event.preventDefault();

      let text = $('#tweet-text').val();
      if (text === "") {
        $('.error-box').text("Empty! Give us your best Tweet!")
        $('.error').show()
      } else if (text.length > 140) {
        $('.error-box').text("This tweet is tooooo looooong.")
        $('.error').show()
      } else {
      const data = $(this).serialize()
      //console.log(data);
      $.ajax({ method: 'POST', url: '/tweets', data: data }) 
      .then(function (tweet) {
        $('#tweet-text').val("") 
        $('.counter').val(140)
        $('.error').hide()
        loadTweets();
      
      })       
    };
  });

//load tweet after the event loop, also renders the tweets

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets)
      console.log('Success2: ', tweets);
    });
  }
  loadTweets();
});

//function to stop CSS in tweet body by user

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

