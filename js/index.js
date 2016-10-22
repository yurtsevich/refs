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

  $("#content").on("click", ":header", function() {
    var id = $(this).attr("id");
    if (id) {
      $("#proxy_link").attr("href", "#" + id).get(0).click();
    }
  });
})();

function main_index(active_page) {
  var main_index = $("<div id='main_index'>");

  if (isPublic(active_page)) {
    main_index.append(web_ul());
    main_index.append(coding_ul());
    main_index.append(etc_ul());
    main_index.append(github());
  } else if (isSingle(active_page)) {
    // No main index for detached single pages
  } else {
    // main_index.append(private_work_ul());
    main_index.append(private_personal_ul());
  }

  main_index.find("a").each(function() {
    var link = $(this);
    if (link.text().toLowerCase() === active_page) {
      link.parent("li").addClass("active");
    }
  });

  return main_index;
}

function content() {
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

function coding_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../codingRef/index.html' title='Даведнік па тэорыі і прынцыпах праграмаваньня'>Coding</a>")));
  ul.append(new_li().append($("<a href='../javaRef/index.html' title='Даведнік па Java'>Java</a>")));
  ul.append(new_li().append($("<a href='../scalaRef/index.html' title='Даведнік па Scala'>Scala</a>")));
  ul.append(new_li().append($("<a href='../rubyRef/index.html' title='Даведнік па Ruby'>Ruby</a>")));
  ul.append(new_li().append($("<a href='../railsRef/index.html' title='Даведнік па Ruby-on-Rails'>Rails</a>")));

  return ul;
}

function etc_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../linuxRef/index.html' title='Даведнік па Linux'>Linux</a>")));
  ul.append(new_li().append($("<a href='../idesRef/index.html' title='Даведнік па асяродкам распрацоўкі'>IDEs</a>")));
  ul.append(new_li().append($("<a href='../gitRef/index.html' title='Даведнік па Git'>Git</a>")));
  ul.append(new_li().append($("<a href='../deployRef/index.html' title='Даведнік па разгортваньні праграм'>Deploy</a>")));

  return ul;
}

function private_work_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../ftsRef/index.html' title='Праект Fujitsu'>FTS</a>")));
  ul.append(new_li().append($("<a href='../tadRef/index.html' title='Праект Tandberg'>TAD</a>")));
  
  return ul;
}

function private_personal_ul() {
  var ul = new_ul();

  ul.append(new_li().append($("<a href='../chinaRef/index.html' title='Пакупкі ў Кітаі'>China</a>")));
  ul.append(new_li().append($("<a href='../ikeaRef/index.html' title='Товары в Ikea'>Ikea</a>")));
  ul.append(new_li().append($("<a href='../plantsRef/index.html' title='Plants'>Plants</a>")));

  return ul;
}

function isPublic(active_page) {
  return active_page === "html" || active_page === "css" || active_page === "web" || active_page === "js" || active_page === "ruby" || active_page === "rails" || active_page === "java" || active_page === "scala" || active_page === "coding" || active_page === "git" || active_page === "linux" || active_page === "ides" || active_page === "deploy";
}

function isSingle(active_page) {
  return active_page === "music";
}

function new_ul() {
  return $("<ul></ul>");
}

function new_li() {
  return $("<li></li>");
}

function github() {
  return $("<div class='github_link'><a href='https://github.com/yurtsevich/Manuals' title='Зыходнікі ўсіх даведнікаў на GitHub'></a></div>");
}