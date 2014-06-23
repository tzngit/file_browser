//jquery file browser plugin
//edited by sherlook
//2014-04-22

if(jQuery) (function($) {
  $.extend($.fn, {
    fileBrowser: function(obj, callback) {
      if(!obj ) var o = {};
      if(obj.url == undefined ) obj.url = '';
      function getPath(path_bar, nValue) {
        var str_path = "";
        var all_link = $(path_bar).find('a')
        if (nValue == -1) nValue = all_link.length;
        $(all_link).each(function() {
          if ($(this).val() <= nValue) {
            str_path += "/" + $(this).html();
          }
        });
        //console.log(str_path);
        return  str_path.replace(/[\/]ServerRoot/, "") + "/";
      }

      function updatePathBar(dir, path_bar, url) {
        $(path_bar).empty();
        var path_count = 0;
        dir.Path = 'ServerRoot' + dir.Path;
        var arr = dir.Path.split("/")
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "") {
            continue;
          }
          var a_dir = $('<a href="#"></a>').val(path_count++).html(arr[i]);
          $(a_dir).click(function() {
            $.post(url, {dir : getPath(path_bar, $(this).val())}, updateData);
          })
          $(path_bar).append(a_dir);
          $(path_bar).append(document.createTextNode('>'));
        }; 
      }
      function updateFileList(dir, path_bar, file_list_ul) {
        $(file_list_ul).empty();

        var files = dir.Files;
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var li = $('<li>');
          var alink = $('<a href="#"></a>').html(file.Name);
          if (file.IsDir) {
            alink.click(function() {
              var path = getPath(path_bar, -1) + $(this).html();
              $.post(obj.url, {dir : path}, function(data) {
                updateData(data, path_bar, file_list_ul);
              });
            })
          } else {
            alink.click(function() {
              callback(getPath(path_bar, -1) + $(this).html())
            });
          }
          li.append(alink)
          file_list_ul.append(li);
        };
      }

      function updateData(dir, path_bar, file_list) {
        dir = JSON.parse(dir);
        updatePathBar(dir, path_bar, obj.url);
        updateFileList(dir, path_bar, file_list);
      }
      
      /////////////////////////////////////////
      this.empty();
      var path_bar = $('<div id="pathbar"></div>');
      var file_list_ul = $('<ul id="filelist"></ul>');
      var file_list_div = $('<div></div>');

      this.addClass('well')
      this.append(path_bar);
      this.append(file_list_div);
      file_list_div.append(file_list_ul);

      $.post(obj.url, {dir : "/"}, function(data) {
        updateData(data, path_bar, file_list_ul);
      });
    }
  })
})(jQuery)