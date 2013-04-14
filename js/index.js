(function() {
  var container = $("#container"),
      index = $("<div id='index'>"),
      active_page_regexp_result = /.*\/(.+)Ref.*/.exec(document.URL),
      active_page = null;

  if (active_page_regexp_result && active_page_regexp_result.length === 2) {
    active_page = active_page_regexp_result[1];
  }

  index.append(main_index(active_page)).append(content());
  container.prepend(index);

  $("#main").on("click", ":header", function() {
    var id = $(this).attr("id");
    if (id) {
      $("#proxy_link").attr("href", "#" + id).get(0).click();
    }
  });
})();

function main_index(active_page) {
  var main_index = $("<div id='main_index'>");

  main_index.append(web_ul());
  main_index.append(ruby_rails_ul());
  main_index.append(vcs_ul());
  main_index.append(zip());
  main_index.append(github());

  main_index.find("a").each(function() {
    var link = $(this);
    if (link.text().toLowerCase() === active_page) {
      link.parent("li").addClass("active");
    }
  });

  return main_index;
}

function content() {
  var content = $("<div id='content'>"),
      content_tree = $("<ul class='tree'></ul>");

  $("#main section").each(function() {
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

  content_tree.append($("<a id='proxy_link' href='#' style='display: none;'>Proxy</a>"))

  return content.append(content_tree);
}

function web_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../htmlRef/index.html' title='Даведнік па HTML'>HTML</a>")));
  ul.append(new_li().append($("<a href='../cssRef/index.html' title='Даведнік па CSS'>CSS</a>")));
  ul.append(new_li().append($("<a href='../jsRef/index.html' title='Даведнік па JavaScript'>JS</a>")));
  ul.append(new_li().append($("<a href='../webRef/index.html' title='Распрацоўка сайтаў і сеціўных праграмаў'>Web</a>")));

  return ul;
}

function ruby_rails_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../rubyRef/index.html' title='Даведнік па Ruby'>Ruby</a>")));
  ul.append(new_li().append($("<a href='../railsRef/index.html' title='Даведнік па Ruby-on-Rails'>Rails</a>")));

  return ul;
}

function vcs_ul() {
  return new_ul().append(new_li().append($("<a href='../gitRef/index.html' title='Даведнік па Git'>Git</a>")));
}

function new_ul() {
  return $("<ul></ul>");
}

function new_li() {
  return $("<li></li>");
}

function zip() {
  return $("<div class='zip_link'><a href='../Manuals.zip' title='Архіў усіх даведнікаў адным файлам (~9 Mb)''></a></div>");
}

function github() {
  return $("<div class='github_link'><a href='https://github.com/yurtsevich/Manuals' title='Зыходнікі ўсіх даведнікаў на GitHub'></a></div>");
}