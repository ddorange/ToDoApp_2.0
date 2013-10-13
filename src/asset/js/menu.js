var app = app || {};
    
app.menu = (function(){

    'use strict';

    var MenuModel,
        MenuView;

    MenuModel = Backbone.Model.extend({
        defaults: {
            title: 'すべてのノート',
            state: '',
            STATE_VALUE: {
                LIST: 'list',
                DETAIL: 'detail'
            }
            // TODO: カテゴリー機能を実装する
            // , category:        ['すべてのノート'],
            // currentCategory: null,
        }
    });

    MenuView = Backbone.View.extend({
        el:     '#menu_view',
        STATE_CLASS: {
            LIST: 'menu__list',
            DETAIL: 'menu__detail'
        },
        $titleEl: null,
        btnEl:  {
            list:  { left: null, right: null},
            detail: { left: null, right: null}
        },
        events: {},
        
        initialize: function() {
            this.titleEl = this.$('#menu_view__title');
            this.btnEl.list.left    = new app.button.ReloadButton();
            this.btnEl.list.right   = new app.button.AddButton();
            this.btnEl.detail.left  = new app.button.BackButton();
            this.btnEl.detail.right = new app.button.DeleteButton();
            this.model.on('change:state', this.changeState, this);
        },
        /**
         * メニュー部品（クラス・タイトル・ボタン）の表示更新
         *
         */
        render: function() {
            var clas;

            // クラスの変更
            switch(this.model.state) {
                case 'list':
                    clas = STATE_CLASS.LIST;
                    break;
                case 'detail':
                    clas = STATE_CLASS.DETAIL;
                    break;
            }
            this.$el.addClass( clas );
            // タイトルの表示更新
            this.$titleEl.text( this.model.get('title') );

            // ボタンの表示更新: いまのことろCSSで管理

            return this;
        }
    });


    return {
        MenuModel: MenuModel,
        MenuView:  MenuView
    };


})();