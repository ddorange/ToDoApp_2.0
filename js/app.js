(function(){    'use strict';        App.Main = {        el: '#app',        init: function(){            // インスタンスの作成            this.notes = new App.Collection.NoteCollection(),            this.menu = new App.View.MenuView({                el: '#js-menu_view',                model: new App.Model.MenuModel()            });            this.list = new App.View.ListView({                el: '#js-list_view',                collection: this.notes            });            this.detail = new App.View.DetailView({                el: '#js-detail_view',                collection: this.notes            });            // サーバーと通信しないので今のところ必要なし            // this.loading = new App.View.LoadingView({            //     el: this.$el.find('#js-loading_view')            // });            this.router = new App.Router.appRouter(); // TODO: Routerって２コ以上になる可能性あるのか考える            Backbone.history.start();                    }    };})();
(function(){

    'use strict';

    App.Collection.NoteCollection = Backbone.Collection.extend({
        model: App.Model.NoteModel,
        localStorage: new Backbone.LocalStorage('noteApp')
    });

})();
(function(){

    'use strict';

    App.Model.MenuModel = Backbone.Model.extend({
        defaults: {
            title: 'すべてのノート',
            state: 'list'
            // , category: ['すべてのノート'],
        },
        STATE: {
            LIST: 'list',
            DETAIL: 'detail'
        },
        CATEGORY: {
            ALL: 'すべてのノート'
        },

        initialize: function(){
            this.beList();
        },

        beList: function(){
            // console.log('state be list');
            this.set('title', this.CATEGORY.ALL);
            this.set('state', this.STATE.LIST);
            this.changeState = this.beDetail;
        },

        beDetail: function(){
            // console.log('state be detail');
            this.set('title', '');
            this.set('state', this.STATE.DETAIL);
            this.changeState = this.beList;
        }
    });


    App.Model.NoteModel = Backbone.Model.extend({
        defaults: function(){
            return {
                title: 'No Title',
                content: 'Plese Write Me !!'
                // created: util.getDate()
            };
        },

        initialize: function(){
            // バリデートのエラー処理
            this.on('invalid', function(model, error){
                alert(error);
            });
        },
        
        validate: function(attrs){

            if ( _.isEmpty(attrs.title) ) {
                return 'Opps! Title is Empty!';
            }
            
            if ( _.isEmpty(attrs.content) ) {
                return 'Opps! Content is Empty!';
            }
        },
        
        saveData: function(title, content){
            // return this.create({ title: title, content: content });
        }
    });

})();
var App = {
    
    Main: {},
    Model: {},
    Collection: {},
    View: {},
    Router: {}

};
(function(){

    'use strict';
    
    App.Router.appRouter = Backbone.Router.extend({

        routes: {
            '': 'setList',
            'detail/:id': 'setDetail'
        },

        setList: function(){
            console.log('setList');
        },
        
        setDetail: function(id){
            if(id === 'new'){
                console.log('create new note');
                App.Main.notes.trigger('ADD_NEW_NOTE');
            } else {
                console.log('open note:' + id);
                App.Main.notes.trigger('OPEN_NOTE', id);
            }
        }
    });

})();


(function(w){

    'use strict';

    var util = (function(){
        var

        _setZero = function(a){
            if(a/10 < 1){ a = '0' + a; }
            return a;
        },
        /**
         * 現在の日付を取得して返す関数
         * @return Noteオブジェクトに準拠した日付の文字列
         */
        getDate = function(){
            var d     = new Date(),
                year  = d.getFullYear(),
                month = _setZero( d.getMonth()+1 ),
                date  = _setZero( d.getDate() ),
                hour  = _setZero( d.getHours() ),
                min   = _setZero( d.getMinutes() ),
                sec   = _setZero( d.getSeconds() );

            return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' +sec;
        },
        /**
         * 配列内の日付を降順にソートする
         *
         * @param : array ソートする配列
         * @return : array ソートした配列
         */
        sortDateDescendingOrder = function(array){
            array.sort(function(a,b){
                return (a.date < b.date ? 1: -1);
            });
            return array;
        };


        return {
            getDate: getDate,
            sortDateDescendingOrder: sortDateDescendingOrder
        };
    })();

    w.util = util;

})(window);
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