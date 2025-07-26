import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable({id, label, children}) {
	const {setNodeRef, isOver} = useDroppable({id});

	const statusColors = {
		new: 'border-blue-400',
		ongoing: 'border-orange-400',
		done: 'border-green-400',
	};

	return (
		<div>
			<h2 className="text-lg font-bold capitalize mb-2">{label}</h2>
			<div
				ref={setNodeRef}
				className={`min-h-[300px] p-4 rounded-lg border-2 bg-white ${statusColors[id]} ${isOver ? 'bg-gray-50' : ''}`}
			>
				{children}
			</div>
		</div>
	);
}
