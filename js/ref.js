(function() {
  var content = $("#content"),
      content_sections = content.find("ul.tree > li"),
      content_subsections = content_sections.find("li"),
      sections = $("article#main").find("section");

  sections.find("h1 a").waypoint(function(event, direction) {
    if (direction === "down") {
      var name = $(this).attr("name");
      activateContentSection($("ul.tree a[href='#" + name + "']").parent("li"));
    }
  }, {
    offset: "80%"
  });

  sections.waypoint(function(event, direction) {
    if (direction === "up") {
      var name = $(this).find("h1 a").attr("name");
      activateContentSection($("ul.tree a[href='#" + name + "']").parent("li"));
    }
  }, {
    offset: "bottom-in-view"
  });

  sections.find("h2 a, h3 a, h4 a").waypoint(function(event, direction) {
    if (direction === "down") {
      var name = $(this).attr("name");
      activateContentSubsection($("ul.tree a[href='#" + name + "']").parent("li"));
    }
  }, {
    offset: "60%"
  });

  sections.find("h2 a, h3 a, h4 a").waypoint(function(event, direction) {
    if (direction === "up") {
      var name = $(this).attr("name");
      activateContentSubsection($("ul.tree a[href='#" + name + "']").parent("li"));
    }
  }, {
    offset: "20%"
  });

  function activateContentSection(active_content_section) {
    if (active_content_section && !active_content_section.hasClass("section_highlight")
        && active_content_section.get(0)) {
      content_sections.removeClass("section_highlight");
      content_subsections.removeClass("subsection_highlight");
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
      content_subsections.removeClass("subsection_highlight");
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