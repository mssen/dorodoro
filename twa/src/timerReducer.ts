import { useReducer, Dispatch } from 'react';

export enum Status {
  WORK,
  SHORT_BREAK,
  LONG_BREAK,
}

const initialTimes: Record<Status, number> = {
  [Status.WORK]: 1500,
  [Status.SHORT_BREAK]: 300,
  [Status.LONG_BREAK]: 900,
};

// -- ACTIONS

const reset = () =>
  ({
    type: 'RESET',
  } as const);

const tick = () =>
  ({
    type: 'TICK',
  } as const);

const next = () =>
  ({
    type: 'NEXT',
  } as const);

const togglePause = () =>
  ({
    type: 'TOGGLE_PAUSE',
  } as const);

type TimerAction = ReturnType<
  typeof reset | typeof tick | typeof next | typeof togglePause
>;

const actions = (dispatch: Dispatch<TimerAction>) => ({
  reset: () => dispatch(reset()),
  tick: () => dispatch(tick()),
  next: () => dispatch(next()),
  togglePause: () => dispatch(togglePause()),
});

// -- STATE

const defaultState = {
  time: initialTimes[Status.WORK],
  status: Status.WORK,
  isPauseed: true,
  completedWorkSets: 0,
};

type TimerState = typeof defaultState;

const getNextStatusState = (status: Status, completedWorkSets: number) => {
  if (status === Status.WORK) {
    const nextStatus =
      completedWorkSets !== 0 && completedWorkSets % 3 === 0
        ? Status.LONG_BREAK
        : Status.SHORT_BREAK;
    return {
      time: initialTimes[nextStatus],
      status: nextStatus,
      completedWorkSets: completedWorkSets + 1,
    };
  } else {
    return {
      time: initialTimes[Status.WORK],
      status: Status.WORK,
    };
  }
};

const reducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'RESET': {
      return { ...state, time: initialTimes[state.status] };
    }
    case 'NEXT': {
      return {
        ...state,
        ...getNextStatusState(state.status, state.completedWorkSets),
      };
    }
    case 'TICK': {
      return {
        ...state,
        time: state.time - 1,
        ...(state.time === 1 &&
          getNextStatusState(state.status, state.completedWorkSets)),
      };
    }
    case 'TOGGLE_PAUSE': {
      return { ...state, isPauseed: !state.isPauseed };
    }
    default: {
      return state;
    }
  }
};

// -- HOOK

export interface TimerHook {
  state: TimerState;
  actions: ReturnType<typeof actions>;
}

const useTimer = (initialState: TimerState = defaultState): TimerHook => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, actions: actions(dispatch) };
};

export default useTimer;
