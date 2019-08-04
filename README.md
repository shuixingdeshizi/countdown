# 倒计时

## 引入方式

(1) 直接使用 script 标签引入

```
  <script src="../dist/countdown.umd.js"></script>
```
（2） npm i -save Coundown
```
  import Countdown from 'Countdown'
  
  const Countdown = require('Countdown')
```

## 使用

**html**
```html
    <div id="times"></div>
    <div id="status">status</div>
```

**js**
```js
  var countdown = new Countdown({times: 10000, interval: 100})
  var $times = document.querySelector('#times')
  var $status = document.querySelector('#status')
  countdown.on('end', (opts) => {
      console.log('end')
      console.log(opts)
      $status.innerHTML = 'end'
  })
  countdown.on('change', (opts) => {
      console.log('change')
      console.log(opts)
      let times = opts.times
      let formatTimes = opts.formatTimes
      $times.innerHTML = `${formatTimes.hours}:${formatTimes.minutes}:${formatTimes.seconds}:${formatTimes.milliseconds}`
  })
  countdown.start()

```