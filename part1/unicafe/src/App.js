import { useState } from 'react'

const Header = ({text}) => (
  <h1>
    {text}
  </h1>
)

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => (
  <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </tbody>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (total != 0) {
    return (
      <table>
        <StatisticLine text = 'good' value = {good} />
        <StatisticLine text = 'neutral' value = {neutral} />
        <StatisticLine text = 'bad' value = {bad} />
        <StatisticLine text = 'all' value = {total} />
        <StatisticLine text = 'average' value = {(good * 1 + neutral * 0 + bad * (-1)) / total} />
        <StatisticLine text = 'positive' value = {(good / total) * 100 + " %"} />
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const text1 = 'give feedback'
  const text2 = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text = {text1} />
      <Button handleClick = {handleGood} text = 'good' />
      <Button handleClick = {handleNeutral} text = 'neutral' />
      <Button handleClick = {handleBad} text = 'bad' />
      <Header text = {text2} />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App