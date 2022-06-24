import './App.css'

import { useEffect, useState } from 'react'

import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from 'react-icons/fa'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

function App() {
	const url = 'https://randomuser.me/api/?results=20'
	const defaultImage = 'https://randomuser.me/api/portraits/men/14.jpg'

	const [randomPerson, setRandomPerson] = useState(null)
	const [title, setTitle] = useState('name')
	const [value, setValue] = useState('random person')

	const fetchRandomPerson = async () => {
		const response = await fetch(url)
		const data = await response.json()

		const person = data.results[0]

		const {
			phone,
			email,
			login: { username },
			name: { first, last },
			dob: { age },
			picture: { large: image },
			location: {
				street: { number, name },
			},
		} = person

		const newPerson = {
			image,
			phone,
			email,
			username,
			age,
			street: `${number} ${name}`,
			name: `${first} ${last}`,
		}

		setRandomPerson(newPerson)
		setTitle('name')
		setValue(newPerson.name)
	}

	useEffect(() => {
		fetchRandomPerson()
	}, [])

	const handleValue = (e) => {
		if (e.target.classList.contains('icon')) {
			const newValue = e.target.dataset.id
			setTitle(newValue)
			setValue(randomPerson[newValue])
		}
	}

	return (
		<>
			<header>
				<div className="cabecera">
					<h1>Profiles App</h1>
					<h3>From Html to Api Rest</h3>
				</div>
			</header>

			<div className="Card">
				<div className="Foto">
					<img
						src={(randomPerson && randomPerson.image) || defaultImage}
						alt="random person"
						className="user-img"
					/>
				</div>

				<div className="Flechas">
					<button className="Button" type="button" onClick={fetchRandomPerson}>
						<AiOutlineArrowLeft></AiOutlineArrowLeft>
					</button>
					<button className="Button" type="button" onClick={fetchRandomPerson}>
						<AiOutlineArrowRight></AiOutlineArrowRight>
					</button>
				</div>

				<p className="user-title">Hi my {title} is</p>
				<p className="user-value">{value}</p>
				<div className="values-list">
					<button className="icon" data-id="name" onMouseOver={handleValue}>
						<FaUser></FaUser>
					</button>
					<button className="icon" data-id="email" onMouseOver={handleValue}>
						<FaEnvelopeOpen></FaEnvelopeOpen>
					</button>
					<button className="icon" data-id="age" onMouseOver={handleValue}>
						<FaCalendarTimes></FaCalendarTimes>
					</button>
					<button className="icon" data-id="street" onMouseOver={handleValue}>
						<FaMap></FaMap>
					</button>
					<button className="icon" data-id="phone" onMouseOver={handleValue}>
						<FaPhone></FaPhone>
					</button>
					<button className="icon" data-id="username" onMouseOver={handleValue}>
						<FaLock></FaLock>
					</button>
				</div>
			</div>
		</>
	)
}

export default App
