import React, {useState, useEffect} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from '../../components/common/Droppable';
import {Draggable} from '../../components/common/Draggable';
import AddCardModal from '../../components/common/AddCardModal';
import {v4 as uuidv4} from 'uuid';
import {FaRegFileAlt, FaRegClipboard, FaHashtag} from 'react-icons/fa';

const initialTodos = [];

export default function Todo() {
	const [todos, setTodos] = useState(initialTodos);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [contextMenu, setContextMenu] = useState(null);
	const [dueModal, setDueModal] = useState({isOpen: false, todoId: null});
	const [dueInput, setDueInput] = useState('');

	useEffect(() => {
		const close = () => setContextMenu(null);
		document.addEventListener('click', close);
		return () => document.removeEventListener('click', close);
	}, []);

	useEffect(() => {
		const now = new Date();
		const overdueTasks = todos.filter((t) => t.status === 'ongoing' && t.dueTime && new Date(t.dueTime) < now);
		if (overdueTasks.length > 0) {
			alert(`⚠️ ${overdueTasks.length} ongoing task(s) are overdue!`);
		}
	}, [todos]);

	const handleDragEnd = (event) => {
		const {active, over} = event;
		if (!over || active.id === over.id) return;

		const activeTodo = todos.find((t) => t.id === active.id);
		if (!activeTodo || activeTodo.status === over.id) return;

		// If dragged into ongoing, open due time modal
		if (over.id === 'ongoing') {
			setDueModal({isOpen: true, todoId: active.id});
			return; // Don't update status yet — wait for user input
		}

		// Else move directly
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === active.id
					? {
							...todo,
							status: over.id,
							completedAt: over.id === 'done' ? new Date() : todo.completedAt,
					  }
					: todo
			)
		);
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

	const handleRightClick = (event, todo) => {
		event.preventDefault();
		setContextMenu({x: event.clientX, y: event.clientY, todo});
	};

	const handleMoveTo = (newStatus) => {
		if (!contextMenu?.todo) return;
		const now = new Date();

		if (newStatus === 'ongoing') {
			setDueModal({isOpen: true, todoId: contextMenu.todo.id});

			// 👇 Delay hiding contextMenu so modal can open first
			setTimeout(() => {
				setContextMenu(null);
			}, 0);

			return;
		}

		setTodos((prev) =>
			prev.map((todo) => {
				if (todo.id !== contextMenu.todo.id) return todo;
				if (newStatus === 'done') {
					return {...todo, status: newStatus, completedAt: now};
				}
				return {...todo, status: newStatus};
			})
		);
		setContextMenu(null);
	};

	const confirmDueTime = () => {
		const now = new Date();
		const due = dueInput ? new Date(dueInput) : null;
		if (!due || isNaN(due.getTime())) {
			alert('Please enter a valid date-time');
			return;
		}
		setTodos((prev) =>
			prev.map((todo) => {
				if (todo.id !== dueModal.todoId) return todo;
				return {
					...todo,
					status: 'ongoing',
					movedAt: now,
					dueTime: due.toISOString(),
				};
			})
		);
		setDueModal({isOpen: false, todoId: null});
		setDueInput('');
	};

	const getTodosByStatus = (status) => {
		const filtered = todos.filter((t) => t.status === status);
		if (status === 'ongoing') {
			return filtered.sort((a, b) => new Date(a.movedAt || 0) - new Date(b.movedAt || 0));
		}
		if (status === 'done') {
			return filtered.sort((a, b) => new Date(a.completedAt || 0) - new Date(b.completedAt || 0));
		}
		return filtered;
	};

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
							</div>
							<Droppable id={status}>
								{getTodosByStatus(status).map((todo) => (
									<Draggable key={todo.id} id={todo.id}>
										<div
											onContextMenu={(e) => handleRightClick(e, todo)}
											className="bg-white p-3 rounded-md shadow-sm mb-3 border border-gray-200"
										>
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
											{todo.status === 'ongoing' && todo.dueTime && (
												<p className="text-xs text-red-600 font-medium mt-1">
													Due: {new Date(todo.dueTime).toLocaleString()}
												</p>
											)}
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

				<AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNew} />

				{/* Right-click menu */}
				{contextMenu && (
					<div
						className="fixed bg-white shadow-md rounded border border-gray-200 z-50"
						style={{
							top: contextMenu.y,
							left: contextMenu.x,
							minWidth: '160px',
						}}
					>
						{['new', 'ongoing', 'done']
							.filter((status) => status !== contextMenu.todo.status)
							.map((status) => (
								<button
									key={status}
									onClick={(e) => {
										e.stopPropagation();
										handleMoveTo(status);
									}}
									className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
								>
									Move to {status.charAt(0).toUpperCase() + status.slice(1)}
								</button>
							))}
					</div>
				)}

				{/* Due Time Modal */}
				{dueModal.isOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white rounded p-6 w-full max-w-md shadow-xl">
							<h2 className="text-lg font-semibold mb-4">Set Due Time</h2>
							<input
								type="datetime-local"
								className="w-full border rounded px-3 py-2 mb-4"
								value={dueInput}
								onChange={(e) => setDueInput(e.target.value)}
							/>
							<div className="flex justify-end gap-2">
								<button
									onClick={() => setDueModal({isOpen: false, todoId: null})}
									className="bg-gray-300 px-4 py-2 rounded"
								>
									Cancel
								</button>
								<button onClick={confirmDueTime} className="bg-blue-600 text-white px-4 py-2 rounded">
									Set Due Time
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</DndContext>
	);
}
