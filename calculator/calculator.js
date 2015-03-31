/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($) {
    $(window).load(function() {
        
        var total = 0;
        var operator = 1;
        var initd = false;
        
        function initPage() {
            var template =  '<div class="totalOverlay">';
            template +=         '<span class="totalTotal">';
            template +=             'Total';
            template +=         '</span>';
            template +=         '<br />';
            template +=         '<span class="totalNumber"></span>';
            template +=     '</div>';
            
            $(document.body).append(template);
            
        }
        
        function isFloat(n) {
            return n === +n && n !== (n|0);
        }
        
        function isInt(n){
            return Number(n)===n && n%1===0;
        }
        
        // events
        $(document.body).on('mouseup', function() {
            console.log(window.getSelection().toString());
            var selection = parseFloat(window.getSelection().toString());

            if(isFloat(selection) || isInt(selection)) {
                $('.totalNumber').fadeOut('fast', function() {
                    total = total + (selection * operator);
                    $('.totalNumber').text(total.toFixed(2));
                    $(this).fadeIn('fast');
                });    
            }
        });
        
        chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
            
            console.log(msg)
            console.log(sender)
            if(msg.directive === 'start') {
                if(!initd) {
                    console.log('getting started')
                    initPage();
                    sendResponse({});
                    initd = true;
                }
            }
            
            if(msg.directive === 'plus') {
                operator = 1;
                sendResponse({});
            }
            
            if(msg.directive === 'minus') {
                operator = -1;
                sendResponse({});
            }
            
            if(msg.directive == 'reset') {
                
                total = 0;
                $('.totalNumber').text('00.00');
                sendResponse({});
            }
        });
    });
})(jQuery);