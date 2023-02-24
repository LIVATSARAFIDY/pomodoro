import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pomoReducer from '../features/pomo/PomoSlice';
import taskReducer from '../features/tasks/TaskSlice';
import colorReducer from '../features/modalSettings/colorSlice';
import timerReducer from '../features/typeTimerActif/timerActifSlice';
import settingsReducer from '../features/modalSettings/SettingsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pomo: pomoReducer,
    task: taskReducer,
    colorSettings: colorReducer,
    timerActif: timerReducer,
    settings:settingsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
