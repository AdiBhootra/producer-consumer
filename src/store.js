import { configureStore, createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
      addData: (state, action) => {
        state.push(action.payload);
      },
    },
  });
  
  export const producersSlice = createSlice({
    name: 'producers',
    initialState: [],
    reducers: {
      addProducer: (state, action) => {
        state.push(action.payload);
      },
    },
  });
  
  export const consumersSlice = createSlice({
    name: 'consumers',
    initialState: [],
    reducers: {
      addConsumer: (state, action) => {
        state.push(action.payload);
      },
    },
  });

  const createDataMiddleware = (store) => (next) => (action) => {
    if (action.type === 'producers/addProducer') {
      const producerId = action.payload;
      const intervalId = setInterval(() => {
        const newData = {
            id: Math.random.round(),
            date : Date.now()
        }
        store.dispatch(dataSlice.actions.addData(newData));
      }, 1000);
      store.dispatch(producersSlice.actions.addProducer({ id: producerId, intervalId }));
    } else if (action.type === 'producers/removeProducer') {
      const producer = store.getState().producers.find((p) => p.id === action.payload);
      if (producer) {
        clearInterval(producer.intervalId);
      }
    } else if (action.type === 'consumers/addConsumer') {
      const consumerId = action.payload;
      const intervalId = setInterval(() => {
        const data = store.getState().data;
        if (data.length > 0) {
          const consumedData = data.pop();
          store.dispatch(consumersSlice.actions.addConsumer({ id: consumerId, value: consumedData }));
        }
      }, 2000);
      store.dispatch(consumersSlice.actions.addConsumer({ id: consumerId, intervalId }));
    } else if (action.type === 'consumers/removeConsumer') {
      const consumer = store.getState().consumers.find((c) => c.id === action.payload);
      if (consumer) {
        clearInterval(consumer.intervalId);
      }
    }
    return next(action);
  };
  
  export const store = configureStore({
    reducer: {
      data: dataSlice.reducer,
      producers: producersSlice.reducer,
      consumers: consumersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(createDataMiddleware),
  });
  

 