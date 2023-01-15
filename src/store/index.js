import { createStore , applyMiddleware } from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import { FavoritesReducer } from './reducer/FavoritesReducer';
import storage from 'redux-persist/lib/storage'

const persistConfig ={
    key:'main-root',
    storage,
}
const persistedReducer = persistReducer(persistConfig,FavoritesReducer);

const store = createStore(persistedReducer,applyMiddleware());
const Persistor = persistStore(store);
export{Persistor};
export default store;