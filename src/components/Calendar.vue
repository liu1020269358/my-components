<template lang="">
  <div class="wrap">
    <div class="header">
      <div class="today-btn">
        今天
      </div>
      <div class="month-selector-btn">
        <div class="pre-btn" @click="transToPreMonth">
          《
        </div>
        <div class="date-btn">
          {{date.year}}-{{date.month + 1}}
        </div>
        <div class="next-btn" @click="transToNextMonth">
          》
        </div>
      </div>
      <div class="day-selector-btn">

      </div>
    </div>
    <div class="body">
      <div class="weeks-panel panel">
        <div class="panel-item" v-for="item in weeksData" :key="item">
          {{ item }}
        </div>
      </div>
      <div class="days-panel panel">
        <div class="panel-item" v-for="item in daysData" :class="item.attr === '2' ? 'current-month' : ''" :key="item.id" :data-id="item.id" @click="PanelTap(item.attr, item.value)">
          <div :class="item.id === `${date.year}-${date.month}-${date.day}` ? 'current-day' : ''">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Calendar',
  data () {
    return {
      date: {
        year: '',
        month: '',
        day: ''
      },
      weeksData: [ '日', '一', '二', '三', '四', '五', '六' ],
      daysData: []
    }
  },
  methods: {
    // 获取panel渲染需要的日期数据
    setDaysData (year = this.date.year, month = this.date.month, day = this.date.day) {
      let data = this.getDaysData(year, month, day)
      this.daysData = data
    },
    getDaysData (year, month, day) {
      let data = []
      // 当前月份的第一天对应的星期
      let weekOfFirstDay = this.getWeek(year, month, 1)
      // 当前月份的最后一天对应的星期
      let weekOfLastDay = this.getWeek(year, month + 1, 0)

      // 添加上个月的数据
      let preMonthDays = this.getMonthDays(year, month - 1)
      for (let i = weekOfFirstDay; i > 0; i--) {
        data.push(this.getDateItemModal(`${year}-${month - 1}-${preMonthDays - i + 1}`, preMonthDays - i + 1, '1'))
      }
      // 添加当前月份的数据
      let curMonthDays = this.getMonthDays(year, month)
      for (let i = 1; i <= curMonthDays; i++) {
        data.push(this.getDateItemModal(`${year}-${month}-${i}`, i, '2'))
      }
      // 添加下个月的数据
      for (let i = 1; i <= 6 - weekOfLastDay; i++) {
        data.push(this.getDateItemModal(`${year}-${month + 1}-${i}`, i, '3'))
      }
      return data
    },
    getDateItemModal (id, value, attr) {
      return {id, value, attr}
    },
    getMonthDays (year, month) {
      return new Date(year, month + 1, 0).getDate()
    },
    getWeek (year, month, day) {
      return new Date(year, month, day).getDay()
    },
    PanelTap (attr, value) {
      switch (attr) {
        case '1':
          this.transToPreMonth()
          break
        case '2':
          this.transDay(value)
          break
        case '3':
          this.transToNextMonth()
          break
        default:
      }
    },
    transDay (day) {
      this.date.day = day
    },
    transToPreMonth () {
      let {year, month} = this.date
      let [newYear, newMonth] = this.reviseYearAndMonth(year, month - 1)
      let preMonthDays = this.getMonthDays(newYear, newMonth)
      this.transToDate(newYear, newMonth, preMonthDays)
    },
    transToNextMonth () {
      let {year, month} = this.date
      let [newYear, newMonth] = this.reviseYearAndMonth(year, month + 1)
      this.transToDate(newYear, newMonth, 1)
    },
    transToDate (year, month, day) {
      this.setDate(year, month, day)
      this.setDaysData(year, month, day)
    },
    setDate (year, month, day) {
      this.date = {year, month, day}
    },
    reviseYearAndMonth (year, month) {
      if (month < 0) {
        year -= 1
        month = 11
      }
      if (month > 11) {
        year += 1
        month = 0
      }
      return [year, month]
    },
    initDate () {
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()
      let day = today.getDate()
      this.setDate(year, month, day)
    }
  },
  created () {
    this.initDate()
    this.setDaysData()
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  .header {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .today-btn {
      background-color: #efefef;
      border: 1px solid #ccc;
      border-radius: 3px;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }
    .month-selector-btn{
      display: flex;
      .pre-btn, .next-btn{
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .date-btn{
        padding: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .day-selector-btn {
      width: 32px;
      height: 32px;
    }
  }
  .body{
    .panel{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .panel-item{
        width: 14.285%;
        height: 32px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .days-panel {
      color: #888;
      .current-month{
        color: #000;
      }
      .current-day{
        background-color: aqua;
        color: #fff;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
