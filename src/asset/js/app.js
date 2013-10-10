/** * * https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/backbone * */var app = app || {};$(function(){        'use strict';    var notes,        list,        menu,        noteModels = [],        menu_model,        i,        len;    for ( i=0, len=10; i<len; i+=1 ) {        noteModels[i] = new app.note.NoteModel();    }    // Noteモジュール    // コレクションのインスタンスの作成    notes = new app.note.NoteCollection(noteModels);    // Viewのインスタンス作成    list = new app.note.ListView( {collection: notes} );        // Menuモジュール    menu_model = new app.menu.MenuModel();    menu = new app.menu.MenuView( {collection: notes} );        // 描画開始    list.render();});