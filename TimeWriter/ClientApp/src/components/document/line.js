﻿import React, { Component } from 'react';
import Caret from './caret';

export default class Line extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.text !== nextProps.text;
	}

	render() {
		let text = this.props
			.text
			.split('if')
			.reduce((p, c, i) => i === 0 ? [c] : [...p, <span style={{ color: 'red' }}>if</span>, c]);

		return (
			<div className="line">
				{text}
			</div>
		);
	}
}