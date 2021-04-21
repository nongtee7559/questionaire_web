import React, { useState, useMemo } from 'react';
import './App.css';
import { Card, Button, TextField } from '@material-ui/core';
import QuestionCard from './components/QuestionCard'

const saveBtn = {
  backgroundColor: "#ff6600",
  paddingInline: "50px",
  color: "white",
  marginLeft: "10px"
};
const cancelBtn = {
  color: "#ff6600",
  borderColor: "#ff6600"
}

const App = () => {
  const [questions, setQuestions] = useState([{ name: "", answer: "0", choices: [{ describe: "" }] }]);

  const onAddQuestionBtnClick = () => {
    const choicesModel = { describe: "" }
    const questionModel = { name: "", answer: "0", choices: [choicesModel] }
    setQuestions(questions.concat(questionModel));
  };
  const onDuplicateBtnClick = question => {
    var questionTmp = Object.assign({}, question);
    setQuestions(questions.concat(questionTmp));
  }
  const onAddChoiceBtnClick = (index) => {
    const choicesModel = { describe: "" }
    let newArr = [...questions];
    newArr[index].choices.push(choicesModel);
    setQuestions(newArr);
  }
  const onDeleteQuestionBtnClick = (index) => {
    setQuestions(questions.filter((item, i) => i !== index));
  };
  const onDeleteChoiceBtnClick = (indexQ, indexC) => {
    let newArr = [...questions];
    newArr[indexQ].choices.splice(indexC, 1);
    setQuestions(newArr);
  };

  const questionNameChangedHandler = (e, index) => {
    let newArr = [...questions];
    newArr[index].name = e.target.value;
    setQuestions(newArr);
  }

  const choiceDescribeChangedHandler = (e, indexQ, indexC) => {
    let newArr = [...questions];
    newArr[indexQ].choices[indexC].describe = e.target.value;
    setQuestions(newArr);
  }

  const choiceAnswerChangedHandler = (e, index) => {
    let newArr = [...questions];
    newArr[index].answer = e.target.value;
    setQuestions(newArr);
  }

  return (
    <div>
      <header>
        <Card>
          <h3 className="logo">Foxbith Questionnaire</h3>
          <div className="btn-group">
            <Button style={cancelBtn} variant="outlined" >
              CANCEL
            </Button>
            <Button style={saveBtn} >
              SAVE
            </Button>
          </div>
        </Card>
      </header>
      <section>
        <div className="card-header">
          <Card className="card">
            <h4>Questionnaire Detail</h4>
            <form noValidate autoComplete="off">
              <TextField required fullWidth label="Name" variant="outlined" />
            </form>
          </Card>
        </div>
        {
          questions.map((question, index) =>
            <QuestionCard
              error={question.name == ""}
              number={index}
              key={index}
              onQuestionChange={(e) => questionNameChangedHandler(e, index)}
              onDupClick={() => onDuplicateBtnClick(question)}
              onDeleteQuestionClick={(() => onDeleteQuestionBtnClick(index))}
              onDeleteChoiceClick={onDeleteChoiceBtnClick}
              onChoiceChange={choiceDescribeChangedHandler}
              onAnswerChange={choiceAnswerChangedHandler}
              onAddClick={() => onAddChoiceBtnClick(index)}
              question={question} />)
        }
      </section>
      <footer>
        <div className="card-question">
          <Card className="card" style={{ paddingTop: 20 }}>
            <Button style={cancelBtn} variant="outlined" fullWidth onClick={onAddQuestionBtnClick} >
              +  ADD QUESTION
            </Button>
          </Card>
        </div>
      </footer>
    </div >
  );
}

export default App;
