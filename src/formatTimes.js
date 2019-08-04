function formatTimes (times) {
  // 以毫秒为单位
  let days = Math.floor(times / (24 * 60 * 60 * 1000))
  let hours = formatNum(Math.floor(times % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)))
  let minutes = formatNum(Math.floor(times % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000)))
  let seconds = formatNum(Math.floor(times % (24 * 60 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000))
  let milliseconds = formatNum(Math.floor(times % (24 * 60 * 60  * 1000) % (60 * 60 * 1000) % (60 * 1000) % 1000))

  function formatNum (num) {
    return num < 10 ? '0' + num : num
  } 
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export {
  formatTimes
}