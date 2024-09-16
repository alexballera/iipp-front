// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'
import { HOME_ROUTE } from 'src/@core/constants'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (route: string) => {
  return route
}

const Home = () => {
  //** Hooks */
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const timeoutId = setTimeout(() => {
      if (HOME_ROUTE) {
        router.replace(HOME_ROUTE.toString())
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HOME_ROUTE, router])

  return <Spinner />
}

export default Home
