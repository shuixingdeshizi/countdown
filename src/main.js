import { formatTimes } from './formatTimes'

class Countdown{
  constructor ({ times = 0, interval = 500, events = {} } = {}) {
      this.events = events
      this.times = times
      this.interval = interval
  }
  start () {
      var now = Date.now()
      var step =  () => {
          if (this.times < this.interval) {
              setTimeout(() => {
                  this.times = 0
                  // 倒计时结束
                  this.trigger('change', {times: this.times, formatTimes: formatTimes(this.times)})
                  this.trigger('end', {times: this.times,  formatTimes: formatTimes(this.times)})
              }, this.times)
          } else {
              setTimeout(() => {
                  var duration = Date.now() - now
                  this.times -= duration
                  now = Date.now()
                  this.trigger('change', {times: this.times, formatTimes: formatTimes(this.times)})
                  if (this.times > 0) {
                      console.log(this.times, 'diff')
                      step()
                  }
              }, this.interval)
          }
      }

      step()
  }
  on (event, handler) {
    if (!this.events[event]) {
        this.events[event] = []
    }
    this.events[event].push(handler)
  }
  off (event, handler) {
    this.events[event].forEach((fn, index) => {
      if (fn === handler) {
          this.evnets.splice(index, 1)
      }
    })
  }
  trigger (event) {
    if (!this.events[event]) return
    let args = Array.prototype.slice.call(arguments, 1)
    this.events[event].forEach(fn => {
        fn(...args)
    })
  }
}

export default Countdown
