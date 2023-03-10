import { rootReducer } from './AppState';
import { legacy_createStore as createStore } from "redux";

const configureStore = () => { 
    return createStore(rootReducer, {});
};

export default configureStore;