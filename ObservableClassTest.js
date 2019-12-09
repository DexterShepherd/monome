const { observable, action } = require('mobx')

class Test {
  @observable t

  constructor() {
    this.t = 0
    setInterval(
      action(() => (this.t += 1)),
      300
    )
  }
}

module.exports = Test
