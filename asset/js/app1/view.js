(function(){

    'use strict';

    App.View.MenuView = Backbone.View.extend({
        CLAS: {
            LIST: 'menu__list',
            DETAIL: 'menu__detail'
        },
        events: {
            'click .btn--return': '_back',
            'click .btn--add':    '_addNew',
            'click .btn--delete': '_delete'
        },

        initialize: function() {
            this.$titleEl = this.$('#menu_view__title');
            this.model.on('change:state', this.render, this);
        },
        
        // TODO: ボタンの表示更新(いまのことろCSSで管理)
        render: function() {
            this.$el.toggleClass(this.CLAS.LIST);
            this.$el.toggleClass(this.CLAS.DETAIL);
            this.$titleEl.text( this.model.get('title') );
            return this;
        },
        
        _addNew: function(){
            // TODO: ボタンのクリックでchangeStateすると
            //       URLを直接叩かれた時にstateがおかしくなる
            this.model.changeState();
            //navigateメソッドのオプションのtriggerはデフォルトでfalseっぽい
            Backbone.history.navigate('detail/new', {trigger: true});
        },
        
        _back: function(){
            this.model.changeState();
            Backbone.history.navigate('', {trigger: true});
        },
        
        _delete: function(){
            Backbone.history.navigate('detail/delete');
            if(confirm('Are you Sure?')){
                console.log('_delete');
                // this.model.changeState();
            }
        }
    });
    /**
     * 一覧表示画面
     *
     */
    App.View.ListView = Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.collection, 'add', this.addOne);

            // App.Mediator.on('CHANGE_STATE', this.toggleDisplay, this);
            // App.Mediator.on('RELOAD', this.update, this);
            // App.Mediator.on('SAVE_NOTE', this.saveNote, this);
            
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
        addOne: function(_model) {
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
    App.View.NoteView = Backbone.View.extend({
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
            // App.Mediator.trigger('CHANGE_STATE');
        },
        remove: function() {
            this.$el.remove();
        }
    });
    /**
     * 詳細表示画面
     *
     */
    App.View.DetailView = Backbone.View.extend({
        template: _.template($('#tmp-detail').html()),

        initialize: function() {
            this.listenTo(this.collection, 'ADD_NEW_NOTE', this.addNew);
            this.listenTo(this.collection, 'OPEN_NOTE', this.openNote);


            // App.Mediator.on('CHANGE_STATE', this.toggleDisplay, this);
            // App.Mediator.on('OPEN_NOTE', this.render, this);
            // App.Mediator.on('BACK_LIST_VIEW', this.back, this);
            // App.Mediator.on('DELETE_NOTE', this.destroy, this);
        },
        /**
         *
         */
        render: function(){
            var content = this.template( this.model.toJSON() );
            this.$el.html(content);
            return this;
        },
        hide: function(){
            this.$el.addClass('is-hidden');
        },
        addNew: function() {
            this.model = new App.Model.NoteModel();
            this.collection.add(this.model);
            this.render();
        },
        openNote: function(cid){
            this.model = this.collection.getNote(cid);
            this.render();
        },
        /**
         * ノートの削除
         */
        destroy: function(){
            console.log('DetailView_destroy');
        },
        /**
         * ノートを保存または更新、もしくは破棄する
         */
        back: function() {
            var title = this.$el.find('#js-detail_title').val(),
                body  = this.$el.find('#js-detail_body').val();

            if ( this.model.set({title: title, body: body}, {validate: true}) ) {
                this.$el.empty();
                // App.Mediator.trigger('SAVE_NOTE', this.model);
            }
        }
    });

})();