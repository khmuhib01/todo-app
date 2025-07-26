import {useState, useEffect} from 'react';

export default function AddCardModal({isOpen, onClose, onSubmit}) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (isOpen) {
			setTitle('');
			setDescription('');
		}
	}, [isOpen]);

	const handleSubmit = () => {
		if (title.trim() && description.trim()) {
			onSubmit({title, description});
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
				<h2 className="text-lg font-semibold mb-4">Add New Task</h2>
				<input
					type="text"
					placeholder="Enter task title"
					className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="Enter task description"
					className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none"
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div className="flex justify-end gap-2">
					<button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 text-sm">
						Cancel
					</button>
					<button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white text-sm">
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
