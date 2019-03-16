// 写一个对象, 进行功能的封装
var Time = {
    // 获取时间戳
    getUnix: function () {
        let date = new Date()
        return date.getTime()
    },
    // 获取今天 0 时 0 分 0 秒的时间戳
    getTodayUnix: function () {
        let date = new Date()
        date.setMilliseconds(0)
        date.setSeconds(0)
        date.setMinutes(0)
        date.setHours(0)
        return date.getTime()
    },
    // 获取今年 1 月 1 日 0 分 0 秒的时间戳
    getYearUnix: function () {
        let date = new Date()
        date.setMilliseconds(0)
        date.setSeconds(0)
        date.setMinutes(0)
        date.setHours(0)
        date.setDate(1)
        date.setMonth(0)
        return date.getTime()
    },
    // 获取标准年月日
    getDate: function () {
        let date = new Date()
        let month = date.getMonth + 1
        let day = date.getDate()
        month = month < 10 ? "0" + month : month
        day = day < 10 ? "0" + day : day
        return date.getFullYear() + "-" + month + "-" + day
    },
    // 转换时间
    getFormatDate: function (timestap) {
        const now = this.getUnix()
        const today = this.getTodayUnix()
        const year = this.getYearUnix()
        // 转化为秒级时间戳
        const timer = (now - timestap) / 1000
        
    }
}