import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Login from './components/Login'
import Feed from './components/Feed'
import appStore from './utils/appStore'
import {Provider} from 'react-redux'



function App() {
  return (
    
    <Provider store={appStore}>
      <div className='bg-base-300 min-h-screen'> 
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
    
  );
}

export default App;
