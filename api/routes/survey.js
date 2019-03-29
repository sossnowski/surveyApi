const express = require('express');
const SurveyData = require('../services/survey');
const questions = require('../services/surveyData');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/', (req, res, next) => {
    const surveyResult = new SurveyData(req.body.points[0], req.body.points[1], 0);
    
    res.status(200).json({
        message: "survey POST request",
        result: surveyResult.getResults()
    });
});


router.get('/data', (req, res, next) => {
    console.log(questions)
    res.status(200).json({
        data: questions,
        length: questions[0].questions.length
    });
});

module.exports = router;