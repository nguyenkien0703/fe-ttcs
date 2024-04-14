import rootReducer from '@/stores/reducers'
import storage from 'redux-persist/lib/storage'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

const PERSIS_CONFIG_VERSION = 1
const PERSISTED_KEYS: string[] = ['']

const persistConfig = {
    key: 'root',
    storage,
    version: PERSIS_CONFIG_VERSION,
    whitelist: PERSISTED_KEYS,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore> | undefined

export function makeStore(preloadedState = undefined) {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
        devTools: process.env.NODE_ENV === 'development',
        preloadedState,
    })
}

export const initializeStore = (preloadedState: any = undefined) => {
    let _store = store ?? makeStore(preloadedState)
    //after navigating to a page with an initial Redux state, merge that state
    //with the current state in the store, and create a new store

    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // reset the current store
        store = undefined
    }
    //for SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // create the store once in the client
    if (!store) {
        store = _store
    }
    return _store
}
store = initializeStore()

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector

export const persistor = persistStore(store)

export function useStore(initialState: any) {
    return useMemo(() => initializeStore(initialState), [initialState])
}

export default store
