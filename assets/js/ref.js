(function() {
  var toc = $("#table_of_content"),
      toc_sections = toc.find("ul.tree > li"),
      toc_subsections = toc_sections.find("li"),
      content_sections = $("article#content").find("section");

  content_sections.find("h1").waypoint(function(event, direction) {
    if (direction === "down") {
      var id = $(this).attr("id");
      activateContentSection($("ul.tree a[href='#" + id + "']").parent("li"));
    }
  }, {
    offset: "80%"
  });

  content_sections.waypoint(function(event, direction) {
    if (direction === "up") {
      var id = $(this).find("h1").attr("id");
      activateContentSection($("ul.tree a[href='#" + id + "']").parent("li"));
    }
  }, {
    offset: "bottom-in-view"
  });

  content_sections.find("h2, h3, h4").waypoint(function(event, direction) {
    if (direction === "down") {
      var id = $(this).attr("id");
      activateContentSubsection($("ul.tree a[href='#" + id + "']").parent("li"));
    }
  }, {
    offset: "60%"
  });

  content_sections.find("h2, h3, h4").waypoint(function(event, direction) {
    if (direction === "up") {
      var id = $(this).attr("id");
      activateContentSubsection($("ul.tree a[href='#" + id + "']").parent("li"));
    }
  }, {
    offset: "20%"
  });

  function activateContentSection(active_content_section) {
    if (active_content_section && !active_content_section.hasClass("section_highlight")
        && active_content_section.get(0)) {
      toc_sections.removeClass("section_highlight");
      toc_subsections.removeClass("subsection_highlight");
      active_content_section.addClass("section_highlight");
      if (!isScrolledIntoView(active_content_section)) {
        if (active_content_section.position().top < 0) {
          active_content_section.get(0).scrollIntoView();
        } else {
          active_content_section.get(0).scrollIntoView(false);
        }
      }
    }
  }

  function activateContentSubsection(active_content_subsection) {
    if (active_content_subsection && !active_content_subsection.hasClass("subsection_highlight")
        && active_content_subsection.parents("li").hasClass("section_highlight")
        && active_content_subsection.get(0)) {
      toc_subsections.removeClass("subsection_highlight");
      active_content_subsection.addClass("subsection_highlight");
      if (!isScrolledIntoView(active_content_subsection)) {
        if (active_content_subsection.position().top < 0) {
          active_content_subsection.get(0).scrollIntoView();
        } else {
          active_content_subsection.get(0).scrollIntoView(false);
        }
      }
      setTimeout(function() {
        if (active_content_subsection.hasClass("subsection_highlight")) {
          active_content_subsection.parents("li.liClosed").removeClass("liClosed").addClass("liOpen");
        }
      }, 500);
    }
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

})();