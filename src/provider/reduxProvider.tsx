"use client"
import { AppStore, Store } from '@/store/store'
// import { AppStore, store } from '@/store/store'
import React, { ReactNode, useRef} from 'react'
import { Provider } from 'react-redux'

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = Store()
    }
  
    return <Provider store={storeRef.current}>{children}</Provider>
}

export default ReduxProvider