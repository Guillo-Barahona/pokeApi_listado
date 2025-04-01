import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './components/styles.css'
import PokemonApp from './components/PokemonApp'
import { Provider } from 'react-redux'
import store from './redux/store'



createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <main>
      <PokemonApp/>
    </main>
  </Provider>
  </>

)
