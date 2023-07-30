import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Protected from './pages/Protected';
import ProtectedRoute from './utils/ProtectedRoute';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/protected" element={<ProtectedRoute />}>
          <Route index element={<Protected />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
