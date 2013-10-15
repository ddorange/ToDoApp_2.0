var app = app || {};

app.note = (function(){

    'use strict';

    var NoteModel,
        NoteCollection,
        ListView,
        NoteView,
        DetailView;

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
    NoteCollection = Backbone.Collection.extend({
        model: NoteModel
    });


    // View
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

    NoteView = Backbone.View.extend({
        tagName: 'li',
        className: 'list__item',
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

    DetailView = Backbone.View.extend({

    });

    return {
        NoteModel:      NoteModel,
        NoteCollection: NoteCollection,
        ListView:       ListView,
        NoteView:       NoteView,
        DetailView:     DetailView
    };

})();