import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Counter from './component/Counter'
import contentToHtml from './htmlFormat'

const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
  const renderContent = renderToString(<Counter />)
  const htmlString = contentToHtml(renderContent)
  res.send(htmlString)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
