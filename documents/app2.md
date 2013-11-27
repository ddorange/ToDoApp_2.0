# ノートアプリ簡易版について
## 概要
いきなり研修で制作したノートアプリをBackbone化しようとしたらハードルが高かったので、ToDoアプリを改良しながら近づけることにした。  

### 簡易化
- 機能を絞る
 * 新規ノートの追加
 * 既存ノートの編集
 * 既存ノートの削除
- デザインはなし

### 参考
- [ToDoMVC backbone](http://todomvc.com/architecture-examples/backbone/)

# ファイル構成
.
├── asset
│   ├── js
│   │   └── app.js
└── index2.html

### Library
- jquery.js
- backbone.js
- underscore.js
- backbone.localStorage.js





## 残りタスク
- [ ] 既存ノートを開いたときのURLをかっこよく
今はModelのidがそのまま入っていて、URL経由でidをViewに渡している。

- [ ] 入力のバリデートをModelでやる
今はinputの値を取得したときにバリデートしている。
Collection#createしたときにModel#vaildateを呼んでバリデートしたい。

