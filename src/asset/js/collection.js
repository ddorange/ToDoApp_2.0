var app = app || {};
    
app.collection = (function(){

    'use strict';

    var NoteCollection;

    NoteCollection = Backbone.Collection.extend({
        model: app.model.NoteModel,
        localStorage: new Backbone.LocalStorage('App')
    });

    return {
        NoteCollection: NoteCollection
    };


})();