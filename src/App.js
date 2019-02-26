import React, { useState, useEffect } from 'react';
import {
  Segment,
  Container,
  Header,
  Button,
  Card,
} from 'semantic-ui-react';

const questions = [
  {
    question: 'What is the answer to life, the universe and everything?',
    options: ['42', 'Yes', 'There is no answer'],
    answer: 0,
  },
  {
    question: 'What nationality are the members of the 80\'s pop band "A-ha"?',
    options: ['Swedish', 'Danish', 'Norwegian'],
    answer: 2,
  },
  {
    question: 'Who did Han Solo call an "old smoothie"? ',
    options: ['Chewbacca', 'Lando', 'Luke'],
    answer: 1,
  }
];

function useTimer(running) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, timeLeft]);

  return [timeLeft, setTimeLeft];
}

function useTriviaGame(timePerQuestion, amountOfQuestions) {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useTimer(playing);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startGame = () => {
    setPlaying(true);
    setTimeLeft(timePerQuestion);
    setCurrentQuestion(0);
  };
  const nextQuestion = () => {
    if (currentQuestion + 1 === amountOfQuestions) {
      setPlaying(false);
      setTimeLeft(0);
    } else {
      setTimeLeft(timePerQuestion);
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const gameOver = () => {
    setCurrentQuestion(0);
    setPlaying(false);
  };

  return [playing, timeLeft, currentQuestion, startGame, nextQuestion, gameOver];
}

function App() {
  const [
    playing,
    timeLeft,
    currentQuestion,
    startGame,
    nextQuestion,
    gameOver,
  ] = useTriviaGame(10, questions.length);

  const question = questions[currentQuestion];

  return (
    <>
      <Segment inverted>
        <Container text>
          <Header inverted>Awesome trivia game</Header>
        </Container>
      </Segment>
      <Segment vertical>
        <Container text>
          {(playing && timeLeft === 0) && (
            <>
              <Header>Time is up 😭</Header>
              <Button
                onClick={startGame}
                content="Start new game"
              />
            </>
          )}
          {(!playing && timeLeft > 0) && (
            <Header>Wrong! You lost 🙃</Header>
          )}
          {(!playing && currentQuestion > 0) && (
            <Header>🍕 YOU ARE A WINNER 🍕</Header>
          )}
          {!playing && (
            <>
              <p>
                {currentQuestion > 0 ? 'You won! Play again?' : 'Welcome to the awesome travia game!'}
              </p>
              <Button
                onClick={startGame}
                content="Start game"
              />
            </>
          )}
          {(playing && timeLeft > 0) && (
            <Card>
              <Card.Content>
                <Card.Header>
                  {question.question}
                </Card.Header>
              </Card.Content>
              <Card.Content>
                {question.options.map((option, index) => (
                  <Button
                    fluid
                    icon="right arrow"
                    labelPosition="left"
                    content={option}
                    onClick={question.answer === index ? nextQuestion : gameOver}
                  />
                ))}
              </Card.Content>
              <Card.Content extra>
                Time left: {timeLeft} seconds
              </Card.Content>
            </Card>
          )}
        </Container>
      </Segment>
    </>
  );
}

export default App;
