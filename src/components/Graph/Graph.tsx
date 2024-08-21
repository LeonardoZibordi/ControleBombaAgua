import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	BarController,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	ChartData,
	ChartTypeRegistry,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	BarController,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
)

type Props = {
	operationMode: 'auto' | 'manual'
	currentVolume: number
	goalVolume: number
	maxVolume: number
};



const Graph: React.FC<Props> = ({ operationMode, currentVolume, goalVolume, maxVolume }
) => {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		events: [],
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				anchor: 'center' as const,
				color: "#FFF",
				font: {
					size: 15,
					weight: 'bold' as const
				},
				formatter: (value: number) => {
					return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} Litros`
				},
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				stacked: true,
				display: false,
				grid: {
					display: false,
				},
			},
			y: {
				display: false,
				grid: {
					display: false,
				},
			},
		},
	}
	const autoLabels = []
	if (operationMode === 'auto') {
		autoLabels.push({
			type: 'line' as const,
			pointStyle: 'rect' as const,
			data: [goalVolume, goalVolume, goalVolume],
			backgroundColor: "#4922d2",
			order: 1,
			borderColor: "#4922d2",
			borderWidth: 2,
			pointRadius: 0,
			datalabels: {
				display: false,
			},
		})
	}
	const graphData = {
		labels: ["", '', ''],
		datasets: [
			{
				type: 'bar' as const,
				pointStyle: 'rect' as const,
				data: [0, currentVolume, 0],
				backgroundColor: "#1976d2",
				order: 2,
			},
			{
				type: 'bar' as const,
				pointStyle: 'rect' as const,
				data: [0, maxVolume, 0],
				backgroundColor: "#d9d9d9",
				order: 2,
				datalabels: {
					display: false,
				},
			},
			...autoLabels,
		],
	}
	return (
		<Chart
			type='line'
			plugins={[ChartDataLabels]}
			data={graphData}
			options={options}
		/>
	);
}

export default Graph;