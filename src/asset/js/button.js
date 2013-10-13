var app = app || {};
    
app.button = (function(){
    
    'use strict';

    var ButtonModel,
        ButtonView,
        ReloadButton,
        AddButton,
        BackButton,
        DeleteButton;

    ButtonModel = Backbone.Model.extend({
        defaults: {
            display: false
        }
    });

    ButtonView = Backbone.View.extend({
        events: {
            'click': 'handleClick'
        },
        initialize: function(){
            this.on(this.model, 'change', this.render);
        },
        render: function() {
            if (this.model.display) {
                this.$el.show();
            } else {
                this.$el.hide();
            }
        },
        handleClick: function() {

        }
    });

    ReloadButton = ButtonView.extend({
        el: '#js-reloadPage',
        handleClick: function() {
            console.log('reloadPage');
        }
    });
    
    AddButton = ButtonView.extend({
        el: '#js-addNew',
        handleClick: function() {
            console.log('js-addNew');
        }
    });
    
    BackButton = ButtonView.extend({
        el: '#js-backList',
        handleClick: function() {
            console.log('backList');
        }
    });

    DeleteButton = ButtonView.extend({
        el: '#js-deleteNote',
        handleClick: function() {
            console.log('deleteNote');
        }
    });

    return {
        ButtonModel:  ButtonModel,
        ReloadButton: ReloadButton,
        AddButton:    AddButton,
        BackButton:   BackButton,
        DeleteButton: DeleteButton
    };

})();