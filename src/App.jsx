import './App.css'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'

function App() {
	const newItem = () => {
		if (item.trim() !== '') {
			const newItem = {
				id: uuidv4(),
				item: item,
				color: randomColor({
					luminosity: 'light',
				}),
				defaultPos: {
					x: 500,
					y: -500,
				},
			}
			setItems(items => [...items, newItem])
			setItem('')
		} else {
			alert('Enter Something...')
			setItem('')
		}
	}
	const valueS = localStorage.getItem('items')
	const [item, setItem] = useState('')
	const [items, setItems] = useState(JSON.parse(valueS) || [])

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])
	const deleteNode = id => {
		setItems(items.filter(item => item.id !== id))
	}
	const updatePos = (data, index) => {
		let newArray = [...items]
		newArray[index].defaultPos = { x: data.x, y: data.y }
		setItems(newArray)
	}
	const keyPress = e => {
		const code = e.keyCode || e.which
		if (code === 13) {
			newItem()
		}
	}

	return (
		<div className='App'>
			<div className='wrapper'>
				<input
					placeholder='Enter something...'
					value={item}
					onChange={e => {
						setItem(e.target.value)
					}}
					onKeyPress={e => {
						keyPress(e)
					}}
				/>
				<button className='enter' onClick={newItem}>
					ENTER
				</button>
			</div>
			{items.map((item, index) => {
				return (
					<Draggable
						key={index}
						defaultPosition={item.defaultPos}
						onStop={(_, data) => {
							updatePos(data, index)
						}}
					>
						<div className='todo_item' style={{ backgroundColor: item.color }}>
							{`${item.item}`}
							<button className='delete' onClick={() => deleteNode(item.id)}>
								X
							</button>
						</div>
					</Draggable>
				)
			})}
		</div>
	)
}

export default App
