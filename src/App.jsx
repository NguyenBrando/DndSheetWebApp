import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { ErrorProvider, GlobalErrorBanner } from './components/ErrorDisplay';

import Home from './pages/Home';
import View from './pages/View';
import NewChar from './pages/NewChar';
import NewRace from './pages/NewRace';
import NewClass from './pages/NewClass';
import NewBG from './pages/NewBG';

export default function App() {
	/* Dark/Light mode logic */
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || 'light';
	});

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme == 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		const root = document.documentElement;
		if (theme == 'dark') {
		root.classList.add('dark-mode');
		} else {
		root.classList.remove('dark-mode');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);


	return (
		<Router>
		<ErrorProvider>
			<nav>
			<a href="/">Home</a>
			<a href="/new_char">New Character</a>
			<a href="/new_race">New Race</a>
			<a href="/new_class">New Class</a>
			<a href="/new_background">New Background</a>
			<button onClick={toggleTheme}>Switch to {theme == 'light' ? 'dark' : 'light'} mode</button>
			</nav>

			<GlobalErrorBanner/>

			<main style={{ padding: '1rem' }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/view" element={<View />} />
				<Route path="/new_char" element={<NewChar />} />
				<Route path="/new_race" element={<NewRace />} />
				<Route path="/new_class" element={<NewClass />} />
				<Route path="/new_background" element={<NewBG />} />
			</Routes>
			</main>
		</ErrorProvider>
		</Router>
	);
}