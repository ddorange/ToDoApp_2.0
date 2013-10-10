(function(w){

    'use strict';

    var util = (function(){
        var

        _setZero = function(a){
            if(a/10 < 1){ a = '0' + a; }
            return a;
        },
        /**
         * 現在の日付を取得して返す関数
         * @return Noteオブジェクトに準拠した日付の文字列
         */
        getDate = function(){
            var d     = new Date(),
                year  = d.getFullYear(),
                month = _setZero( d.getMonth()+1 ),
                date  = _setZero( d.getDate() ),
                hour  = _setZero( d.getHours() ),
                min   = _setZero( d.getMinutes() ),
                sec   = _setZero( d.getSeconds() );

            return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' +sec;
        },
        /**
         * 配列内の日付を降順にソートする
         *
         * @param : array ソートする配列
         * @return : array ソートした配列
         */
        sortDateDescendingOrder = function(array){
            array.sort(function(a,b){
                return (a.date < b.date ? 1: -1);
            });
            return array;
        };


        return {
            getDate: getDate,
            sortDateDescendingOrder: sortDateDescendingOrder
        };
    })();

    w.util = util;

})(window);