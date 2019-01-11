export default class EventFactory {
	prepareKeyDownEvents(e) {
		const key = e.keyCode;
		const char = e.key;

		if (key === 86 && e.ctrlKey)
			return [];
		if (key === 90 && e.ctrlKey)
			return [this.prepareUndoEvent()];
		if (key === 89 && e.ctrlKey)
			return [this.prepareRedoEvent()];
		if (key === 37)
			return [this.prepareMoveLeftEvent(e.ctrlKey, e.shiftKey)];
		if (key === 39)
			return [this.prepareMoveRightEvent(e.ctrlKey, e.shiftKey)];
		if (key === 38)
			return [this.prepareMoveUpEvent(e.shiftKey)];
		if (key === 40)
			return [this.prepareMoveDownEvent(e.shiftKey)];
		if (key === 8)
			return [this.prepareBackwardDeleteEvent(e.ctrlKey)];
		if (key === 46)
			return [this.prepareForwardDeleteEvent(e.ctrlKey)];
		if (key === 13)
			return [this.prepareInsertEvent('\n')];
		if (key === 9)
			return [this.prepareInsertEvent('\t')];
		if (key === 32)
			return [this.prepareInsertEvent(' ')];
		if (key >= 48 && key <= 90 || key >= 96 && key <= 111 || key >= 186 && key <= 222)
			return [this.prepareInsertEvent(char)];
		return [];
	}

	prepareClickEvents(e, coordinates) {
		if (e.shiftKey)
			return [this.prepareSelectEvent(coordinates)]
		return [
			this.prepareRemoveCaretsEvent(),
			this.prepareAddCaretEvent(coordinates)
		]
	}

	prepareUndoEvent() {
		return { type: 'undo' };
	}

	prepareRedoEvent() {
		return { type: 'redo' };
	}

	prepareMoveLeftEvent(fast, select) {
		return { type: 'navigate', mode: 'move-horizontally', direction: 'left', fast: !!fast, select: !!select };
	}

	prepareMoveRightEvent(fast, select) {
		return { type: 'navigate', mode: 'move-horizontally', direction: 'right', fast: !!fast, select: !!select };
	}

	prepareMoveUpEvent(select) {
		return { type: 'navigate', mode: 'move-vertically', direction: 'up', select: !!select };
	}

	prepareMoveDownEvent(select) {
		return { type: 'navigate', mode: 'move-vertically', direction: 'down', select: !!select };
	}

	prepareBackwardDeleteEvent(fast) {
		return { type: 'delete', mode: 'backward', fast: !!fast };
	}

	prepareForwardDeleteEvent(fast) {
		return { type: 'delete', mode: 'forward', fast: !!fast };
	}

	prepareInsertEvent(text) {
		return { type: 'insert', text };
	}

	prepareAddCaretEvent(coordinates) {
		return { type: 'manage-carets', operation: 'add-caret', coordinates };
	}

	prepareRemoveCaretsEvent() {
		return { type: 'manage-carets', operation: 'remove-carets' };
	}

	prepareSelectEvent(coordinates) {
		return { type: 'manage-carets', operation: 'select', coordinates };
	}
}