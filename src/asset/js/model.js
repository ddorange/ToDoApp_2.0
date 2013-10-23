App.Model = (function(){

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
                alert(_error);
            });
        },
        validate: function(attrs) {
            if ( _.isEmpty(attrs.title) ) {
                return 'タイトルを入力してください';
            }
            if ( _.isEmpty(attrs.body) ) {
                return '本文を入力してください';
            }
        },
        saveData: function(title, body){
            // return this.create({ title: title, body: body });
        }
    });


    MenuModel = Backbone.Model.extend({
        defaults: {
            title: 'すべてのノート',
            state: ''              // 'list' or 'detail'
            // TODO: カテゴリー機能を実装する
            // , category:        ['すべてのノート'],
            // currentCategory: null,
        },
        STATE: {
            LIST: 'list',
            DETAIL: 'detail'
        },
        initialize: function(){
            this.set('state', this.STATE.LIST);
        },
        changeState: function(){
            console.log(this.get('state'));
            switch(this.get('state')){
            case this.STATE.LIST:
                this.set('state', this.STATE.DETAIL);
                break;
            case this.STATE.DETAIL:
                console.log('一覧画面に変更');
                this.set('state', this.STATE.LIST);
                break;
            default:
                console.log('change_state_failed');
                break;
            }
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