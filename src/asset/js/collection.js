App.Collection = (function(){

    'use strict';

    var NoteCollection;

    NoteCollection = Backbone.Collection.extend({
        model: App.Model.NoteModel,
        localStorage: new Backbone.LocalStorage('noteApp')
    });

    return {
        NoteCollection: NoteCollection
    };

})();