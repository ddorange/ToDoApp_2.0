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