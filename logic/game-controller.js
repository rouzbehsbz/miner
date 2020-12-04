const userModel = require("../models/user-model");

class GameController{

    constructor(roomId, username1, username2, trophy1, trophy2){

        this.roomId = roomId
        this.username1 = username1;
        this.username2 = username2;
        this.trophy1 = trophy1;
        this.trophy2 = trophy2;
        this.boardData = [];
        this.gameTurn = 1;
        this.score1 = 0;
        this.score2 = 0;

        this.boardInit = [];
        this.setting = {
            row : 8,
            col : 7,
            ore : 15,
            oreToWin : 1
        }

        this.initGame();

    }

    initGame(){

        let oreCounter = 0;

        for(let i = 1; i <= this.setting.row; i++){
            this.boardInit[i] = [];
            this.boardData[i] = [];
            for(let j = 1; j <= this.setting.col; j++){

                this.boardInit[i][j] = '';
                this.boardData[i][j] = '';

            }
        }

        while(oreCounter < this.setting.ore){

            let randomR = randomInt(1,this.setting.row);
            let randomC = randomInt(1,this.setting.col);

            if(this.boardInit[randomR][randomC] != 'O'){
                this.boardInit[randomR][randomC] = 'O'
                oreCounter += 1;
            };

        }

        for(let i = 1; i <= this.setting.row; i++){
            for(let j = 1; j <= this.setting.col; j++){
                let oreCounter = 0;

                if(this.boardInit[i][j] == ''){

                    try{if(this.boardInit[i-1][j-1] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i-1][j] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i-1][j+1] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i][j-1] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i][j+1] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i+1][j-1] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i+1][j] == 'O') oreCounter++}catch(e){};
                    try{if(this.boardInit[i+1][j+1] == 'O') oreCounter++}catch(e){};

                    this.boardInit[i][j] = oreCounter;
                
                }
            }
        }

    }

    selectCell(rowNumber, colNumber, playerTurn){

        if(this.gameTurn == playerTurn){

            if(this.boardData[rowNumber][colNumber] == ''){

                let selectedCell = this.boardInit[rowNumber][colNumber];

                if(selectedCell == 'O'){
                    this.boardData[rowNumber][colNumber] = `${selectedCell}${playerTurn}`;
                    this.gameTurn == 1 ? this.score1 += 1 : this.score2 += 1;
                }
                else{
                    this.boardData[rowNumber][colNumber] = selectedCell;
                    this.gameTurn = this.gameTurn == 1 ? 2 : 1;
                }
    
                if(this.score1 == this.setting.oreToWin || this.score2 == this.setting.oreToWin){
    
                    return this.endGame();
    
                }
                else{
    
                    return{
                        status : 'gamePlay',
                        col : this.setting.col,
                        row : this.setting.row,
                        boardData : this.boardData,
                        turn : this.gameTurn,
                        score1 : this.score1,
                        score2 : this.score2
                    }
    
                }

            }
            else{
                return null;
            }

        }
        else{
            return null;
        }

    }

    async endGame(){

        let winnerUsername = this.score1 > this.score2 ? this.username1 : this.username2;
        let looserUsername = this.score1 < this.score2 ? this.username1 : this.username2;
        let winnerTurn = this.score1 > this.score2 ? 1 : 2;
        let looserTurn = this.score1 < this.score2 ? 1 : 2;
        let winnerTrophy = this.score1 > this.score2 ? this.trophy1 : this.trophy2;
        let looserTrophy = this.score1 < this.score2 ? this.trophy1 : this.trophy2;
        let calWinnerTrophy = this.winnerTrophy(winnerTrophy, looserTrophy);
        let calLooserTrophy = this.looserTrophy(looserTrophy, winnerTrophy);

        await userModel.updateTrophy(winnerUsername, calWinnerTrophy);
        await userModel.updateTrophy(looserUsername, calLooserTrophy);

        return{
            status : 'end',
            winnerUsername,
            winnerTurn,
            looserUsername,
            looserTurn,
            calWinnerTrophy,
            calLooserTrophy,
            score1 : this.score1,
            score2 : this.score2,
        }

    }

    winnerTrophy(trophy1, trophy2){

        let dif = trophy1 - trophy2;
        let cal = Math.round(-0.63599 + (60.07066)/(1 + Math.pow(0.991798*Math.E, 0.00576*dif)));
        return cal;
    }

    looserTrophy(trophy1, trophy2){

        let dif = trophy1 - trophy2;
        let cal = (-1)*Math.round(39.0907-(39.0619)/(1 + Math.pow(0.993*Math.E, 0.00595*dif)));
        return cal;
    }

}

module.exports = GameController;