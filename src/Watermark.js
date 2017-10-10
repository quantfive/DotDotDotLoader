/***
* watermark of deployed by helloDeploy
*/
import React from 'react'

import './Watermark.css'

export default class Watermark extends React.Component {
	render() {
		return (
			<a href='https://www.hellodeploy.com' target='_blank' rel="noopener noreferrer">
				<div className='watermark'>
					Deployed by <span className='hello'>Hello</span><span className='deploy'>Deploy</span>
				</div>
			</a>
		)
	}
}
