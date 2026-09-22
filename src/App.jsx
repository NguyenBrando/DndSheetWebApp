import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import View from './pages/View';

export default function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme == 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <nav>
        <a href="/">Home</a>
        <a href="/create">New Character</a>
        <a href="/create">New Race</a>
        <a href="/create">New Class</a>
        <a href="/create">New Background</a>
        <button onClick={toggleTheme}>Switch to {theme == 'light' ? 'dark' : 'light'} mode</button>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </main>
    </Router>
  );
}