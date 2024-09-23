import { Route, Routes } from 'react-router-dom';
import Homepage from './component/Homepage/Homepage';
import Header from './component/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="blog" element={<Blog />} /> */}
      </Routes>
    </>

  );
}

export default App;
