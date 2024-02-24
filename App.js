
import { Provider } from 'react-redux';
import Parent from './Parent';
import store from "./store";
import { PaperProvider } from 'react-native-paper';


export default function App() {
  
  return (
    <Provider store={store}>
      <PaperProvider>
        <Parent />
      </PaperProvider>
    </Provider>
  )
}


