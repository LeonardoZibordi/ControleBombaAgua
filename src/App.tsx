import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from 'views/Main/Main'
import { initializeApp } from "firebase/app"

import './App.scss'

initializeApp({
	apiKey: 'AIzaSyA38QUuhEi2WhoR6j9DNDybZu9TOTWJOO4',
	databaseURL: 'https://esp32-teste-led-default-rtdb.firebaseio.com/',
	projectId: '596643935467',
})

function App() {
	return (
		<BrowserRouter>
			<React.Suspense fallback={<></>}>
				<div className="header">
					<img src="/AquaSense.png" alt="" />
				</div>
				<div className="main-content">
					<Routes>
						<Route
							path='/'
							element={
								<Home />
							}
						/>
					</Routes>
				</div>
			</React.Suspense>
		</BrowserRouter>
	)
}

export default App
