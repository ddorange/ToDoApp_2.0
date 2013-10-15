var app = app || {};
    
app.view = (function(){

    'use strict';

    var AppView,
        ListView,
        NoteView,
        DetailView,
        MenuView;

    // ただのコントローラー化する？
    AppView = Backbone.View.extend({
        menu:   null,
        list:   null,
        detail: null,
        events: {

        },
        initialize: function(){
            // var menuModel   = new app.model.MenuModel,
            //     collection   = new app.model.List,
            //     detailModel = new app.model.;

            // this.menu = new app.view.MenuView( menuModel );
        }
    });
    /**
     *
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
            'click .btn--reload': 'reload',
            'click .btn--return': 'back',
            'click .btn--add':    'addNew',
            'click .btn--delete': 'deleteOne'
        },
        initialize: function() {
            this.$titleEl = this.$('#menu_view__title');
            this.model.on('change:state', this.changeState, this);
        },
        /**
         *
         * メニュー部品（クラス・タイトル・ボタン）の表示更新
         *
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
        reload: function(){
            console.log('reload');
            // window.location.reload(true);
        },
        back: function(){
            console.log('back');
        },
        addNew: function(){
            console.log('addNew');
        },
        deleteOne: function(){
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
        initialize: function(){
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
            var detailView = new app.view.DetailView( this.model );
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