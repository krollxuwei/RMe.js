/**
 * Created by xuwei on 15/3/13.
 */
;(function(){
    var Validate= function(){};

    Validate.prototype = {
        /**
         * 判断正整数
         * @returns {boolean}
         */
        checkRate:function(val){
            var re = /^[1-9]+[0-9]*]*$/
            return re.test(val);
        },
        /**
         * 判断是否手机号码
         * @param num
         * @returns {boolean}
         */
        isPhone: function (num) {
            var partten = /^1[3,4,5,7,8]\d{9}$/;
            return partten.test(num);
        }
    }

    window.Validate = new Validate();
})()
