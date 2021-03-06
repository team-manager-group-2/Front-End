;(function (){
  
  'use strict';

  angular.module('STM')

  .factory('PlayersFactory', ['$http', 'PARSE', 'UserFactory',

    function ($http, PARSE, UserFactory) {

      var user = UserFactory.user();

      var getTeamName = function (listId) {
        return $http.get(PARSE.URL + 'classes/Lists/' + listId, {
          headers: PARSE.CONFIG.headers,
          cache: true
        });
      };
    
      var getSingleTeam = function (listId) {

        return $http.get(PARSE.URL + 'classes/Items', {
          headers: PARSE.CONFIG.headers,
          params: {
            where: {
              list: {
                __type: 'Pointer',
                className: 'Lists',
                objectId: listId
              }
            }
          },
          cache: true
        });

      };

      var addTeamPlayer = function (itemObj, listId) {

        // Add User to Item
        itemObj.user = {
          __type: 'Pointer',
          className: '_User',
          objectId: user.objectId
        }

        // Add List to Item
        itemObj.list = {
          __type: 'Pointer',
          className: 'Lists',
          objectId: listId
        }

        // ACL
        var ACLObj = {};
        ACLObj[user.objectId] = { read: true, write: true };
        itemObj.ACL = ACLObj;

        return $http.post(PARSE.URL + 'classes/Items', itemObj, PARSE.CONFIG);

      };

      var deleteListItem = function () {

      };
  
      return {
        get: getSingleTeam,
        add: addTeamPlayer,
        del: deleteListItem,
        listTitle: getTeamName
      };
    }
  ])

}());