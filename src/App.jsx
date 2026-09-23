import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { ErrorProvider, GlobalErrorBanner } from './components/ErrorDisplay';

import Home from './pages/Home';
import NewChar from './pages/NewChar';
import NewRace from './pages/NewRace';
import NewClass from './pages/NewClass';
import NewBG from './pages/NewBG';
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
      <ErrorProvider>
        <nav>
          <a href="/">Home</a>
          <a href="/new_character">New Character</a>
          <a href="/new_race">New Race</a>
          <a href="/new_class">New Class</a>
          <a href="/new_background">New Background</a>
          <button onClick={toggleTheme}>Switch to {theme == 'light' ? 'dark' : 'light'} mode</button>
        </nav>

        <GlobalErrorBanner/>

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new_character" element={<NewChar />} />
            <Route path="/new_race" element={<NewRace />} />
            <Route path="/new_class" element={<NewClass />} />
            <Route path="/new_background" element={<NewBG />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </main>
      </ErrorProvider>
    </Router>
  );
}