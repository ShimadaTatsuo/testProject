export default content => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>react ssr</title>
  </head>
  <body>
    <div id="app">${content}</div>
    <script type="text/javascript" charset="utf-8" src="./bundle.js"></script>
  </body>
</html>`
}
