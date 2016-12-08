(function() {
  $("#index").append(table_of_content());

  $("#content").on("click", ":header", function() {
    var id = $(this).attr("id");
    if (id) {
      $("#proxy_link").attr("href", "#" + id).get(0).click();
    }
  });
})();

function table_of_content() {
  var content = $("<div id='table_of_content'>"),
      content_tree = $("<ul class='tree'></ul>");

  $("#content section").each(function() {
    var section = $(this),
        last_level = 1,
        last_li = null,
        last_ul = content_tree;

    section.find(":header").each(function() {
      var h = $(this);

      if (h.attr("id")) { // Add header into content tree only if it contains id-attribute
        var level = parseInt(this.nodeName.substring(1), 10),
            li = new_li().append($("<a href='#" + h.attr("id") + "'>" + h.text() + "</a>"));

        if (h.data("content-item-open") !== undefined) {
          li.addClass("liOpen");
        }
        if (h.data("content-custom-text")) {
          li.children("a").text(h.data("content-custom-text"));
        }

        if (last_level === level) {
          last_ul.append(li);
        } else {
          var ul = null;
          if (level > last_level) {
            ul = new_ul().append(li);
            last_li.append(ul)
          } else {
            var level_diff = last_level - level;
            ul = last_ul;
            while (level_diff > 0) {
              ul = ul.parent("li").parent("ul");
              level_diff = level_diff - 1;
            }
            ul.append(li);
          }
          last_ul = ul;
        }
        last_level = level;
        last_li = li;
      }
    });
  });

  content_tree.append($("<a id='proxy_link' href='#' style='display: none;'>Proxy</a>"));

  return content.append(content_tree);
}

function new_ul() {
  return $("<ul></ul>");
}

function new_li() {
  return $("<li></li>");
}

