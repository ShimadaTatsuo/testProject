const inputString = 'いいい'
const typeArray = ['あああ', 'いいい', 'ううう']
const methodNumber = typeArray.indexOf(inputString)

class AAA {
  method() {
    return 'aaa'
  }
}

class BBB {
  method() {
    return 'bbb'
  }
}

class CCC {
  method() {
    return 'ccc'
  }
}

const wrap = [
  new AAA(),
  new BBB(),
  new CCC()
]

console.log(wrap[methodNumber].method())