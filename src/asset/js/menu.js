var app = app || {};
    
app.menu = (function(){

    'use strict';

    var MenuModel,
        MenuView;

    MenuModel = Backbone.Model.extend({
        defaults: {
            MODE: {
                LIST: 'list',
                DETAIL: 'detail'
            },
            currentMode: ''
            // TODO: カテゴリー機能を実装する
            // , category:        ['すべてのノート'],
            // currentCategory: null,
        }
    });

    MenuView = Backbone.View.extend({
        el:     '#menu_view',
        titleEl: null,
        btnEl:  {
            list: null,
            detail: null
        },
        events: {
            'click #js-reloadPage': 'reloadPage',
            'click #js-addNew': 'addNew',
            'click #js-backList': 'backList',
            'click #js-deleteNote': 'deleteNote'
        },
        initialize: function() {
            console.log(this.model);
            this.titleEl      = $('#menu_view__title');
            this.btnEl.list   = [ $('#js-reloadPage'), $('#js-addNew') ];
            this.btnEl.detail = [ $('#js-backList'), $('#js-deleteNote') ];
            // this.model.on('change:currentMode', this.render, this);
        },
        render: function() {
            switch (this.model.currentMode) {
                case 'list':
                    this.btnEl.lidt.each(function($el){
                        $el.removeClass('is--hidden');
                    },this);
                    break;
                case 'detail':
                    break;
                default:
                    console.log('error');
                    break;
            }
            return this;
        },
        reloadPage: function(e) {
            console.log('reloadPage');
        },
        addNew: function() {
            console.log('addNew');
        },
        backList: function() {
            console.log('backList');
        },
        deleteNote: function() {
            console.log('deleteNote');
        }
    });


    return {
        MenuModel: MenuModel,
        MenuView:  MenuView
    };


})();