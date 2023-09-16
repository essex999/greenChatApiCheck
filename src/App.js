import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./components/logIn/login";
import Chat from "./components/chatPage/chatPage";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />}></Route>
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
