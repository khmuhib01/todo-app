import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from '../../components/common/Droppable';
import {Draggable} from '../../components/common/Draggable';

const initialTodos = [
	{id: 'task-1', title: 'Buy groceries', description: 'Milk, Bread, Eggs', status: 'new'},
	{id: 'task-2', title: 'Start project', description: 'Create wireframes', status: 'ongoing'},
	{id: 'task-3', title: 'Push to GitHub', description: 'Commit & push code', status: 'done'},
];

export default function Todo() {
	const [todos, setTodos] = useState(initialTodos);

	const handleDragEnd = (event) => {
		const {active, over} = event;
		if (over && active.id !== over.id) {
			setTodos((prev) => prev.map((todo) => (todo.id === active.id ? {...todo, status: over.id} : todo)));
		}
	};

	const getTodosByStatus = (status) => todos.filter((t) => t.status === status);

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold text-center mb-6">Kanban Todo Board</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{['new', 'ongoing', 'done'].map((status) => (
						<Droppable key={status} id={status} label={status}>
							{getTodosByStatus(status).map((todo) => (
								<Draggable key={todo.id} id={todo.id}>
									<div className="p-3 bg-white rounded shadow border">
										<h2 className="font-semibold">{todo.title}</h2>
										<p className="text-sm text-gray-600">{todo.description}</p>
									</div>
								</Draggable>
							))}
						</Droppable>
					))}
				</div>
			</div>
		</DndContext>
	);
}
