import crypto from 'crypto'

var cipers = crypto.getCiphers();

var hashes = crypto.getHashes();


var password ='passowrd';

var sha512 = crypto.createHash('sha512');
sha512.update(password)
var hash = sha512.digest('hex')


var hash2md5 = crypto.createHash('md5')
hash2md5.update(password)
var res = hash2md5.digest('hex')



const css = `
.hello-world {
  background: #C0FFEE;
  padding: 10px;
  font-family: monospace;
  font-size: 20px;
}
.hello-world2 p {
  background: #C0FFEE;
  padding: 10px;
  font-family: monospace;
  font-size: 20px;
}
`

const matchCss = /([^{]+)({[^}]*})/gm

// hash css 作成
function computeHash(data) {
  const hash = crypto.createHash('md5')
  hash.update(data)
  return hash.digest('hex')
}

function addHash(selectors, content) {
  // css箇所をターゲットにhash文字列を取得
  const hash = computeHash(content)
  // セレクタのスペースで分割、フィルターで余計な分割を削除、mapで各セレクタにhashを追加、joinで一つのセレクタに戻す、concatで文字列連結
  return selectors
    .split(/\s+/g)
    .filter(v => v)
    .map(selector => `${selector}_${hash}`)
    .join(' ')
    .concat(' ' + content)
}

function addHashes(cssContent) {
  // match gオプションでターゲットになる箇所を全て処理する
  return cssContent.replace(
    matchCss,
    (match, selectors, content) => addHash(selectors, content)
  )
}

const temp = addHashes(css)



function mapNamesFromCss(cssContent) {
  const nameMap = {}
  nameMap['all'] = ''
  let match = matchCss.exec(cssContent)
  while (match) {
    const [content, selectors, style] = match
    const hash = computeHash(content)

    selectors
      .split(/\s+/g)
      .filter(v => v)
      .map(sel => sel.replace('.', ''))
      .forEach(selector => {
        nameMap[selector] = `${selector}_${hash}`
      })

    nameMap['all'] += selectors
        .split(/\s+/g)
        .filter(v => v)
        .map(selector => `${selector}_${hash}`)
        .join(' ')
        .concat(' ' + style)
    match = matchCss.exec(cssContent)
  }
  return nameMap
}

const cssClassNameMap = mapNamesFromCss(css)

console.log(cssClassNameMap)
console.log(cssClassNameMap['all'])

const div = document.createElement('div')
div.className = cssClassNameMap['hello-world']

const styleTag = document.createElement('style')
styleTag.innerHTML = cssClassNameMap['all']
