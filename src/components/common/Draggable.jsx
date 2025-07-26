import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable({id, children}) {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({id});

	const style = {
		transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes} className="mb-3 cursor-grab">
			{children}
		</div>
	);
}
