var app = app || {};
    
app.view = (function(){

    'use strict';

    var AppView,
        ListView,
        NoteView,
        DetailView,
        MenuView;

    AppView = Backbone.View.extend({
        menu:   null,
        list:   null,
        detail: null,
        events: {
            'CLICK_ADD_NEW': 'addNewNote'
        },
        
        initialize: function(){
            // メニューの作成
            var menuModel = new app.model.MenuModel();
            this.menu = new app.view.MenuView( {model: menuModel} );

            // 一覧画面の作成
            this.list = new app.view.ListView( {collection: this.collection} );

            // 詳細画面の作成
            this.detail = new app.view.DetailView( {collection: this.collection} );

            // this.listenTo(this.collection, 'add', this.addNewNote);
            // this.listenTo(this.collection, 'reset', this.addAll);
            // this.listenTo(this.collection, 'all', this.render);

            // アプリケーションの起動開始
            this.collection.fetch();
        },
        addNewNote: function(model){
            // var view = new app.view.NoteView( {model: model} );
            // this.$el.append( view.render().el );
            // 
            // メニューの表示更新
            // this.menu.changeState();
        }
    });
    /**
     * メニューバーのView
     * 
     */
    MenuView = Backbone.View.extend({
        el:     '#menu_view',
        CLAS: {
            LIST: 'menu__list',
            DETAIL: 'menu__detail'
        },
        $titleEl: null,
        events: {
            'click .btn--reload': '_reload',
            'click .btn--return': '_back',
            'click .btn--add':    '_addNew',
            'click .btn--delete': '_deleteOne'
        },
        initialize: function() {
            this.$titleEl = this.$('#menu_view__title');
            // this.model.on('change:state', this.render, this);
        },
        /**
         * メニュー部品（クラス・タイトル・ボタン）の表示更新
         */
        render: function() {
            var clas;

            // クラスの変更
            switch(this.model.state) {
                case 'list':
                    clas = CLAS.LIST;
                    break;
                case 'detail':
                    clas = CLAS.DETAIL;
                    break;
            }
            this.$el.addClass(clas);
            
            // タイトルの表示更新
            this.$titleEl.text( this.model.get('title') );

            // ボタンの表示更新: いまのことろCSSで管理

            return this;
        },
        changeState: function(){
            this.model.changeState();
        },
        // Active Functions
        _reload: function(){
            window.location.reload(true);
        },
        _addNew: function(){
            console.log('addNew');
            trigger();
        },
        _back: function(){
            console.log('back');
        },
        _deleteOne: function(){
            console.log('deleteOne');
        }
    });
    /**
     *
     *
     *
     *
     */
    ListView = Backbone.View.extend({
        el: '#list_view',
        menu: null,
        events: {

        },
        
        initialize: function(){
            this.listenTo(this.collection, 'add', this.addNewNote);
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
            this.$el.prepend( noteView.render().el );

            // ノート数の表示を更新
            this.updateCount();

            // 入力エリアのリセット
            // $('#title').val('').focus();
        },
        updateCount: function() {
            // $('#count').html( this.collection.length );
        }
    });
    /**
     *
     * 個別のノートのView
     *
     *
     */
    NoteView = Backbone.View.extend({
        tagName: 'li',
        className: 'list__item',
        template: _.template( $('#tmp-note_view').html() ),
        events: {
            'click': 'showDetail'
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
        showDetail: function(){
            // var detailView = new app.view.DetailView( this.model );
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
    /**
     *
     * ノートの詳細画面のView
     * @model 詳細を表示するNoteのModel
     *
     */
    DetailView = Backbone.View.extend({
        el: '#js-note_view'
    });
    
    
    return {
        AppView:    AppView,
        MenuView:   MenuView,
        ListView:   ListView,
        NoteView:   NoteView,
        DetailView: DetailView
    };


})();