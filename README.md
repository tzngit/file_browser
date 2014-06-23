file_browser
============

a simple js file browser to browse the directory in back end server

How to use
============
  just create a div in your html like this:

  <button id="browse">Browse...</button>
  <div id="fileBrowser"></div>
  
  and then add a `fileBrowser` to the Browse button like this:
  
  $('#browse').fileBrowser({url:"browseBak"}, function(fileName) {
     console.log("you selelct " + fileName);
  })
