var app = app || {};
    
app.model = (function(){

    'use strict';

    var NoteModel,
        MenuModel,
        ButtonModel;


    NoteModel = Backbone.Model.extend({
        defaults: function(){
            return {
                title:   _.uniqueId('Note'),
                body:    'Plese write me ...',
                created: util.getDate()
            };
        },
        initialize: function(){
            this.on('invalid', function(_model, _error){
                // バリデートのエラー処理
                // $('#error').html(_error);
            });
        },
        validate: function(attrs) {
            if ( _.isEmpty(attrs.title) ) {
                return 'タイトルを入力してください';
            }
            if ( _.isEmpty(attrs.body) ) {
                return '本文を入力してください';
            }
        }
    });


    MenuModel = Backbone.Model.extend({
        defaults: {
            title: 'すべてのノート',
            state: '',
            STATE_VALUE: {
                LIST: 'list',
                DETAIL: 'detail'
            }
            // TODO: カテゴリー機能を実装する
            // , category:        ['すべてのノート'],
            // currentCategory: null,
        }
    });


    ButtonModel = Backbone.Model.extend({
        defaults: {
            el:      null,
            display: false,
            action:  function(){}
        }
    });


    return {
        NoteModel:    NoteModel,
        MenuModel:    MenuModel,
        ButtonModel:  ButtonModel
    };


})();