import React, {useState, useEffect} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from '../../components/common/Droppable';
import {Draggable} from '../../components/common/Draggable';
import AddCardModal from '../../components/common/AddCardModal';
import {v4 as uuidv4} from 'uuid';

export default function Todo() {
	// const [todos, setTodos] = useState([]);
	const [todos, setTodos] = useState(() => {
		const saved = localStorage.getItem('kanban_todos');
		return saved ? JSON.parse(saved) : [];
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [contextMenu, setContextMenu] = useState(null);
	const [dueModal, setDueModal] = useState({isOpen: false, todoId: null});
	const [dueInput, setDueInput] = useState('');
	const [overduePopup, setOverduePopup] = useState(false);
	const [editModal, setEditModal] = useState({isOpen: false, todo: null});
	const [editForm, setEditForm] = useState({title: '', description: ''});
    const [deleteConfirm, setDeleteConfirm] = useState({isOpen: false, todoId: null});

		useEffect(() => {
			document.addEventListener('click', () => setContextMenu(null));
			return () => document.removeEventListener('click', () => setContextMenu(null));
		}, []);

		useEffect(() => {
			const saved = localStorage.getItem('kanban_todos');
			if (saved) setTodos(JSON.parse(saved));
		}, []);

		useEffect(() => {
			localStorage.setItem('kanban_todos', JSON.stringify(todos));
		}, [todos]);

		useEffect(() => {
			const now = new Date();
			const overdueTasks = todos.filter((t) => t.status === 'ongoing' && t.dueTime && new Date(t.dueTime) < now);
			setOverduePopup(overdueTasks.length > 0);
		}, [todos]);

		const handleDragEnd = (event) => {
			const {active, over} = event;
			if (!over || active.id === over.id) return;

			const activeTodo = todos.find((t) => t.id === active.id);
			if (!activeTodo || activeTodo.status === over.id) return;

			if (over.id === 'ongoing') {
				setDueModal({isOpen: true, todoId: active.id});
				return;
			}

			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === active.id
						? {...todo, status: over.id, completedAt: over.id === 'done' ? new Date() : todo.completedAt}
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
			if (newStatus === 'ongoing') {
				setDueModal({isOpen: true, todoId: contextMenu.todo.id});
				setContextMenu(null);
				return;
			}

			const now = new Date();
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === contextMenu.todo.id
						? {...todo, status: newStatus, completedAt: newStatus === 'done' ? now : todo.completedAt}
						: todo
				)
			);
			setContextMenu(null);
		};

		const confirmDueTime = () => {
			const due = dueInput ? new Date(dueInput) : null;
			if (!due || isNaN(due.getTime())) {
				alert('Please enter a valid date-time');
				return;
			}
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === dueModal.todoId
						? {...todo, status: 'ongoing', dueTime: due.toISOString(), movedAt: new Date()}
						: todo
				)
			);
			setDueModal({isOpen: false, todoId: null});
			setDueInput('');
		};

		const getTodosByStatus = (status) => {
			const filtered = todos.filter((t) => t.status === status);
			if (status === 'ongoing') return filtered.sort((a, b) => new Date(a.movedAt) - new Date(b.movedAt));
			if (status === 'done') return filtered.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
			return filtered;
		};

		const openEditModal = (todo) => {
			setEditForm({title: todo.title, description: todo.description});
			setEditModal({isOpen: true, todo});
		};

		const saveEdit = () => {
			setTodos((prev) =>
				prev.map((t) =>
					t.id === editModal.todo.id ? {...t, title: editForm.title, description: editForm.description} : t
				)
			);
			setEditModal({isOpen: false, todo: null});
		};

		const deleteTodo = (id) => {
			setTodos((prev) => prev.filter((t) => t.id !== id));
		};

		const statusList = ['new', 'ongoing', 'done'];

		return (
			<DndContext onDragEnd={handleDragEnd}>
				<div className="min-h-screen bg-gray-100 p-6">
					<h1 className="text-3xl font-bold text-center mb-6">Kanban Todo List</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{statusList.map((status) => (
							<div key={status} className="bg-gray-200 p-4 rounded-md shadow-md">
								<h2 className="text-lg font-semibold mb-2 capitalize">{status}</h2>
								<Droppable id={status}>
									{getTodosByStatus(status).map((todo) => (
										<Draggable key={todo.id} id={todo.id}>
											<div
												className="bg-white rounded p-3 mb-3 shadow border relative"
												onContextMenu={(e) => handleRightClick(e, todo)}
											>
												<h3 className="font-semibold text-sm">{todo.title}</h3>
												<p className="text-xs text-gray-600 mb-1">{todo.description}</p>
												<p className="text-[11px] text-gray-400">Code: {todo.code}</p>
												<span
													className={`inline-block text-[10px] font-semibold px-2 py-1 rounded mt-1
		${
			todo.status === 'new'
				? 'bg-blue-100 text-blue-700'
				: todo.status === 'ongoing'
				? 'bg-orange-100 text-orange-700'
				: 'bg-green-100 text-green-700'
		}
	`}
												>
													{todo.status.toUpperCase()}
												</span>

												{status === 'ongoing' && todo.dueTime && (
													<p className="text-xs text-red-600 mt-1">Due: {new Date(todo.dueTime).toLocaleString()}</p>
												)}
											</div>
										</Draggable>
									))}
								</Droppable>
								{status === 'new' && (
									<button onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 mt-2 hover:underline">
										+ Add a card
									</button>
								)}
							</div>
						))}
					</div>

					<AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNew} />

					{contextMenu && (
						<div
							className="fixed bg-white border rounded shadow z-50"
							style={{top: contextMenu.y, left: contextMenu.x, minWidth: 160}}
						>
							{/* Move Options */}
							{statusList
								.filter((s) => s !== contextMenu.todo.status)
								.map((s) => (
									<button
										key={s}
										className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
										onClick={() => handleMoveTo(s)}
									>
										Move to {s}
									</button>
								))}

							<hr className="my-1" />

							{/* Edit Option */}
							<button
								className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-blue-600"
								onClick={() => {
									openEditModal(contextMenu.todo);
									setContextMenu(null);
								}}
							>
								Edit
							</button>

							{/* Delete Option */}
							<button
								className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-600"
								onClick={() => {
									setDeleteConfirm({isOpen: true, todoId: contextMenu.todo.id});
									setContextMenu(null);
								}}
							>
								Delete
							</button>
						</div>
					)}

					{dueModal.isOpen && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
							<div className="bg-white p-5 rounded shadow w-full max-w-md">
								<h3 className="text-lg font-semibold mb-4">Set Due Time</h3>
								<input
									type="datetime-local"
									className="w-full border px-3 py-2 rounded mb-4"
									value={dueInput}
									onChange={(e) => setDueInput(e.target.value)}
								/>
								<div className="flex justify-end gap-2">
									<button onClick={() => setDueModal({isOpen: false, todoId: null})}>Cancel</button>
									<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={confirmDueTime}>
										Set
									</button>
								</div>
							</div>
						</div>
					)}

					{editModal.isOpen && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
							<div className="bg-white p-6 rounded shadow w-full max-w-md">
								<h3 className="text-lg font-bold mb-4">Edit Task</h3>
								<input
									className="w-full mb-2 border px-3 py-2 rounded"
									value={editForm.title}
									onChange={(e) => setEditForm({...editForm, title: e.target.value})}
									placeholder="Title"
								/>
								<textarea
									className="w-full mb-4 border px-3 py-2 rounded"
									value={editForm.description}
									onChange={(e) => setEditForm({...editForm, description: e.target.value})}
									placeholder="Description"
								/>
								<div className="flex justify-end gap-2">
									<button onClick={() => setEditModal({isOpen: false, todo: null})}>Cancel</button>
									<button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded">
										Save
									</button>
								</div>
							</div>
						</div>
					)}

					{deleteConfirm.isOpen && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
							<div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
								<h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
								<p className="text-sm mb-4">Are you sure you want to delete this task?</p>
								<div className="flex justify-center gap-4">
									<button
										className="px-4 py-2 rounded bg-gray-300"
										onClick={() => setDeleteConfirm({isOpen: false, todoId: null})}
									>
										Cancel
									</button>
									<button
										className="px-4 py-2 rounded bg-red-600 text-white"
										onClick={() => {
											deleteTodo(deleteConfirm.todoId);
											setDeleteConfirm({isOpen: false, todoId: null});
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					)}

					{overduePopup && (
						<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
							<div className="bg-white p-6 rounded shadow-lg text-center max-w-md">
								<h2 className="text-xl text-red-600 mb-2">⚠️ Overdue Alert</h2>
								<p className="mb-4">Some ongoing tasks are overdue!</p>
								<button onClick={() => setOverduePopup(false)} className="bg-red-600 text-white px-4 py-2 rounded">
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</DndContext>
		);
}
