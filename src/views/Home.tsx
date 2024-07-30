import React, { useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import { getDatabase, ref, get, onValue, set, update, child } from "firebase/database"
// import './Home.scss';

type Props = {
};

const Home: React.FC<Props> = () => {
	const dbRef = ref(getDatabase())
	const [isEngineOn, setIsEngineOn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		get(child(dbRef, '/isEngineOn')).then(response => {
			setIsEngineOn(!!response.val())
		})
	}, [])

	const click = () => {
		setIsLoading(true)
		const newState = !isEngineOn
		update(dbRef, {
			['IsEngineOn']: newState
		}).then(() => {
			setIsEngineOn(newState)
			setIsLoading(false)
		}).catch(() => {
			window.alert('Deu ruim no update, vou botar msn bonitinha depois XD')
		})
	}
	return (
		<div className='home' style={{ textAlign: 'center', marginTop: '24px' }}>
			<Button size='lg' onClick={click} color={isLoading ? 'neutral' : isEngineOn ? 'success' : 'danger'} loading={isLoading}>Teste LED</Button>
		</div>
	);
}

export default Home;