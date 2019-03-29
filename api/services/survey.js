class SurveyData {
    constructor(firstPart, secondPart, thirdPart) {
        this.firstPart = firstPart;
        this.secondPart = secondPart;
        this.thirdPart = thirdPart;

        this.firstBorderFirstPart = 10;
        this.secondBorderFirstPart = 30;

        this.firstBorderSecondPart = 10;
        this.secondBorderSecondPart = 30;

        this.firstBorderThirdPart = 10;
        this.secondBorderThirdPart = 30;
        
        this.checkSurveyData();
    }

    checkSurveyData() {
        if (this.firstPart <= this.firstBorderFirstPart) {
            this.firstPartResult = 'low';
        } else if (this.firstPart > this.firstBorderFirstPart && this.firstPart <= this.secondBorderFirstPart ) {
            this.firstPartResult = 'medium';
        }else {
            this.firstPartResult = 'high';
        }
        
        if (this.secondPart <= this.firstBorderSecondPart) {
            this.secondPartResult = 'low';
        } else if (this.secondPart > this.firstBorderSecondPart && this.secondPart <= this.secondBorderSecondPart ) {
            this.secondPartResult = 'medium';
        }else {
            this.secondPartResult = 'high';
        }

        if (this.thirdPart <= this.firstBorderThirdPart) {
            this.thirdPartResult = 'low';
        } else if (this.thirdPart > this.firstBorderThirdPart && this.thirdPart <= this.secondBorderThirdPart ) {
            this.thirdPartResult = 'medium';
        }else {
            this.thirdPartResult = 'high';
        }
    }

    getResults() {
        // return {
        //     firstPartResult: this.firstPartResult,
        //     secondPartResult: this.secondPartResult,
        //     thirdPartResult: this.thirdPartResult
        // }
        return [
            this.firstPartResult,
            this.secondPartResult,
            this.thirdPartResult
        ];
    }
}

module.exports = SurveyData;