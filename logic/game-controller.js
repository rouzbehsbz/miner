class GameController{

    constructor(){

        this.boardData = [];
        this.gameTurn = 1;
        this.score1 = 0;
        this.score2 = 0;

        this.boardInit = [];
        this.setting = {
            row : 8,
            col : 7,
            ore : 15,
            oreToWin : 8
        }

        this.initGame();

    }

    initGame(){

        for(let i = 1; i <= this.setting.row; i++){
            this.boardInit[i] = [];
            this.boardData[i] = [];
            for(let j = 1; j <= this.setting.col; j++){

                this.boardInit[i][j] = '';
                this.boardData[i][j] = '';

            }
        }

        for(let i = 1; i <= this.setting.ore; i++){

            let randomR = randomInt(1,this.setting.row);
            let randomC = randomInt(1,this.setting.col);

            this.boardInit[randomR][randomC] = 'O';

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

            let selectedCell = this.boardInit[rowNumber][colNumber];
            if(selectedCell == 'O'){
                this.boardData[rowNumber][colNumber] = `${selectedCell}${playerTurn}`;
            }
            else{
                this.boardData[rowNumber][colNumber] = selectedCell;
                this.gameTurn = this.gameTurn == 1 ? 2 : 1;
            }

            return{
                col : this.setting.col,
                row : this.setting.row,
                boardData : this.boardData,
            }

        }

    }

}

module.exports = GameController;