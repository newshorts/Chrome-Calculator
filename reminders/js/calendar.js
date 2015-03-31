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
        var logoMarkURL = chrome.extension.getURL("images/logo-mark.png");
        var template = '<div class="overlay"><div class="blackout"></div><img class="loader" src="'+imgURL+'" /></div>';
        
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
        
        var researchSites = [
            'wikipedia.org'
        ];
        
        $('body').on('click', '.overlay', function(evt) {
            removeMessage();
            removeLoader();
        });
        
        $('body').on('click', '#gridcontainer', function(evt) {
            playLoader();
            setTimeout(function() {
                addMessage('Scheduling isn\'t helping you be your best. Your ZA should do it.');
            }, 500);
        });
        
        $('body').on('click', 'div[role="button"]', function(evt) {
            if($(this).text() == 'COMPOSE') {
                playLoader();
                setTimeout(function() {
                    addMessage('Emailing isn\'t helping you be your best. Your ZA should do it.');
                }, 500);
            }
        });
        
        function init() {
            parseSites(travelSites, 'Your ZA could do this better.');
            parseSites(socialSites, 'Seriously? Your ZA does this best. Empower them.');
            parseSites(researchSites, 'You\'re terrible at doing research. Have your ZA do it.');
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
                $('.overlay').html('<div class="blackout"></div><div class="message">' + msg + '<br /><img src="'+logoMarkURL+'" /></div>');
            });
        }
        
        function removeMessage() {
            $('.message').fadeOut('fast', function() {
                $('.overlay').html('<div class="blackout"></div><img class="loader" src="'+imgURL+'" />');
            });   
        }
        
        init();
        
    });
})(jQuery);