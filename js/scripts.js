$(document).ready(function() {
    $("#getMessage").on("click", function(){
        getQuote();
      });

      $("#twit").on("click", function(){
        let URLI = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';
        let result = quoteREST + quoteAuth;
        let twitMsg = '';

        if (result.length > 140) {
          twitMsg = result.slice(3, 100) + "...";
         } else { 
           twitMsg = result;}

        twitMsg = twitMsg.replace(/<p>/gi, "\n");
        twitMsg = twitMsg.replace(/<\/p>/gi, "\n");
        window.open(URLI + encodeURIComponent(twitMsg));
      });
   
    function getQuote() {    
      $.ajax( { url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", dataType: 'json' , success: function(a) {
        let post = a.shift();
        quoteREST = post.content;
        quoteAuth = post.title;

        $("#quote-text").html(quoteREST);
        $("#quote-author").html(quoteAuth);
        //console.log(post);
        $(".quote").animate({
          opacity: 0
        }, 200,
        function() {
          $(this).animate({
            opacity: 1
          }, 200);

          });     
      },
        cache: false
      });  
    }; 

    getQuote();

  });