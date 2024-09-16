import { useState } from 'react'

function useList() {
  const [list, setList] = useState<any[]>([])

  const addItem = (item: any) => setList(prev => [...prev, item])

  const deleteItem = (name: any) => {
    const filtered = list.filter(item => item !== name)
    setList(filtered)
  }

  const findItem = (name: any) => {
    const item = list.find(item => item === name)

    return item
  }

  const isItem = (name: any) => {
    const item = list.find(item => item === name)

    return Boolean(item)
  }

  const cleanList = () => setList([])

  return {
    list,
    addItem,
    deleteItem,
    findItem,
    isItem,
    cleanList
  }
}
export default useList
