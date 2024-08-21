import { useEffect, useState } from 'react'

export default function IsMobile() {
	const isMobile = () => {
		return window.innerWidth <= 992
	}

	const [mobilePage, setMobilePage] =
		useState<boolean>(isMobile)
	useEffect(() => {
		const handleResize = () => {
			setMobilePage(isMobile)
		}

		window.addEventListener('resize', handleResize)
		return () =>
			window.removeEventListener('resize', handleResize)
	}, [])

	return mobilePage
}