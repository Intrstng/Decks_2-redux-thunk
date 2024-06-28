import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectDecks } from '../decks-selectors.ts'
import { useEffect, useLayoutEffect, useState } from 'react'
import { fetchDecksTC } from '../decks-thunks.ts'

// Custom hook
export const useFetchDecks = () => {
  const dispatch = useAppDispatch()
  const decks = useAppSelector(selectDecks)
  const [isLoading, setIsLoading] = useState(false)
  // Change to:
  // const [isLoading, setIsLoading] = useState(true)
  // Or use with current code useLayoutEffect
  useLayoutEffect(() => {
    setIsLoading(true)

    dispatch(fetchDecksTC())
        .finally(() => setIsLoading(false))
  }, [dispatch])

  return {
    decks,
    isLoading
  }
}
