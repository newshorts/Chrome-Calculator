/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($) {
    $(window).load(function() {
        // look for a calendar event and remind the user with a popup
        var w = $(this).width(),
            h = $(this).height();
            
        var appended = false;
        var playing = false;
        
        var imgURL = chrome.extension.getURL("images/loader.png");
        var template = '<div class="overlay"><div class="blackout"></div><img src="'+imgURL+'" /></div>';
        
        var loc = window.location.href;
        
        var travelSites = [
            "orbitz.com", 
            "expedia.com", 
            "travelocity.com"
        ];
        
        var socialSites = [
            'facebook.com',
            'twitter.com',
            'instagram.com',
            'vine.co',
            'linkedin.com'
        ];
        
        $('body').on('click', '.overlay', function(evt) {
            removeMessage();
            removeLoader();
        });
        
        $('body').on('click', '#gridcontainer', function(evt) {
            playLoader();
            setTimeout(function() {
                addMessage('Your schedule is something you can delegate.');
            }, 500);
        });
        
        $('body').on('click', 'div[role="button"]', function(evt) {
            if($(this).text() == 'COMPOSE') {
                playLoader();
                setTimeout(function() {
                    addMessage('Sending an email is something you can delegate.');
                }, 500);
            }
        });
        
        function init() {
            parseSites(travelSites, 'Booking travel is something you can delegate.');
            parseSites(socialSites, 'Posting to social media is something you can delegate.');
        }
        
        function parseSites(sites, msg) {
            for(var i = 0; i < sites.length; i++) {
                if(loc.search(sites[i]) > -1) {
                    // we are on a travel site
                    playLoader();
                    setTimeout(function() {
                        addMessage(msg);
                    }, 500);
                    return;
                }
            }
        }
        
        function playLoader() {
            playing = true;
            if(!appended) {
                $('body').append(template);
                $('.overlay').css({
                    width: w+'px',
                    height: h + 'px',
                    display: 'none'
                });
                appended = true;
            }
            
            $('.overlay').fadeIn('slow', function() {
                console.log('played');
            });
            
        }
        
        function removeLoader() {
            $('.overlay').fadeOut('slow', function() {
                console.log('done');
                playing = false;
            });
        }
        
        function addMessage(msg) {
            $('.overlay img').fadeOut('fast', function() {
                $('.overlay').html('<div class="blackout"></div><div class="message">' + msg + '</div>');
            });
        }
        
        function removeMessage() {
            $('.message').fadeOut('fast', function() {
                $('.overlay').html('<div class="blackout"></div><img src="'+imgURL+'" />');
            });   
        }
        
        init();
        
    });
})(jQuery);