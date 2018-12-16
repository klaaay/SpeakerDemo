import {
  GET_MESSAGE,
  INIT_TOKEN,
  QUESTION_SET,
  IS_ANSWER,
  IS_WAITING_FOR_CHECK,
  QUESTION_NEXT,
  INITION_TIMER,
  CHECK_ANSWER
} from './types'

import axios from 'axios'

export const initToken = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/token`);
    dispatch({
      type: INIT_TOKEN,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }

}

export const setQuestion = (questionLevel) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:5000/question', { questionLevel: questionLevel })
    // console.log(res.data)
    dispatch({
      type: QUESTION_SET,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }
  return {
  }
}

export const nextQuestion = (questionLevel) => {
  var newQuestionLevel = questionLevel + 1
  console.log(newQuestionLevel)
  return {
    type: QUESTION_NEXT,
    payload: newQuestionLevel
  }
}

export const getAnswer = (voice,callback) => async dispatch => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const res = await axios.post('http://localhost:5000/voice', voice, config);
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    })
    callback()
  } catch (err) {
    console.log(err)
  }
}

export const checkAnswer = (voice, callback) => async dispatch => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const res = await axios.post('http://localhost:5000/answer/check', voice, config);
    dispatch({
      type: CHECK_ANSWER,
      payload: res.data
    })
    callback()
  } catch (err) {
    console.log(err)
  }
}

export const isAnswer = (status) => {
  return {
    type: IS_ANSWER,
    payload: status
  }
}

export const isWaitingForCheck = (status) => {
  return {
    type: IS_WAITING_FOR_CHECK,
    payload: status
  }
}

export const initionTimer = (initTime) => {
  return {
    type: INITION_TIMER,
    payload: initTime
  }
}