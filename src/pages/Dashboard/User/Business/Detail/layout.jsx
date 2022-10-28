import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { Header } from 'containers/BusinessDetail'
import { Container } from './styles'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const BusinessDetailLayout = () => {
  const navigate = useNavigate()
  const { code } = useParams()
  const launchData = useSelector((store) => store.LaunchReducer.launchResponse)

  // might need some more work
  useEffect(() => {
    if (code !== launchData.launchCode) {
      navigate(-1)
    }
  }, [code, launchData, navigate])

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default BusinessDetailLayout
