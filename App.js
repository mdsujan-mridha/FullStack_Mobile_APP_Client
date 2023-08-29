
import { Provider } from 'react-redux';
import Parent from './Parent';
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Parent />
    </Provider>
  )
}


