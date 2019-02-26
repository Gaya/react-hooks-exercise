import React, { Component } from 'react';
import {
  Segment,
  Container,
  Header,
  Button,
  Card,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import './App.css';

class App extends Component {
  state = {
    playing: false,
    timeLeft: 0,
    currentQuestion: 0,
  };

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      const { playing, timeLeft } = this.state;

      if (playing && timeLeft > 0) {
        this.setState({
          timeLeft: timeLeft - 1,
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  startGame = () => {
    this.setState({
      playing: true,
      timeLeft: this.timePerQuestion,
      currentQuestion: 0,
    });
  };

  nextQuestion = () => {
    const { currentQuestion } = this.state;

    if (currentQuestion + 1 === this.questions.length) {
      this.setState({
        playing: false,
        timeLeft: 0,
      });
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        timeLeft: this.timePerQuestion,
      });
    }
  };

  gameOver = () => {
    this.setState({
      currentQuestion: 0,
      playing: false,
    });
  };

  timePerQuestion = 20;

  questions = [
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

  render() {
    const { playing, timeLeft, currentQuestion } = this.state;

    const question = this.questions[currentQuestion];

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
                  onClick={this.startGame}
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
                  onClick={this.startGame}
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
                      onClick={question.answer === index ? this.nextQuestion : this.gameOver}
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
}

export default App;
