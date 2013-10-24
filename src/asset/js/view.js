App.View = (function(){

    'use strict';

    var ListView,
        NoteView,
        DetailView,
        MenuView;

    MenuView = Backbone.View.extend({
        CLAS: {
            LIST: 'menu__list',
            DETAIL: 'menu__detail'
        },
        events: {
            'click .btn--reload': '_reload',
            'click .btn--return': '_back',
            'click .btn--add':    '_addNew',
            'click .btn--delete': '_delete'
        },
        initialize: function() {
            // プロパティのセット
            this.model = new App.Model.MenuModel();
            this.$titleEl = this.$('#menu_view__title');

            // イベントリスナーの設定
            this.model.on('change', this.render, this);
            App.Mediator.on('CHANGE_STATE', this.changeState, this);
        },
        /**
         * メニュー部品（クラス・タイトル・ボタン）の表示更新
         */
        render: function() {
            this.$el.hasClass(this.CLAS.LIST);
            this.$el.toggleClass(this.CLAS.DETAIL);
            this.$titleEl.text( this.model.get('title') );
            // TODO: ボタンの表示更新(いまのことろCSSで管理)
            
            return this;
        },
        changeState: function(){
            this.model.changeState();
        },
        _reload: function(){
            App.Mediator.trigger('CHANGE_STATE');
            App.Mediator.trigger('RELOAD');
        },
        _addNew: function(){
            App.Mediator.trigger('CHANGE_STATE');
            App.Mediator.trigger('OPEN_NOTE');
        },
        _back: function(){
            App.Mediator.trigger('CHANGE_STATE');
            App.Mediator.trigger('BACK_LIST_VIEW');
        },
        _delete: function(){
            App.Mediator.trigger('CHANGE_STATE');
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
            //　プロパティのセット
            this.collection = new App.Collection.NoteCollection();
            
            // イベントリスナーの設定
            this.listenTo(this.collection, 'add', this.addNote);
            App.Mediator.on('CHANGE_STATE', this.toggleDisplay, this);
            App.Mediator.on('RELOAD', this.update, this);
            App.Mediator.on('SAVE_NOTE', this.saveNote, this);
            
            this.collection.fetch();
            this.render();
        },
        render: function() {
            var fragmet = document.createDocumentFragment();

            this.collection.each( function (_model) {
                var noteView = new NoteView( {model: _model} );
                fragmet.appendChild( noteView.render().el );
            }, this);
            this.el.appendChild(fragmet);

            return this;
        },
        toggleDisplay: function(){
            console.log('ListView.toggleClass');
            this.$el.toggleClass('is-hidden');
        },
        /**
         * ノートを追加する
         */
        addNote: function(_model) {
            var noteView = new NoteView({model: _model});
            this.$el.prepend( noteView.render().el );
        },
        /**
         * コレクションにノートを保存・更新
         */
        saveNote: function(_model){
            this.collection.set(_model);
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
            App.Mediator.trigger('OPEN_NOTE', this.model);
            App.Mediator.trigger('CHANGE_STATE');
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
            App.Mediator.on('CHANGE_STATE', this.toggleDisplay, this);
            App.Mediator.on('OPEN_NOTE', this.render, this);
            App.Mediator.on('BACK_LIST_VIEW', this.back, this);
            App.Mediator.on('DELETE_NOTE', this.destroy, this);
        },
        /**
         *
         */
        render: function(_model){
            var content;

            this.model = _model || new App.Model.NoteModel();
            content = this.template( this.model.toJSON() );
            this.$el.html(content);
            // this.$el.removeClass('is-hidden');
            
            return this;
        },
        toggleDisplay: function(){
            console.log('DetailView.toggleClass');
            this.$el.toggleClass('is-hidden');
        },
        /**
         * ノートの削除
         */
        destroy: function(){
            conosle.log('DetailView_destroy');
        },
        /**
         * ノートを保存または更新、もしくは破棄する
         */
        back: function() {
            var title = this.$el.find('#js-detail_title').val(),
                body  = this.$el.find('#js-detail_body').val();

            if ( this.model.set({title: title, body: body}, {validate: true}) ) {
                this.$el.empty();
                App.Mediator.trigger('SAVE_NOTE', this.model);
            }
        }
    });


    return {
        MenuView:   MenuView,
        ListView:   ListView,
        NoteView:   NoteView,
        DetailView: DetailView
    };


})();