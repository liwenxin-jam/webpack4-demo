import jquery from 'jquery'
import moment from 'moment'

// 设置语言，IgnorePlugin忽略需要手动引入
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log(r);