import { ThreadCategoriesReducer } from './categories/Reducer';
import { UserProfileReducer } from './user/Reducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    user: UserProfileReducer,
    categories: ThreadCategoriesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;