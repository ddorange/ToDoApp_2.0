;(function(){

    'use strict';

    var NoteModel,

        NoteCollection,

        ListView,
        NoteView,

        MenuView,
        MenuTitleView,
        ReloadBtnView;



    // Model
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


    // Collection
    NoteCollection = Backbone.Collection.extend({ model: NoteModel });


    // View
    ListView = Backbone.View.extend({
        // tagName: '#list_view',
        tagName: 'ul',
        initialize: function(){
            console.log(this.$el);
            // イベントリスナの設定
            // this.collection.on('add', this.addNew, this);
            // this.collection.on('change', this.updateCount, this);
            // this.collection.on('destroy', this.updateCount, this);
        },
        render: function() {
            // 個々のタスクの表示
            this.collection.each(function (noteModel) {
                var noteView = new NoteView( {model: noteModel} );
                this.$el.append( noteView.render().el );
            }, this);
            
            // ノート数の表示を更新
            this.updateCount();
            
            return this;
        },
        addNew: function(noteModel) {
            var noteView = new NoteView( {model: noteModel} );

            // ノートを追加する
            this.$el.append( noteView.render().el );

            // ノート数の表示を更新
            this.updateCount();

            // 入力エリアのリセット
            // $('#title').val('').focus();
        },
        updateCount: function() {
            // $('#count').html( this.collection.length );
        }
    });

    NoteView = Backbone.View.extend({
        tagName: 'li',
        className: 'note',
        template: _.template( $('#tmp-note_view').html() ),
        events: {
            'click .deleteBtn': 'destroyModel',
            'click .toggle': 'toggleCheckBox'
        },
        initialize: function() {
            this.model.on('destroy', this.remove, this);
            this.model.on('change', this.render, this);
        },
        render: function() {
            var template = this.template( this.model.toJSON() );
            this.$el.html(template);
            return this;
        },
        destroyModel: function() {
            if ( confirm('削除しますか？') ) {
                this.model.destroy();
            }
        },
        remove: function() {
            this.$el.remove();
        }
    });

   MenuView = Backbone.View.extend({
        el:       '#menu_view',
        events:   {
            // 'click .js-reloadPage': 'reloadPage',
            // 'click .js-addNew': 'addNew',
            // 'click .js-backList': 'backList',
            // 'click .js-deleteNote': 'deleteNote',
        },
        initialize: function() {
            // this.model.on('destroy', this.remove, this);
            // this.model.on('change', this.render, this);
        },
        render: function() {
            // var template = this.template( this.model.toJSON() );
            // this.$el.html(template);
            return this;
        },
        reloadPage: function(e) {

        }
    });

    MenuTitleView = Backbone.View.extend({
        el: '#menu_view',
        initialize: function() {
            this.model.on('change', this.render, this);
        },
        render: function() {
            return this;
        },
    });

    ReloadBtnView = Backbone.View.extend({
        el: 'button',
        className: 'btn btn--reload',
        template: '<i class="icon icon--relaod"></i>',
        events: {
            'click': 'reloadPage'
        },
        initialize: function() {
            this.model.on('change', this.render, this);
        },
        render: function() {
            this.$el.html( this.template );
            return this;
        },
        reloadPage: function() {
            console.log('reload!!!!');
        }
    });




    /** PROCESS START */
    var notes,
        list,
        menu,
        models = [],
        title,
        body,
        i,
        len;

    for ( i=0, len=10; i<len; i+=1 ) {
        models[i] = new NoteModel();
    }

    // コレクションのインスタンスの作成
    notes = new NoteCollection(models);

    // Viewのインスタンス作成
    list = new ListView( {collection: notes} );
    menu = new MenuView( {collection: notes} );
    // DOMに挿入
    // list.render();
    $('#wrapper').append( list.render().el );

})();