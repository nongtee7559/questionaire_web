import { Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../App.css';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const QuestionCard = (props) => {
    console.log(props.question);
    return (
        <div className="card-question">
            <Card className="card">
                <h4>Qestion {props.number + 1}</h4>
                <TextField
                    fullWidth
                    value={props.question.name}
                    required
                    error={props.error}
                    helperText={props.error ? "Please fill this question" : null}
                    label="Question"
                    variant="outlined"
                    onChange={props.onQuestionChange} />
                <FormControl component="fieldset" fullWidth >
                    <RadioGroup aria-label="choices" name="choices" value={props.question.answer} onChange={(e) => props.onAnswerChange(e, props.number)} >
                        {props.question.choices.map((choice, index) =>
                            <div key={index} style={{ paddingTop: 20 }}>
                                <FormControlLabel
                                    value={index.toString()}
                                    control={<Radio />}
                                    label={<TextField
                                        error={choice.describe == ""}
                                        required
                                        value={choice.describe}
                                        variant="outlined"
                                        onChange={(e) => props.onChoiceChange(e, props.number, index)}
                                        helperText={
                                            props.question.answer == index.toString() && choice.describe != ""
                                                ? "This answer is correct."
                                                : choice.describe == ""
                                                    ? "Please fill in this option"
                                                    : null}
                                        label="Description"
                                        fullWidth />} />
                                <Button style={{ border: 'none' }}
                                    variant="outlined"
                                    onClick={() => props.onDeleteChoiceClick(props.number, index)}>
                                    <DeleteOutlineOutlinedIcon />
                                </Button>
                            </div>
                        )}
                    </RadioGroup>
                </FormControl>

                <Button style={{ border: 'none', marginTop: 20, color: "#ff6600" }} variant="outlined" onClick={props.onAddClick}>+  ADD CHOICE</Button>
            </Card>
            <Card className="card" style={{ paddingTop: 20 }}>
                <Button style={{ border: 'none' }} startIcon={<FileCopyOutlinedIcon />} variant="outlined" onClick={props.onDupClick}>DUPLICATE</Button>
                <Button style={{ border: 'none' }} startIcon={<DeleteOutlineOutlinedIcon />} variant="outlined" onClick={props.onDeleteQuestionClick}>DELETE</Button>
            </Card>
        </div>
    )
}

export default QuestionCard;
