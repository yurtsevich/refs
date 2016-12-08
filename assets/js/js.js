(function() {
    $("#end_example button").on("click", function() {
      $(this)
        .siblings()
        .removeAttr("disabled")
      .end()
      .attr("disabled", "disabled");
    });
})();

(function() {
    $("#append_example").find("p").last().append(" Трохі тэксту ў параграф.");
})();

(function() {
    $("#before_example").find("p").last().before("Трохі тэксту перад параграфам.");
})();

(function() {
    $("<p>Новы параграф.</p>").insertBefore($("#insertBefore_example").find("p").last());
})();

(function() {
  $("#insertAfter_example").find("h1").insertAfter($("#insertAfter_example").find("p").last());
})();


(function() {
    $("#on_example dd").filter(":nth-child(n+4)").addClass("hidden");
    $("#on_example dl").on("mouseenter", "dt", function() {
        $(this)
            .next()
            .slideDown(200)
                .siblings("dd")
                .slideUp(200);
    });
})();
