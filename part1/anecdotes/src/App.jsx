import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setSelectedPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  function selectNextAnnecdote() {
    const randomAnnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnnecdoteIndex);
  }

  function voteAnecdote() {
    const newPoints = { ...points };
    newPoints[selected] += 1;
    setSelectedPoints(newPoints);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        <div>{anecdotes[selected]}</div>
        <VoteAnectdoteButton voteAnecdote={voteAnecdote}></VoteAnectdoteButton>
        <NextAnecdoteButton
          selectNextAnnecdote={selectNextAnnecdote}
        ></NextAnecdoteButton>
      </div>
      <div>
        <AnectdoteWithMostVotes
          anecdotes={anecdotes}
          points={points}
        ></AnectdoteWithMostVotes>
      </div>
    </div>
  );
};

const NextAnecdoteButton = (props) => {
  const { selectNextAnnecdote } = props;
  return (
    <button
      onClick={() => {
        selectNextAnnecdote();
      }}
    >
      next annecdote
    </button>
  );
};

const VoteAnectdoteButton = (props) => {
  const { voteAnecdote } = props;
  return (
    <button
      onClick={() => {
        voteAnecdote();
      }}
    >
      vote
    </button>
  );
};

const AnectdoteWithMostVotes = (props) => {
  const { anecdotes, points } = props;
  const anecdoteWithMostVotes = getAnecdoteWithMostVotes();
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdoteWithMostVotes}</p>
    </div>
  );

  function getAnecdoteWithMostVotes() {
    let maxPoints = Number.NEGATIVE_INFINITY;
    let selectedAnecdote = anecdotes[0];
    for (const key in points) {
      const curPoint = points[key];
      if (curPoint > maxPoints) {
        maxPoints = curPoint;
        selectedAnecdote = anecdotes[key];
      }
    }

    return selectedAnecdote;
  }
};

export default App;
