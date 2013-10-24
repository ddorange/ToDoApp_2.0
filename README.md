# French Vanilla Note

## アプリケーション構造
### \#1.0 View
#### 1.1 MenuView
トップメニューのView。
~~子にButtonViewを持つ~~

#### ~~1.1.a ButtonView~~


#### 1.2 ListView
ノートの一覧画面のView。リスト形式でノートを表示する

##### 1.2.a NoteView
リストのView

#### 1.3. DetailView
詳細画面のView

### \#2. Model
1. MenuModel
2. NoteModel

### \#3. Collection
1. NoteCollection

### \#4. Mediator(Global_Event)
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

## スクリーンショット
