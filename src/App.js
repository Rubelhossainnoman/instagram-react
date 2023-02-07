import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
      </Routes>
    </>
  );
}

export default App;
