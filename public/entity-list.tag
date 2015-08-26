<entity-list>
  Entity List
  <ul class="entity-list">
    <div class="entity-stats">{ entityLabel(entities.length) }</div>
    <input type="text" class="entity-list-search">
    <li each="{ entities }" onclick="{ parent.selected }" class="{ 'is-selected': isSelected }">
    <div class="list-item-wrapper">
      <span class="entity-name">{ name }</span>
      <span class="perspective-length">{ parent.perspectiveLabel(perspectives.length) }</span>
    </div>
    </li>
  </ul>

  <script>
    var auto = require("autocomplete-element")
      , input = document.querySelector(".entity-list-search")
      , sort = require('sort-on')
      , plural = require('plural')
      , riotControl = require('riotcontrol')
      , EntityStore = require("./entity_store")
      , PerspectiveStore = require("./perspective_store")
      , utils = require("./utils")
      , entities2 = []
      , self = this
      ;
    function main() {
      console.log("entity-list.tag|main");
      self.entities = [];
      self.perspectives = [];

      registerEvents();
      self.entityLabel = function (count) {
        return count + ' ' + plural('entity', count);
      };
      self.perspectiveLabel = function (count) {
        return count + ' ' + plural('perspective', count);
      };
      self.selected = function(e) {
        riotControl.trigger('filterPerspectives', e.item.perspectives);
        riotControl.trigger('entitySelected', e.item);
      }.bind(self);
      riotControl.trigger("loadStore", EntityStore, PerspectiveStore);
    }
    function registerEvents() {
      riotControl.on('entitiesChanged', function (entities3) {
        console.log("entity-list.tag|on entitiesChanged");
        entities2 = sort(entities3, 'name');
        update();
      });
      riotControl.on('perspectivesChanged', function (perspectives) {
        console.log("entity-list.tag|on perspectivesChanged");
        self.perspectives = perspectives;
        update();
      });
    }
    function update() {
      console.log("entity-list.tag|update");
      self.entities = entities2.map(function(entity) {
        var perspectives = self.perspectives.filter(function(perspective) {
          return perspective.entityIds.some(function(entityId) {
            return entity.id == entityId;
          });
        });
        return utils.extend({}, entity, {perspectives: perspectives});
      });
      self.update();
    }
    main();
  </script>
</entity-list>