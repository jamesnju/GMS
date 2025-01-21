"use client"
import React, { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, Store } from '@/store/store';

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    // Initialize storeRef with undefined as the initial value
    const storeRef = useRef<AppStore | undefined>(undefined);
    
    // Create the store instance if it's not already created
    if (!storeRef.current) {
        storeRef.current = Store();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;