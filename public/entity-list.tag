<entity-list>
  Entity List
  <ul class="entity-list">
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
      , sort = require('sort-on')
      , plural = require('plural')
      , riotControl = require('riotcontrol')
      , EntityStore = require("./entities/entity_store")
      , PerspectiveStore = require("./perspectives/perspective_store")
      , extend = require("./object/extend")
      , entities2 = []
      , self = this
      , input
      ;
    var months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    function main() {
      console.log("entity-list.tag|main");
      self.entities = [];
      self.perspectives = [];

      registerEvents();
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
      self.on('mount', function() {
        input = document.querySelector(".entity-list-search");
        registerAutocomplete();
      });
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
        return extend({}, entity, {perspectives: perspectives});
      });
      self.update();
    }
    function registerAutocomplete() {
      console.info("input", input);
      auto(input, function (c) {
        if (!input.value.length) return c.suggest([]);
        var matches = months.filter(function (m) {
          return lc(m.slice(0, input.value.length)) === lc(input.value);
        });
        c.suggest(matches);
      });
    }
    function lc (x) { return x.toLowerCase() }
    main();
  </script>
</entity-list>