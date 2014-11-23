$(document).ready(function(){
  var $body = $('body');
  var $content = $('#content');
  var $fweindslist = $('#fweinds');
  var filter;
  //$body.html('');

  var populateUsers = function(){
    for(var key in streams.users){
      $fweindslist.append('<div class="user">@' + key + '</div>');
    }
  }
  populateUsers();

  //newPosts will prepend new posts to DOM
  //ensures new posts appear at the top of list
  var newPosts = function(){
    var index = streams.home.length-1, i = 0;
    while(i !== index){
      var tweet = streams.home.splice(0, 1)[0];
      //console.log(tweet);

      if(filter != null && filter !== ('@'+tweet.user)){
        var $tweet = $('<div class="tweets" data-name="@' + tweet.user + '" style="display:none"></div>');
      } else {
        var $tweet = $('<div class="tweets" data-name="@' + tweet.user + '"></div>');
      }
      $tweet.html('@<b>' + tweet.user + '</b>: ' + tweet.message +
      "<br><br><span>posted at: " + tweet.created_at + "</span>");
      $tweet.prependTo($content);
      i++;
    }
  }
  newPosts();

  //using setInterval to check for new posts every 2 seconds
  //note: changed scheduleNextTweet to create a new post roughly every 15 seconds,
  //      too quick at 1.5 seconds, flooded page with too many new posts.
  window.setInterval(newPosts, 20000);

  //event handlers
  $('#twat').on('click', function(){
    $fweindslist.slideToggle();
  });

  $('.all').on('click', function(){
    filter = null;
    $content.children().show();
  });

  $('.user').on('click', function(){
    filter = $(this).text();
    $content.children().hide();
    $content.children('[data-name="'+ filter + '"]').show();
  });

});
