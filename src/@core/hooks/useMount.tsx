import { useEffect } from 'react'

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = (mount: any) => useEffect(mount, [])

export default useMount
