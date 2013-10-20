App.View = (function(){

    'use strict';

    var ListView,
        NoteView,
        DetailView,
        MenuView;


    MenuView = Backbone.View.extend({
        CLAS: {
            LIST:   'menu__list',
            DETAIL: 'menu__detail'
        },
        events: {
            'click .btn--reload': '_reload',
            'click .btn--return': '_back',
            'click .btn--add':    '_addNew',
            'click .btn--delete': '_deleteOne'
        },
        initialize: function() {
            this.$titleEl = this.$('#menu_view__title');
            this.model = new App.Model.MenuModel();

            // イベントリスナーの設定
            this.model.on('change:state', this.render, this);
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
        _reload: function(){
            window.location.reload(true);
        },
        _addNew: function(){
            console.log('addNew');
            App.Mediator.trigger('OPRN_NOTE');
        },
        _back: function(){
            console.log('back');
            App.Mediator.trigger('BACK_LIST_VIEW');
        },
        _deleteOne: function(){
            console.log('deleteOne');
            App.Mediator.trigger('DELETE_NOTE');
        }
    });
    /**
     * 一覧表示画面
     *
     */
    ListView = Backbone.View.extend({
        events: {},

        initialize: function(){
            this.collection = new App.Collection.NoteCollection();
            
            // イベントリスナーの設定
            this.listenTo(this.collection, 'add', this.addNote);

            // サーバーからデータを取得
            this.collection.fetch();
        },
        render: function() {
            // 個々のタスクの表示
            this.collection.each(function (_model) {
                var noteView = new NoteView( {model: _model} );
                this.$el.append( noteView.render().el );
            }, this);
            
            return this;
        },
        /**
         * ノートを追加する
         */
        addNote: function(_model) {
            var noteView = new NoteView({model: _model});
            this.$el.prepend( noteView.render().el );
        }
    });
    /**
     * 個別のノート
     *
     */
    NoteView = Backbone.View.extend({
        tagName: 'li',
        className: 'list__item',
        template: _.template( $('#tmp-note').html() ),
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
            // App.Mediator.trigger('OPEN_NOTE', this.model);
        },
        remove: function() {
            this.$el.remove();
        }
    });
    /**
     * 詳細表示画面
     *
     */
    DetailView = Backbone.View.extend({
        template: _.template($('#tmp-detail').html()),

        initialize: function() {
            // イベントリスナーの設定
            App.Mediator.on('OPEN_NOTE', this.render, this);
            App.Mediator.on('BACK_LIST_VIEW',   this.remove, this);
            App.Mediator.on('DELETE_NOTE', this.destroy, this);
        },
        render: function(_model){
            conosle.log('DetailView_render');
            this.model = _model || new App.Model.NoteModel();

            var content = this.template( this.model.toJSON() );
            this.$el.html(content);
            this.removeClass('is-hidden');
            return this;
        },
        destroy: function(){
            // ノートの削除
            conosle.log('DetailView_destroy');
        },
        remove: function() {
            conosle.log('DetailView_remove');
            // 一覧画面へ戻る
            // > ノートの更新確認
            // > ノートの保存
            // this.$el.removeChild();
        }
    });


    return {
        MenuView:   MenuView,
        ListView:   ListView,
        NoteView:   NoteView,
        DetailView: DetailView
    };


})();