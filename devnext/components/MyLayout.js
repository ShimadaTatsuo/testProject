import styled from 'styled-components'
import Header from '../components/Header'

const TitleComponent = ({ node }) => <Title>{node}</Title>

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
`

const LayoutComponent = ({ children }) => (
  <Layout>
    <Header />
    <TitleComponent node={children} />
  </Layout>
)

const Layout = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`

export default LayoutComponent