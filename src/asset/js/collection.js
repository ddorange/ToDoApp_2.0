(function(){

    'use strict';

    App.Collection.NoteCollection = Backbone.Collection.extend({
        model: App.Model.NoteModel,
        localStorage: new Backbone.LocalStorage('noteApp')
    });

})();