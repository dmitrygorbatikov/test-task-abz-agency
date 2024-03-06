import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Provider } from "react-redux"
import { store } from "./store"
import "toastr/build/toastr.css"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
