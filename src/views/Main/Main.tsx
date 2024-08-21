import React, { useCallback, useEffect, useState } from 'react';
import { Button, FormLabel, Select, Option, FormHelperText, Card, Divider, Grid } from '@mui/joy';
import { getDatabase, ref, get, update, child } from "firebase/database"
import {
	Unstable_NumberInput as BaseNumberInput,
} from '@mui/base/Unstable_NumberInput';
import { FaPowerOff } from "react-icons/fa";

import './Main.scss';
import IsMobile from 'components/IsMobile/IsMobile';
import Graph from 'components/Graph/Graph';

type Props = {
};

const Main: React.FC<Props> = () => {
	const dbRef = ref(getDatabase())
	const [isManualEngineOn, setIsManualEngineOn] = useState<boolean>();
	const [isEngineOn, setIsEngineOn] = useState<boolean>();
	const [loadingEngineOn, setLoadingIsEngineOn] = useState<boolean>(false);
	const [operationMode, setOperationMode] = useState<'auto' | 'manual' | null>();
	const [currentVolume, setCurrentVolume] = useState<number>(0);
	const [goalVolume, setGoalVolume] = useState<number>()
	const [isLoading, setIsLoading] = useState(false);

	const isMobile = IsMobile()

	const updateData = useCallback((isFirstRender?: boolean) => {
		const updates: { [key: string]: any } = {}
		get(child(dbRef, '/')).then(response => {
			const data: { [key: string]: any } = response.val()
			Object.entries(data).forEach((item) => {
				const key = item[0]
				const value = item[1]
				if (key === 'isManualEngineOn') {
					if (value === undefined) {
						updates['/isManualEngineOn'] = false
						setIsManualEngineOn(false)
					} else {
						setIsManualEngineOn(value)
					}
				} else if (key === 'isEngineOn') {
					if (value === undefined) {
						setIsEngineOn(false)
						updates['/isEngineOn'] = false
					} else {
						setIsEngineOn(value)
					}
				} else if (key === 'operationMode') {
					if (value === undefined) {
						setOperationMode('auto')
						updates['/operationMode'] = 'auto'
					} else {
						setOperationMode(value)
					}
				} else if (key === 'currentVolume') {
					if (value === undefined) {
						setGoalVolume(3)
						updates['/goalVolume'] = 3
					} else {
						setCurrentVolume(value)
					}
				} else if (key === 'goalVolume') {
					setGoalVolume(value)
				}
			})
		}).finally(() => {
			if (isFirstRender) {
				const updates: { [key: string]: any } = {}

				update(dbRef, updates)
				setTimeout(() => {
					setIsLoading(false)
				}, 100)
			}
		})
	}, [])

	useEffect(() => {
		setIsLoading(true)
		updateData(true)
		setInterval(() => {
			updateData()
		}, 10000)
	}, [])


	const click = () => {
		setLoadingIsEngineOn(true)
		const newState = !isManualEngineOn
		update(dbRef, {
			['isManualEngineOn']: newState
		}).then(() => {
			setIsManualEngineOn(newState)
		}).finally(() => {
			setLoadingIsEngineOn(false)
		})
	}

	const handleChange = (
		event: React.SyntheticEvent | null,
		value: 'auto' | 'manual' | null,
	) => {
		setOperationMode(value)
		update(dbRef, {
			['operationMode']: value
		})
	}

	const yay = (event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent, value: number | null) => {
		const newValue = value || 3
		setGoalVolume(value || 3)
		update(dbRef, {
			['/goalVolume']: newValue
		})
	}
	if (isLoading) {
		return (
			<div
				className='loading-container'
			>
				<div className='loading d-flex' />
			</div>
		)
	}
	return (
		<div className='main'>
			<Grid container spacing={2} sx={{ flexGrow: 1 }}>
				<Grid xs={12} md={8}>
					<div className="system-operation">
						<Card variant={isMobile ? 'plain' : 'outlined'} >
							<div className='card-title'>Ligar/Desligar Sistema</div>
							<FormHelperText>Essa opção desliga o sistema independente do modo, ligando somente quando o volume abaixar de 2 litros</FormHelperText>
							<Button size='lg' onClick={click} color={loadingEngineOn ? 'neutral' : isManualEngineOn ? 'success' : 'danger'} loading={loadingEngineOn}>
								<FaPowerOff />
							</Button>
							<div className={`system-state ${isManualEngineOn ? 'green' : 'red'}`} color='success'><b>Sistema {isManualEngineOn ? 'ligado' : 'desligado'}</b></div>
						</Card>
					</div>
				</Grid>
				{isMobile && (
					<Grid xs={12}>
						<Divider />
					</Grid>
				)}
				<Grid xs={12} md={4}>
					<div className='engine-state-wrapper'>
						<Card variant={isMobile ? 'plain' : 'outlined'} >
							<div className='card-title'>Estado da Bomba</div>
							<div className={`engine-state ${isManualEngineOn ? 'green' : 'red'}`} color='success'><b>{isEngineOn ? 'Ligado' : 'Desligado'}</b></div>
						</Card>
					</div>
				</Grid>
				{isMobile && (
					<Grid xs={12}>
						<Divider />
					</Grid>
				)}
				<Grid xs={12} md={6}>
					<div className="operation-mode-wrapper">
						<Card variant={isMobile ? 'plain' : 'outlined'}>
							<div className='card-title'>Modo de Operação</div>
							<FormHelperText>O modo automático permitira a seleção de um volume desejado e o manterá, enquanto o modo manual permite ligar e desligar o motor exceto no extremos</FormHelperText>

							<Select value={operationMode} onChange={handleChange}>
								<Option value="manual">Manual</Option>
								<Option value="auto">Automático</Option>
							</Select>

							{(operationMode === 'manual') ? (
								<div className='manual-operation'>
									<div><b>Volume Atual</b></div>
									<div>
										{currentVolume.toLocaleString('pt-BR', { maximumFractionDigits: 1, })} Litros
									</div>
								</div>
							) : (
								<div className="auto-operation">
									<BaseNumberInput
										slotProps={{
											incrementButton: {
												children: <>+</>,
												className: 'increment',
											},
											decrementButton: {
												children: <>-</>,
											},
										}}
										min={3}
										max={19}
										onChange={yay}
										defaultValue={goalVolume}
										value={goalVolume}
									/>
								</div>
							)}
						</Card>
					</div>
				</Grid>
				{isMobile && (
					<Grid xs={12}>
						<Divider />
					</Grid>
				)}
				<Grid xs={12} md={6}>
					<div className="graph-wrapper">
						<Card variant={isMobile ? 'plain' : 'outlined'}>
							<div className='card-title'>Volume Atual</div>
							<div className='graph'>
								<Graph
									operationMode={operationMode || 'auto'}
									currentVolume={currentVolume}
									goalVolume={goalVolume || 3}
									maxVolume={20}
								/>
							</div>
						</Card>
					</div>
				</Grid>

			</Grid>
		</div>
	);
}

export default Main;