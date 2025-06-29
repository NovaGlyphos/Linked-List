import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Login from './components/Login'

function App() {
  return (
    <div className='bg-black h-screen'> 
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
