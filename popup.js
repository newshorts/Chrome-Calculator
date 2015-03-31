console.log('popup.js loaded')

// send a message to the content script to get started
var tab;

// helpers
function start() {
    console.log('starting')
    chrome.tabs.sendMessage(tab, {directive: "start"}, function(response) {
        console.log(response);
//        window.close();
    });
}

function plus() {
    console.log('plus clicked')
    chrome.tabs.sendMessage(tab, {directive: "plus"}, function(response) {
        console.log(response);
//        window.close();
    });
}

function minus() {
    console.log('minus clicked')
    chrome.tabs.sendMessage(tab, {directive: "minus"}, function(response) {
        console.log(response);
//        window.close();
    });
}

function reset() {
    console.log('reset clicked')
    chrome.tabs.sendMessage(tab, {directive: "reset"}, function(response) {
        console.log(response);
//        window.close();
    });
}

// get tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    tab = tabs[0].id;
    start();
    
    document.getElementById('plus').onclick = plus;
    document.getElementById('minus').onclick = minus;
    document.getElementById('reset').onclick = reset;
});

// click events
//document.getElementById('plus').addEventListener('click', plus);
//document.getElementById('minus').addEventListener('click', minus);
//document.getElementById('reset').addEventListener('click', reset);



