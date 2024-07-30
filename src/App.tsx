import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from 'views/Home'
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

// set(child(dbRef, '/yay'), {
// 	[`yay${i}`]: `hehehe${i}`
// })
// i++
// const postData = {
// 	author: `test${i}`,
// 	authorPic: 'picture'
// };
// const updates: any = {};
// updates['/posts/'] = postData;
// updates['/user-posts/' + 'uid' + '/'] = postData;
// i++
// update(dbRef, updates)
// onValue(dbRef, (response) => {
// 	console.log('yay2', response.val())
// })
// get(dbRef).then(response => {
// 	console.log('yay', response.val(), dbRef)
// })