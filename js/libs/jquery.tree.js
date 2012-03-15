$(document).ready(function() {
  (function() {
    var tree = {
      config: {
        className: "tree",
        nodeBulletClass: "liBullet",
        nodeLinkClass: "bullet",
        nodeClosedClass: "liClosed",
        nodeOpenClass: "liOpen"
      },

      processLists: function(uls) {
        uls.children("li").each(function() {
          var config = tree.config,
              $this = $(this),
              internal_uls = $this.children("ul"),
              span = $("<span></span>", {
                text: "\u00A0"
              }).addClass(config.nodeLinkClass).prependTo($this);

          if ( internal_uls.length === 0 ) {
            $this.addClass(config.nodeBulletClass);
          } else {
            tree.processLists(internal_uls);
            if (!$this.hasClass(config.nodeOpenClass)) {
              $this.addClass(config.nodeClosedClass);
            }
            span.on("click", function() {
              var parent_li = $(this).parent("li");
              if (parent_li.hasClass(config.nodeOpenClass)) {
                parent_li.removeClass(config.nodeOpenClass).addClass(config.nodeClosedClass);
              } else {
                parent_li.removeClass(config.nodeClosedClass).addClass(config.nodeOpenClass);
              }
              return false;
            });
          }
        });
      },

      init: function(config) {
        $.extend(tree.config, config);
        tree.processLists($("ul." + tree.config.className));
      }
    }

    tree.init();
  })();
});

// Full expands a tree with a given ID
function expandTree(treeId) {
    var ul = $("#" + treeId);
    if (ul) {
    expandCollapseList(ul, nodeOpenClass);
    }
}

// Fully collapses a tree with a given ID
function collapseTree(treeId) {
    var ul = $("#" + treeId);
    if (ul) {
      expandCollapseList(ul, nodeClosedClass);
    }
}

// Expands enough nodes to expose an LI with a given ID
function expandToItem(treeId,itemId) {
    var ul = document.getElementById(treeId);
    if (ul == null) { return false; }
    var ret = expandCollapseList(ul,nodeOpenClass,itemId);
    if (ret) {
        var o = document.getElementById(itemId);
        if (o.scrollIntoView) {
            o.scrollIntoView(false);
        }
    }
}

// Performs 3 functions:
// a) Expand all nodes
// b) Collapse all nodes
// c) Expand all nodes to reach a certain ID
function expandCollapseList(ul,cName,itemId) {
    if (!ul.childNodes || ul.childNodes.length==0) { return false; }
    // Iterate LIs
    for (var itemi=0;itemi<ul.childNodes.length;itemi++) {
        var item = ul.childNodes[itemi];
        if (itemId!=null && item.id==itemId) { return true; }
        if (item.nodeName == "LI") {
            // Iterate things in this LI
            var subLists = false;
            for (var sitemi=0;sitemi<item.childNodes.length;sitemi++) {
                var sitem = item.childNodes[sitemi];
                if (sitem.nodeName=="UL") {
                    subLists = true;
                    var ret = expandCollapseList(sitem,cName,itemId);
                    if (itemId!=null && ret) {
                        item.className=cName;
                        return true;
                    }
                }
            }
            if (subLists && itemId==null) {
                item.className = cName;
            }
        }
    }
}
