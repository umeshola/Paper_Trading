import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './comp/Index';
import Port from './comp/Portfolio';
import Balance from './comp/Balance';
import Market from './comp/Market';
import Signup from './comp/Signup';
import Appbar from './comp/Appbar';
import Learn from './comp/Learn';
import More from './comp/More';
function App() {
  return (
    <Router>
      <div>
      <Appbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Port />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/market" element={<Market />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
