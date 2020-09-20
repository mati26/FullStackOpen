import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
  return <h1>{name}</h1>;
};

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.name}
    </button>
);

const Statistic = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
);

const Statistics = (props) => {
  const input = props.input;
  const sum = input.reduce((a, b) => a + b, 0);
  if (sum > 0) {
    return (
        <div>
          <table>
            <tbody>
            <Statistic text="good" value={input[0]}/>
            <Statistic text="neutral" value={input[1]}/>
            <Statistic text="bad" value={input[2]}/>
            <Statistic text="all" value={sum}/>
            <Statistic text="average" value={(input[0] * 1 + input[1] * 0 + input[2] * (-1)) / sum}/>
            <Statistic text="positive" value={input[0] * 100 / sum + ' %'}/>
            </tbody>
          </table>
        </div>
    );
  }
  return <div>No feedback given</div>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
      <div>
        <Header name="give feedback"/>
        <Button name="good" handleClick={() => setGood(good + 1)}/>
        <Button name="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button name="bad" handleClick={() => setBad(bad + 1)}/>
        <Header name="statistics"/>
        <Statistics input={[good, neutral, bad]}/>
      </div>
  );
};

ReactDOM.render(<App/>,
    document.getElementById('root'),
);