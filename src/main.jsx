import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './styles.css'
import PokemonApp from './PokemonApp'
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
