$(document).ready(function(){
  var $body = $('body');
  var $content = $('#content');
  var $fweindslist = $('#fweinds');
  var filter;
  //$body.html('');
  
  var setName = function(){
    var name;
    while (name == null || name == ''){
      name = window.prompt("Please enter a user name", "Guest");
    }
    setVisitor(name);
    $('#username').text('@'+ name +" : ");
  }
  setName();
  

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
  //display user twits only
  $('#filter-user').on('click', function(){
    event.preventDefault();
    filter = getVisitor();
    if(filter.length > 1){
      $content.children().hide();
      $content.children('[data-name="'+ filter + '"]').show();
    } else {
      alert('No twits found!');
    }
  });

  //show user list - filter button
  $('#filter').on('click', function(){
    event.preventDefault();
    $fweindslist.slideToggle();
  });

  //filter all
  $('#all').on('click', function(){
    event.preventDefault();
    if($fweindslist.is(':visible')){
      $fweindslist.slideToggle();
    }
    filter = null;
    $content.children().show();
  });

  //filter by user
  $('.user').on('click', function(){
    event.preventDefault();
    filter = $(this).text();
    $content.children().hide();
    $content.children('[data-name="'+ filter + '"]').show();
  });

  //new twit!
  $('.input').submit(function(){
    event.preventDefault();
    var newtwit = $('#twit').val();
    if(newtwit == null || newtwit == ''){
      alert('Please enter a twit');
    } else {
      writeTweet(newtwit);
      newPosts();
    }
  });

});
