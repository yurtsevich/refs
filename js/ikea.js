(function() {
  var ikea_costs = $(".ikea_cost");

  ikea_costs.each(function() {
    var ikea_cost_elem = $(this);
    if (ikea_cost_elem) {
      var ikea_cost = ikea_cost_elem.text();
      ikea_cost_elem.text(parseInt(ikea_cost).toLocaleString() + " RUB / ");
      $("<span></span>", {
        "text": convertRubToByr(ikea_cost) + " тыс.",
        "class": "rub_cost"
      }).insertAfter(ikea_cost_elem);
    }
  });

  function convertRubToByr(rub) {
    if (rub) {
      return Math.round(parseInt(rub, 10) * 1.2 * 0.2).toLocaleString(); // 1.2 - наценка, 0.2 - курс бел. к рос в тысячах
    } else {
      return rub;
    }
  }
})();