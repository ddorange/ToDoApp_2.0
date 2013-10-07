(function(w){

/*----------------------------------------
 * utilオブジェクト
 * よく使う処理をまとめたオブジェクト
 * edit 130529
----------------------------------------*/
var util = {

	/* 現在の日付を取得して返す関数
	 * @return Noteオブジェクトに準拠した日付の文字列
	 */
	getDate: function(){
		var d = new Date();
		var month = setZero(d.getMonth()+1);
		var date = setZero(d.getDate());
		var hour = setZero(d.getHours());
		var min = setZero(d.getMinutes());
		var sec = setZero(d.getSeconds());

		function setZero(a){
			if(a/10 < 1){ a = '0' + a; }
			return a;
		}

		return d.getFullYear()+'-'+month+'-'+date+' '+hour+':'+min+':'+sec;
	},

/*** Array ***/
	/* 配列の中から指定したプロパティの値を持つもののインデックスを返す
	 * @param array: 検索する配列 
	 * @param name:  指定するプロパティ
	 * @param val: 特定する値
	 */
	serchIndexByProperty: function(array, name, val){
		for(var i=0; i<array.length; i++) {
			if(val == array[i][name]){ 
				return i;
			}
		}
	},

	/* 配列内の日付を降順にソートする
	 * @param : array ソートする配列
	 * @return : array ソートした配列
	 */
	sortDateDescendingOrder: function(array){
		array.sort(function(a,b){
				return (a.date < b.date ? 1: -1);
		});
		return array;
	},

/* Check: 値の判定系の処理 */
	/* 空文字でないかどうかを調べる
	 * @param str : String
	 * @return boolean : 文字がある>true, 文字が無い>false 
	 */
	checkStringExist: function(str){
		if(str=='' || str==null || str==undefined){ return false;}
		else{ return true; }
	},


	/* nullでないかどうかを調べる
	 * @param data : 調べるデータ
	 * @return boolean : null > true, nullでない > false 
	 */
	checkNull: function(data){
		if(data == null){ return true; }
		else{ return false; }
	},


	/*改行以外の空白スペースを削除する
	 * @param str: 評価する文字列
	 */
	checkWhiteSpace: function(str){
		str= str.replace(/[\f\r\t\v\x20　]/g, '');	
		return str;
	},


	/* HTMLタグの入力を阻止する
	 * @param str: 評価する文字列
	 */
	checkHtmlTag: function(str){
		str= str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
		return str;
	}

};

w.util = util;


})(window);