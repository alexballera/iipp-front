import { useEffect } from 'react'
import { useAppContext } from 'src/@core/context/AppContext'

function HomePage() {
  const { state } = useAppContext()

  useEffect(() => {
    console.log(state)
  }, [state])

  return <h3>Home Page</h3>
}

export default HomePage
