const Part = ({part}) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({parts}) => 
  <>
    {parts.map(part => <Part key = {part.id} part = {part} />)}   
  </>

const Header = ({course}) => 
  <h3>
    {course.name}
  </h3>

const Course = ({course}) => {
  const total = course.parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  return (
  <>
    <Header course = {course}/ >
    <Content parts = {course.parts}/ >
    <h4>total of {total} exercises</h4>
  </>
  )
}

export default Course