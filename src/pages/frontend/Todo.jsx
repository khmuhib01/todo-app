import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from '../../components/common/Droppable';
import {Draggable} from '../../components/common/Draggable';
import AddCardModal from '../../components/common/AddCardModal';
import {v4 as uuidv4} from 'uuid';
import {FaRegFileAlt, FaRegClipboard, FaHashtag} from 'react-icons/fa';

const initialTodos = [
	/* your tasks */
];

export default function Todo() {
	const [todos, setTodos] = useState(initialTodos);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDragEnd = (event) => {
		const {active, over} = event;
		if (over && active.id !== over.id) {
			setTodos((prev) => prev.map((todo) => (todo.id === active.id ? {...todo, status: over.id} : todo)));
		}
	};

	const handleAddNew = ({title, description}) => {
		const code = '#' + Math.floor(Math.random() * 10000);
		setTodos((prev) => [
			{
				id: uuidv4(),
				title,
				description,
				code,
				status: 'new',
			},
			...prev,
		]);
	};

	const getTodosByStatus = (status) => todos.filter((t) => t.status === status);

	const statusList = ['new', 'ongoing', 'done'];

	const getStatusLabel = (s) => (s === 'new' ? 'New' : s === 'ongoing' ? 'Ongoing' : 'Done');

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-4xl font-bold mb-6 text-center">Todo List</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{statusList.map((status) => (
						<div key={status} className="bg-gray-300 p-3 rounded-md shadow-md border border-gray-400">
							<div className="flex justify-between items-center mb-2">
								<h2 className="font-semibold text-sm">{getStatusLabel(status)}</h2>
								<button className="text-gray-400 hover:text-gray-600">•••</button>
							</div>
							<Droppable id={status}>
								{getTodosByStatus(status).map((todo) => (
									<Draggable key={todo.id} id={todo.id}>
										<div className="bg-white p-3 rounded-md shadow-sm mb-3 border border-gray-200">
											<h3 className="text-sm font-medium mb-1">{todo.title}</h3>
											<p className="text-xs text-gray-500 mb-2">{todo.description}</p>
											<div className="flex text-xs text-gray-500 gap-4 items-center mb-2">
												<span className="flex items-center gap-1">
													<FaRegClipboard className="text-gray-400" /> 1
												</span>
												<span className="flex items-center gap-1">
													<FaRegFileAlt className="text-gray-400" /> 1
												</span>
												<span className="flex items-center gap-1">
													<FaHashtag className="text-gray-400" /> {todo.code}
												</span>
											</div>
											<span
												className={`inline-block px-2 py-0.5 text-xs rounded ${
													todo.status === 'new'
														? 'bg-blue-100 text-blue-800'
														: todo.status === 'ongoing'
														? 'bg-orange-100 text-orange-800'
														: 'bg-green-100 text-green-800'
												}`}
											>
												{todo.status.toUpperCase()}
											</span>
										</div>
									</Draggable>
								))}
							</Droppable>
							{status === 'new' && (
								<button
									className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
									onClick={() => setIsModalOpen(true)}
								>
									+ Add a card
								</button>
							)}
						</div>
					))}
				</div>

				{/* Modal */}
				<AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNew} />
			</div>
		</DndContext>
	);
}
