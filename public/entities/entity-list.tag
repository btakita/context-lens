<entity-list>
  Entity List
  <ul class="entity-list">
    <div class="entity-list-search-wrapper">
      <input type="text" class="entity-list-search">
    </div>
    <li each="{ entities }" onclick="{ parent.selected }" class="{ 'is-selected': isSelected }">
    <div class="list-item-wrapper">
      <span class="entity-name">{ name }</span>
      <span class="perspective-length">{ parent.perspectiveLabel(perspectives.length) }</span>
    </div>
    </li>
  </ul>

  <script>
    var AutoComplete = require("../vendor/auto-complete")
      , sort = require('sort-on')
      , plural = require('plural')
      , riotControl = require('riotcontrol')
      , EntityStore = require("./entity_store")
      , PerspectiveStore = require("../perspectives/perspective_store")
      , postEntitiesList = require("./post.entities.list")
      , extend = require("../object/extend")
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
//      riotControl.trigger("loadStore", EntityStore, PerspectiveStore);
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
      console.info("registerAutocomplete");
      new AutoComplete({
        selector: input,
        minChars: 2,
        source: function(term, suggest) {
          postEntitiesList(term, function(entities3) {
            entities2 = entities3;
            suggest(entities2.map(function(entity) {
              return entity.name;
            }));
          });
        }
      });
    }
    function lc (x) { return x.toLowerCase() }
    main();
  </script>
</entity-list>