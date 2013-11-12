(function(){

    'use strict';
    
    App.Router.appRouter = Backbone.Router.extend({

        routes: {
            '': 'setList',
            'detail': 'setDetail'
        },

        setList: function(){
            console.log('setList');
        },
        
        setDetail: function(){
            console.log('setDetail');
        }
    });

})();

