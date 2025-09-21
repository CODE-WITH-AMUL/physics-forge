import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GetStarted } from "./GetStarted"; 
import Login from "./accounts/login";
import Register from "./accounts/register";
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper Component={GetStarted} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// Wrapper lets you use your vanilla GetStarted() function inside React Router
function Wrapper({ Component }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      Component(ref.current);
    }
  }, [Component]);

  return <div ref={ref}></div>;
}

export default App;
