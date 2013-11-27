# About App1
## 概要
- 最初にBackbone.jsで書き直したバージョン
- クライアントサイドのMVCっぽくないという指摘を受けて途中で開発中止
- 続きは[App2](https://github.com/ddorange/ToDoApp_2.0/blob/master/documents/app2.md)で

## アプリケーション構造
#### \# View
1. MenuView  
  トップメニューのView。~~子にButtonViewを持つ~~
   - ButtonView~~  
     ボタンのView。各ボタンはこのViewクラスのインスタンスとして作成する

2. ListView  
   ノートの一覧画面のView。リスト形式でノートを表示する
   - NoteView  
     リストのView

3. DetailView  
   詳細画面のView

#### \# Model
1. MenuModel
2. NoteModel

#### \# Collection
1. NoteCollection

#### \# Mediator(Global_Event)
- CHANGE_STATE
- RELOAD
- OPEN_NOTE
- BACK_LIST_VIEW
- DELETE_NOTE
- SAVE_NOTE


## 名前空間
```js
App {
    View: {},
    Model: {},
    Collection: {},
    Mediator: {}
}
```