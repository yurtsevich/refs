(function() {
  const baseLang = urlParams.has('lang') ? urlParams.get('lang') : 'pl';
  const hideTranslation = urlParams.has('hide-translation') ? urlParams.get('hide-translation') === 'true' : false;
  const $cards = $(".flex-card");
  $cards.each((index, obj) => {
    const $obj = $(obj);
    const $parent = $obj.parent();
    const $col = $("<div class='col'></div>");
    const $card = $("<div></div>", {
      class: 'card h-100'
    });
    $col.append($card);

    const $cardBody = $("<div class='card-body'></div>");
    $card.append($cardBody);

    $cardBody.append($("<h5></h5>", {
      class: 'card-title',
      text: baseLang === 'pl' ? $obj.data('pl') : $obj.data('ru')
    }));

    $cardBody.append($("<p></p>", {
      class: hideTranslation ? 'card-text hide' : 'card-text',
      text: baseLang === 'pl' ? $obj.data('ru') : $obj.data('pl')
    }));

    if ($obj.data('link')) {
      const $link = $("<a></a>", {
        class: 'card-link',
        href: $obj.data('link'),
        target: 'blank'
      });
      $link.append($("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-link-45deg\" viewBox=\"0 0 16 16\">\n" +
          "  <path d=\"M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z\"/>\n" +
          "  <path d=\"M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z\"/>\n" +
          "</svg>"));

      $cardBody.append($link);
    }

    if ($obj.data('variants')) {
      const $cardFooter = $("<div class='card-footer'></div>");
      $card.append($cardFooter);
      $cardFooter.append($("<small></small>", {
        class: hideTranslation ? 'text-muted hide' : 'text-muted',
        text: $obj.data('variants')
      }));
    }

    $parent.append($col);
  });
  $cards.remove();
})();