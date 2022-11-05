import { Button, Group, Paper, Text, TextInput } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const API_KEY = '8757c55d2c1bec5973300a10ac2b863c';

export default function Home() {
	const [cityInput, setCityInput] = useState('');
	const [weatherData, setWeatherData] = useState<any>({});

	async function getWeatherData() {
		console.log('Button clicked');
		try {
			const serverResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
			);
			console.log(serverResponse);

			const data = await serverResponse.json();
			console.log(data);
			if (data?.code === '400') throw data;
			setWeatherData(data);
		} catch (error) {}
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Weather App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main
				style={{
					position: 'static',
					height: '100vh',
					backgroundImage: "url('https://unsplash.com/photos/HAl6CKxM3xU')",
					backgroundSize: 'cover',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<Paper withBorder p='lg' style={{ maxWidth: '500px' }}>
						<Group position='apart'>
							<Text size='xl' weight={500}>
								Get the Weather!
							</Text>
						</Group>
						<Group position='apart' mb='sm'>
							<Text size='lg'>Enter the city and get the weather below</Text>
						</Group>
						<Group position='apart' mb='md'>
							<TextInput
								label='City Name'
								placeholder='ex: New Delhi'
								onChange={(e) => setCityInput(e.target.value)}
							/>
						</Group>
						<Group position='apart'>
							<Button variant='gradient' size='md' onClick={() => getWeatherData()}>
								Get Weather
							</Button>
						</Group>
						{Object.keys(weatherData).length !== 0 ? (
							<>
								<Group position='apart'>
									<Text>{weatherData.name} Weather</Text>
								</Group>
								<Group position='apart'>
									<Image
										alt='icon'
										src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
										width='100'
										height='100'
									/>
									<Text>Currently {weatherData.main.temp} &deg; C</Text>
								</Group>
							</>
						) : null}
					</Paper>
				</div>
			</main>
		</div>
	);
}
