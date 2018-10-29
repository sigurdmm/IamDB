/**
 * Import all Sagas here, and connect it to the sagaMiddleware,
 * in runSaga.
 *
 * runSaga is used by ./store.js, to connect our saga to the store
 * */
import mediaSaga from './media/sagas';

/**
 * Setup function for which to attach our sagas to a SagaMiddleware,
 * connected to our store.
 *
 * @param {SagaMiddleware} sagaMiddleware The middleware to attach our sagas to
 * */
export default function runSagas(sagaMiddleware) {
  sagaMiddleware.run(mediaSaga);
}
