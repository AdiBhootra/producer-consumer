import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { producersSlice, consumersSlice } from './store';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const producers = useSelector((state) => state.producers);
  const consumers = useSelector((state) => state.consumers);

  const handleStartProducer = () => {
    if (producers.length < 4) {
      const producerId = producers.length + 1;
      dispatch(producersSlice.actions.addProducer({ id: producerId }));
    }
  };

  const handleStopProducer = (producerId) => {
    dispatch(producersSlice.actions.removeProducer(producerId));
  };

  const handleStartConsumer = () => {
    if (consumers.length < 2) {
      const consumerId = consumers.length + 1;
      dispatch(consumersSlice.actions.addConsumer({ id: consumerId }));
    }
  };

  const handleStopConsumer = (consumerId) => {
    dispatch(consumersSlice.actions.removeConsumer(consumerId));
  };

  return (
    <div>
      <h1>Producer-Consumer App</h1>
      <div>
        <h2>Producers</h2>
        {producers.map((producer) => (
          <div key={producer.id}>
            <p>Producer {producer.id} </p>
            <button onClick={() => handleStartProducer()}>Start</button>
            <button onClick={() => handleStopProducer(producer.id)}>Stop</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Consumers</h2>
        {consumers.map((consumer) => (
          <div key={consumer.id}>
            <p>Consumer {consumer.id}</p>
            <p>Value: {consumer.value || 'No data'}</p>
            <button onClick={() => handleStartConsumer()}>Start</button>
            <button onClick={() => handleStopConsumer(consumer.id)}>Stop</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Data</h2>
        {data.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
