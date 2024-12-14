import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Feedback
        title="give feedback"
        updateCategory={updateCategory}
      ></Feedback>
      <Statistics
        title="statistics"
        good={good}
        neutral={neutral}
        bad={bad}
      ></Statistics>
    </div>
  );

  function updateCategory(type) {
    switch (type.toLowerCase()) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  }
}

const Feedback = (props) => {
  const { title, updateCategory } = props;
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Button type="good" updateCategory={updateCategory}></Button>
        <Button type="neutral" updateCategory={updateCategory}></Button>
        <Button type="bad" updateCategory={updateCategory}></Button>
      </div>
    </div>
  );
};

const Button = (props) => {
  const { type, updateCategory } = props;
  return (
    <button
      onClick={() => {
        updateCategory(type);
      }}
    >
      {type}
    </button>
  );
};

const Statistics = (props) => {
  const { title, good, neutral, bad } = props;
  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>;
  }
  const total = good + neutral + bad;
  const average = (good + -1 * bad) / total;
  const positive = `${(good / total) * 100} %`;
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}></StatisticLine>
            <StatisticLine text="neutral" value={neutral}></StatisticLine>
            <StatisticLine text="bad" value={bad}></StatisticLine>
            <StatisticLine text="all" value={total}></StatisticLine>
            <StatisticLine text="average" value={average}></StatisticLine>
            <StatisticLine text="positive" value={positive}></StatisticLine>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
