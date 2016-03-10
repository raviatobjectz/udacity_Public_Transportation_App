!function(e,t,n){"use strict";function o(){function e(e){e.addClass("md-body")}return{compile:e,restrict:"A"}}function i(){function e(e){var t=e.find("md-select");return t.length&&t.addClass("md-table-select").attr("md-container-class","md-table-select"),e.addClass("md-cell"),n}function t(){}function n(e,t,n,o){function i(){return c.$$columns[r()]}function r(){return Array.prototype.indexOf.call(t.parent().children(),t[0])}var a=t.find("md-select"),l=o.shift(),c=o.shift();n.ngClick&&t.addClass("md-clickable"),a.length&&(a.on("click",function(e){e.stopPropagation()}),t.addClass("md-clickable").on("click",function(e){e.stopPropagation(),a[0].click()})),l.getTable=c.getElement,e.$watch(i,function(e){e&&(e.numeric?t.addClass("md-numeric"):t.removeClass("md-numeric"))})}return{controller:t,compile:e,require:["mdCell","^^mdTable"],restrict:"A"}}function r(e){function n(e){return e.addClass("md-column"),o}function o(n,o,i,r){function a(){var i=t.element('<md-icon md-svg-icon="arrow-up.svg">');e(i.addClass("md-sort-icon").attr("ng-class","getDirection()"))(n),o.hasClass("md-numeric")?o.prepend(i):o.append(i)}function l(){Array.prototype.some.call(o.find("md-icon"),function(e){return e.classList.contains("md-sort-icon")&&o[0].removeChild(e)})}function c(){l(),o.removeClass("md-sort").off("click",g)}function s(){a(),o.addClass("md-sort").on("click",g)}function d(){return Array.prototype.indexOf.call(o.parent().children(),o[0])}function u(){return n.orderBy?f.order===n.orderBy||f.order==="-"+n.orderBy:!1}function m(){return i.hasOwnProperty("mdNumeric")&&""===i.mdNumeric?!0:n.numeric}function g(){n.$applyAsync(function(){u()?f.order="md-asc"===n.getDirection()?"-"+n.orderBy:n.orderBy:f.order="md-asc"===n.getDirection()?n.orderBy:"-"+n.orderBy,t.isFunction(f.onReorder)&&f.onReorder(f.order)})}function p(e,t){h.$$columns[e]=t,t.numeric?o.addClass("md-numeric"):o.removeClass("md-numeric")}var f=r.shift(),h=r.shift();n.getDirection=function(){return u()?f.order==="-"+n.orderBy?"md-desc":"md-asc":i.hasOwnProperty("mdDesc")?"md-desc":"md-asc"},n.$watch(u,function(e){e?o.addClass("md-active"):o.removeClass("md-active")}),n.$watch(d,function(e){p(e,{numeric:m()})}),n.$watch(m,function(e){p(d(),{numeric:e})}),n.$watch("orderBy",function(e){e?s():c()})}return{compile:n,require:["^^mdHead","^^mdTable"],restrict:"A",scope:{numeric:"=?mdNumeric",orderBy:"@?mdOrderBy"}}}function a(e){return function(n,o,i,r){if(i&&"object"==typeof i){var a=e(n,o,!0,r);return t.extend(a.instance,i),a()}return e(n,o,i,r)}}function l(e,n,o,i,r,a,l,c,s){function d(n,o){var r,l=a.$new(),c=e(n)(l),s=i.createBackdrop(l,"md-edit-dialog-backdrop");return o.controller?r=m(o,l,{$element:c,$scope:l}):t.extend(l,o.scope),o.disableScroll&&u(c),y.prepend(s).append(c.addClass("md-whiteframe-1dp")),v(c,o.target),o.focusOnOpen&&h(c),o.clickOutsideToClose&&s.on("click",function(){c.remove()}),o.escToClose&&f(c),c.on("$destroy",function(){w=!1,s.remove()}),r}function u(e){var t=i.disableScrollAround(e,y);e.on("$destroy",function(){t()})}function m(e,o,i){return e.controller?(e.resolve&&t.extend(i,e.resolve),e.locals&&t.extend(i,e.locals),e.controllerAs?(o[e.controllerAs]={},e.bindToController?t.extend(o[e.controllerAs],e.scope):t.extend(o,e.scope)):t.extend(o,e.scope),e.bindToController?n(e.controller,i,o[e.controllerAs]):n(e.controller,i)):void 0}function g(e){return r(function(n,o){function i(e){o("Unexpected template value. Expected a string; received a "+e+".")}var r=e.template;if(r)return t.isString(r)?n(r):i(typeof r);if(e.templateUrl){if(r=l.get(e.templateUrl))return n(r);var a=function(e){return n(e)},s=function(){return o("Error retrieving template from URL.")};return c(e.templateUrl).then(a,s)}o("Template not provided.")})}function p(e){w=!1,console.error(e)}function f(e){var t=function(t){t.keyCode===b&&e.remove()};y.on("keyup",t),e.on("$destroy",function(){y.off("keyup",t)})}function h(e){i.nextTick(function(){var t=i.findFocusTarget(e);t&&t.focus()},!1)}function v(e,n){var o=t.element(n).controller("mdCell").getTable(),i=function(){return e.prop("clientHeight")},r=function(){return{width:c(),height:i()}},l=function(){var e=o.parent();return"MD-TABLE-CONTAINER"===e.prop("tagName")?e[0].getBoundingClientRect():o[0].getBoundingClientRect()},c=function(){return e.prop("clientWidth")},d=function(){var t=r(),o=n.getBoundingClientRect(),i=l();t.width>i.right-o.left?e.css("left",i.right-t.width+"px"):e.css("left",o.left+"px"),t.height>i.bottom-o.top?e.css("top",i.bottom-t.height+"px"):e.css("top",o.top+1+"px"),e.css("minWidth",o.width+"px")},u=a.$watch(c,d),m=a.$watch(i,d);s.addEventListener("resize",d),e.on("$destroy",function(){u(),m(),s.removeEventListener("resize",d)})}function $(e,n){function o(){var e='type="'+(n.type||"text")+'"';for(var t in n.validators)e+=" "+t+'="'+n.validators[t]+'"';return e}return{controller:["$element","$q","save","$scope",function(e,n,o,i){function r(){return i.editDialog.$invalid?n.reject():t.isFunction(o)?n.when(o(i.editDialog.input)):n.resolve()}this.dismiss=function(){e.remove()},this.getInput=function(){return i.editDialog.input},i.dismiss=this.dismiss,i.submit=function(){r().then(function(){i.dismiss()})}}],locals:{save:n.save},scope:{cancel:n.cancel||"Cancel",messages:n.messages,model:n.modelValue,ok:n.ok||"Save",placeholder:n.placeholder,title:n.title,size:e},template:'<md-edit-dialog><div layout="column" class="md-content"><div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div><form name="editDialog" layout="column" ng-submit="submit(model)"><md-input-container md-no-float><input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "'+o()+'><div ng-messages="editDialog.input.$error"><div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div></div></md-input-container></form></div><div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions"><md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button><md-button class="md-primary" ng-click="submit()">{{ok}}</md-button></div></md-edit-dialog>'}}var b=27,w=!1,y=t.element(o.prop("body")),C={clickOutsideToClose:!0,disableScroll:!0,escToClose:!0,focusOnOpen:!0};return this.show=function(e){if(w)return r.reject();if(w=!0,e=t.extend({},C,e),!e.targetEvent)return p("options.targetEvent is required to align the dialog with the table cell.");if(!e.targetEvent.currentTarget.classList.contains("md-cell"))return p("The event target must be a table cell.");if(e.bindToController&&!e.controllerAs)return p("You must define options.controllerAs when options.bindToController is true.");e.target=e.targetEvent.currentTarget;var n=g(e),o=[n];for(var i in e.resolve)n=e.resolve[i],o.push(r.when(t.isFunction(n)?n():n));return n=r.all(o),n["catch"](p),n.then(function(t){var n=t.shift();for(var o in e.resolve)e.resolve[o]=t.shift();return d(n,e)})},this.small=function(e){return this.show(t.extend({},e,$("small",e)))}.bind(this),this.large=function(e){return this.show(t.extend({},e,$("large",e)))}.bind(this),this}function c(){function e(e){e.addClass("md-foot")}return{compile:e,restrict:"A"}}function s(e){function n(e){return e.addClass("md-head"),i}function o(){}function i(n,o,i,r){function a(){for(var e=o.children(),t=0;t<e.length-1;t++)e.eq(t).prepend('<th class="md-column">');e.eq(e.length-1).prepend(l())}function l(){var o=t.element("<md-checkbox>");return o.attr("aria-label","Select All"),o.attr("ng-click","toggleAll()"),o.attr("ng-checked","allSelected()"),t.element('<th class="md-column md-checkbox-column">').append(e(o)(n))}function c(){return r.$$rowSelect}function s(e){return t.element(e).controller("mdSelect")}function d(){var e=o.children(),t=e.eq(e.length-1);Array.prototype.some.call(t.prop("cells"),function(e){return e.classList.contains("md-checkbox-column")&&t[0].removeChild(e)})}n.allSelected=function(){var e=r.getBodyRows();return e.length&&e.map(s).every(function(e){return e&&e.isSelected()})},n.selectAll=function(){r.getBodyRows().map(s).forEach(function(e){e&&!e.isSelected()&&e.select()})},n.toggleAll=function(){return n.allSelected()?n.unSelectAll():n.selectAll()},n.unSelectAll=function(){r.getBodyRows().map(s).forEach(function(e){e&&e.isSelected()&&e.deselect()})},n.$watch(c,function(e){e?a():d()})}return{bindToController:!0,compile:n,controller:o,controllerAs:"$mdHead",require:"^^mdTable",restrict:"A",scope:{order:"=?mdOrder",onReorder:"=?mdOnReorder"}}}function d(){function e(e){return e.addClass("md-row"),n}function n(e,n,o,i){function r(){return i.$$rowSelect}function a(){return-1!==i.getBodyRows().indexOf(n[0])}function l(e){return e.parent()[0]===n[0]}if(a()){var c=t.element('<td class="md-cell">');e.$watch(r,function(e){return e&&!o.mdSelect?void(l(c)||n.prepend(c)):void(l(c)&&c.remove())})}}return{compile:e,require:"^^mdTable",restrict:"A"}}function u(e){function n(){}function o(n,o,i,r){function a(){return i.hasOwnProperty("mdAutoSelect")&&""===i.mdAutoSelect?!0:g.autoSelect}function l(){var o=t.element("<md-checkbox>");return o.attr("aria-label","Select Row"),o.attr("ng-click","$mdSelect.toggle($event)"),o.attr("ng-checked","$mdSelect.isSelected()"),o.attr("ng-disabled","$mdSelect.disabled"),t.element('<td class="md-cell md-checkbox-cell">').append(e(o)(n))}function c(){Array.prototype.some.call(o.children(),function(e){return e.classList.contains("md-checkbox-cell")&&o[0].removeChild(e)}),a()&&o.off("click",m)}function s(){o.prepend(l()),a()&&o.on("click",m)}function d(){return p.$$rowSelect}function u(e){return g.id?p.$$hash.has(g.id)?void(-1===e.indexOf(p.$$hash.get(g.id))&&p.$$hash.purge(g.id)):void(-1!==e.indexOf(g.model)&&p.$$hash.update(g.id,g.model)):void 0}function m(e){n.$applyAsync(function(){g.toggle(e)})}var g=r.shift(),p=r.shift();if(p.$$rowSelect&&g.id&&p.$$hash.has(g.id)){var f=p.selected.indexOf(p.$$hash.get(g.id));-1===f?p.$$hash.purge(g.id):p.$$hash.equals(g.id,g.model)||(p.$$hash.update(g.id,g.model),p.selected.splice(f,1,g.model))}g.isSelected=function(){return p.$$rowSelect?g.id?p.$$hash.has(g.id):-1!==p.selected.indexOf(g.model):!1},g.select=function(){g.disabled||(p.selected.push(g.model),t.isFunction(g.onSelect)&&g.onSelect(g.model))},g.deselect=function(){g.disabled||(p.selected.splice(p.selected.indexOf(g.model),1),t.isFunction(g.onDeselect)&&g.onDeselect(g.model))},g.toggle=function(e){return e&&e.stopPropagation&&e.stopPropagation(),g.isSelected()?g.deselect():g.select()},n.$watch(d,function(e){e?s():c()}),n.$watch(a,function(e,t){e!==t&&(p.$$rowSelect&&e?o.on("click",m):o.off("click",m))}),n.$watch(g.isSelected,function(e){return e?o.addClass("md-selected"):o.removeClass("md-selected")}),p.registerModelChangeListener(u),o.on("$destroy",function(){p.removeModelChangeListener(u)})}return{bindToController:!0,controller:n,controllerAs:"$mdSelect",link:o,require:["mdSelect","^^mdTable"],restrict:"A",scope:{id:"@mdSelectId",model:"=mdSelect",disabled:"=ngDisabled",onSelect:"=?mdOnSelect",onDeselect:"=?mdOnDeselect",autoSelect:"=mdAutoSelect"}}}function m(){var e={};this.equals=function(t,n){return e[t]===n},this.get=function(t){return e[t]},this.has=function(t){return e.hasOwnProperty(t)},this.purge=function(t){delete e[t]},this.update=function(t,n){e[t]=n}}function g(){function e(e,n){if(e.addClass("md-table"),n.hasOwnProperty("mdProgress")){var o=e.find("tbody")[0],i=t.element('<thead class="md-table-progress">');o&&e[0].insertBefore(i[0],o)}}function n(e,n,o,i){function r(){u.$$rowSelect=!0,d=i.$watchCollection("$mdTable.selected",function(e){p.forEach(function(t){t(e)})}),n.addClass("md-row-select")}function a(){u.$$rowSelect=!1,t.isFunction(d)&&d(),n.removeClass("md-row-select")}function l(){return g.length?void g[0].then(function(){g.shift(),l()}):i.$applyAsync()}function c(){return e.hasOwnProperty("mdRowSelect")&&""===e.mdRowSelect?!0:u.rowSelect}function s(){return u.selected?t.isArray(u.selected)?!0:console.error("Row selection: Expected an array. Recived "+typeof u.selected+"."):console.error("Row selection: ngModel is not defined.")}var d,u=this,g=[],p=[];u.$$hash=new m,u.$$columns={},u.columnCount=function(){return u.getRows(n[0]).reduce(function(e,t){return t.cells.length>e?t.cells.length:e},0)},u.getRows=function(e){return Array.prototype.filter.call(e.rows,function(e){return!e.classList.contains("ng-leave")})},u.getBodyRows=function(){return Array.prototype.reduce.call(n.prop("tBodies"),function(e,t){return e.concat(u.getRows(t))},[])},u.getElement=function(){return n},u.getHeaderRows=function(){return u.getRows(n.prop("tHead"))},u.waitingOnPromise=function(){return!!g.length},u.queuePromise=function(e){e&&1===g.push(t.isArray(e)?o.all(e):o.when(e))&&l()},u.registerModelChangeListener=function(e){p.push(e)},u.removeModelChangeListener=function(e){var t=p.indexOf(e);-1!==t&&p.splice(t,1)},e.hasOwnProperty("mdProgress")&&i.$watch("$mdTable.progress",u.queuePromise),i.$watch(c,function(e){e&&s()?r():a()})}return n.$inject=["$attrs","$element","$q","$scope"],{bindToController:!0,compile:e,controller:n,controllerAs:"$mdTable",restrict:"A",scope:{progress:"=?mdProgress",selected:"=ngModel",rowSelect:"=mdRowSelect"}}}function p(){function e(e){e.addClass("md-table-pagination")}function n(e,n){function o(e){return e>0}function i(e){return 0===e||"0"===e}var r=this;r.$label=t.extend({page:"Page:",rowsPerPage:"Rows per page:",of:"of"},n.$eval(r.label)||{}),r.disableNext=function(){return i(r.limit)||!r.hasNext()},r.first=function(){r.page=1,r.onPaginationChange()},r.hasNext=function(){return r.page*r.limit<r.total},r.hasPrevious=function(){return r.page>1},r.last=function(){r.page=r.pages(),r.onPaginationChange()},r.max=function(){return r.hasNext()?r.page*r.limit:r.total},r.min=function(){return r.page*r.limit-r.limit},r.next=function(){r.page++,r.onPaginationChange()},r.onPaginationChange=function(){t.isFunction(r.onPaginate)&&r.onPaginate(r.page,r.limit)},r.pages=function(){return Math.ceil(r.total/(i(r.limit)?1:r.limit))},r.previous=function(){r.page--,r.onPaginationChange()},r.range=function(e){return new Array(isFinite(e)&&o(e)?e:1)},r.showBoundaryLinks=function(){return e.hasOwnProperty("mdBoundaryLinks")&&""===e.mdBoundaryLinks?!0:r.boundaryLinks},r.showPageSelect=function(){return e.hasOwnProperty("mdPageSelect")&&""===e.mdPageSelect?!0:r.pageSelect},n.$watch("$pagination.limit",function(e,t){e!==t&&(r.page=Math.floor((r.page*t-t+e)/(i(e)?1:e)),r.onPaginationChange())})}return n.$inject=["$attrs","$scope"],{bindToController:{boundaryLinks:"=?mdBoundaryLinks",label:"@?mdLabel",limit:"=mdLimit",page:"=mdPage",pageSelect:"=?mdPageSelect",onPaginate:"=?mdOnPaginate",options:"=mdOptions",total:"@mdTotal"},compile:e,controller:n,controllerAs:"$pagination",restrict:"E",scope:{},templateUrl:"md-table-pagination.html"}}function f(){function e(e,t,n,o){e.columnCount=o.columnCount,e.deferred=o.waitingOnPromise}return{link:e,require:"^^mdTable",restrict:"C",scope:{},templateUrl:"md-table-progress.html"}}t.module("md.table.templates",["md-table-pagination.html","md-table-progress.html","arrow-up.svg","navigate-before.svg","navigate-first.svg","navigate-last.svg","navigate-next.svg"]),t.module("md-table-pagination.html",[]).run(["$templateCache",function(e){e.put("md-table-pagination.html",'<span class="label" ng-if="$pagination.showPageSelect()">{{ $pagination.$label[\'page\'] }}</span>\n\n<md-select class="md-table-select" ng-if="$pagination.showPageSelect()" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" aria-label="Page">\n  <md-option ng-repeat="num in $pagination.range($pagination.pages()) track by $index" ng-value="$index + 1">{{$index + 1}}</md-option>\n</md-select>\n\n<span class="label">{{ $pagination.$label[\'rowsPerPage\'] }}</span>\n\n<md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" aria-label="Rows" placeholder="{{$pagination.options ? $pagination.options[0] : 5}}">\n  <md-option ng-repeat="rows in $pagination.options ? $pagination.options : [5, 10, 15]" ng-value="rows">{{rows}}</md-option>\n</md-select>\n\n<span class="label">{{$pagination.min() + 1}} - {{$pagination.max()}} {{ $pagination.$label[\'of\'] }} {{$pagination.total}}</span>\n\n<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="!$pagination.hasPrevious()" aria-label="First">\n  <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n</md-button>\n<md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="!$pagination.hasPrevious()" aria-label="Previous">\n  <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n</md-button>\n<md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disableNext()" aria-label="Next">\n  <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n</md-button>\n<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disableNext()" aria-label="Last">\n  <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n</md-button>')}]),t.module("md-table-progress.html",[]).run(["$templateCache",function(e){e.put("md-table-progress.html",'<tr>\n  <th colspan="{{columnCount()}}">\n    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n  </th>\n</tr>')}]),t.module("arrow-up.svg",[]).run(["$templateCache",function(e){e.put("arrow-up.svg",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>')}]),t.module("navigate-before.svg",[]).run(["$templateCache",function(e){e.put("navigate-before.svg",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>')}]),t.module("navigate-first.svg",[]).run(["$templateCache",function(e){e.put("navigate-first.svg",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>')}]),t.module("navigate-last.svg",[]).run(["$templateCache",function(e){e.put("navigate-last.svg",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>')}]),t.module("navigate-next.svg",[]).run(["$templateCache",function(e){e.put("navigate-next.svg",'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>')}]),t.module("md.data.table",["md.table.templates"]),t.module("md.data.table").directive("mdBody",o),t.module("md.data.table").directive("mdCell",i),t.module("md.data.table").directive("mdColumn",r),r.$inject=["$compile"],t.module("md.data.table").decorator("$controller",a).factory("$mdEditDialog",l),a.$inject=["$delegate"],l.$inject=["$compile","$controller","$document","$mdUtil","$q","$rootScope","$templateCache","$templateRequest","$window"],t.module("md.data.table").directive("mdFoot",c),t.module("md.data.table").directive("mdHead",s),s.$inject=["$compile"],t.module("md.data.table").directive("mdRow",d),t.module("md.data.table").directive("mdSelect",u),u.$inject=["$compile"],t.module("md.data.table").directive("mdTable",g),t.module("md.data.table").directive("mdTablePagination",p),t.module("md.data.table").directive("mdTableProgress",f)}(window,angular);