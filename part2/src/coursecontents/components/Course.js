import React from 'react'

const Course = ({ courses }) => {
	
	return (
		<>
			{
				courses.map(course => 
					<div key={course.id}>
					<h1 key={course.id}>{course.name}</h1>
						{course.parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
						<b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
					</div>
				)
			}
		</>
	)
}

export default Course