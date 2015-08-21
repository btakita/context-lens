<entity-list>
  Entity List
  <ul class="entity-list">
    <div class="entity-stats">{ entityLabel(entities.length) }</div>
    <li each="{ entities }" onclick="{ parent.selected }" class="{ 'is-selected': isSelected }">
    <div class="list-item-wrapper">
      <span>{ name }</span>
      <span class="list-item-secondary-text">{ parent.perspectiveLabel(perspectives.length) }</span>
    </div>
    </li>
  </ul>

  <script>
    console.log("entity-list.tag");
    var sort = require('sort-on')
      , plural = require('plural')
      , riotControl = require('riotcontrol')
      , EntityStore = require("./entity_store");
    this.entities = [];

    var self = this;
    riotControl.on('moviesChanged', function (entities) {
      self.entities = sort(entities, 'name');
      self.update();
    });
    this.entityLabel = function (count) {
      return count + ' ' + plural('entity', count);
    }
    this.perspectiveLabel = function (count) {
      return count + ' ' + plural('perspective', count);
    }
    this.selected = function(e) {
      riotControl.trigger('filterPerspectives', e.item.perspectives);
      riotControl.trigger('entitySelected', e.item);
    }.bind(this);
    riotControl.trigger("load_store", EntityStore);
  </script>
</entity-list>