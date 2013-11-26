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

