const socket = io(url);

let joinBtnToggle = true;

socket.on('connect', ()=>{

    socket.emit('init', {
        username,
        trophy
    })

});

socket.on('joinQueue', ()=>{

    $('.loading').css('display', 'block');
    $('.join').attr('value', 'لغو پیدا کردن');
    $('.join').css('background-color', 'rgb(255, 104, 104)')

});

socket.on('leaveQueue', ()=>{

    $('.loading').css('display', 'none');
    $('.join').attr('value', 'پیدا کردن حریف');
    $('.join').css('background-color', '#53BF70');

});

socket.on('startGame', (data)=>{

    $('.error').css('display', 'none');
    $('table').remove();

    $('.username1').text(data['1'].username);
    $('.trophy1').text(' ' + data['1'].trophy);
    $('.username2').text(data['2'].username);
    $('.trophy2').text(' ' + data['2'].trophy);
    updateTurn(1);

    drawBoard(data['initGame']);

    $('.find').css('display', 'none');
    $('.board').css('display', 'block');
    $('.alert').css('display', 'none');
    $('.info').css('display', 'block');

});

socket.on('selectCell', (data)=>{

    $('table').remove();
    updateScore(data.score1, data.score2);

    if(data.status == 'gamePlay'){

        updateTurn(data.turn);
        drawBoard(data);

    }
    else if(data.status == 'end'){

        $('.turn').css('display', 'none');
        $('.end').css('display', 'block');
        drawEnd(data);

    }
    
})

socket.on('oppLeft', ()=>{

    sessionStorage.setItem('oppLeft', 'true');
    redirect(`${url}game`);

});

$('.join').on('click', (e)=>{

    if(joinBtnToggle){
        socket.emit('joinQueue');
        joinBtnToggle = false;
    }
    else{
        socket.emit('leaveQueue');
        joinBtnToggle = true;
    }

});

$('.replay').on('click', (e)=>{

    redirect(url);

});

$(document).on('click', '.cell', (event)=>{

    socket.emit('selectCell', {
        row: parseInt($(event.target).attr('row')),
        col: parseInt($(event.target).attr('col'))
    });

});

if(sessionStorage.getItem('oppLeft') == 'true'){

    $('.msg').text('حریف شما بازی را ترک کرد');
    $('.error').css('display', 'block');
    sessionStorage.setItem('oppLeft', 'false');

}


function drawBoard(data){

    let rowSize = data.row;
    let colSize = data.col;
    let boardData = data.boardData;

    $('.container').append(`<table class="board"></table>`);
    $('.board').css('display', 'block');

    for (let row = 1; row <= rowSize; row++) {
        $('.board').append(`<tr class="row${row}"></tr>`);
        
        for (let col = 1; col <= colSize; col++) {

            if(typeof boardData[row][col] == 'number'){

                $(`.row${row}`).append(`<td class="cell number col${col}" row="${row}" col="${col}">${boardData[row][col]}</td>`)

            }
            else if(boardData[row][col] == 'O1'){

                $(`.row${row}`).append(`<td class="cell col${col}" row="${row}" col="${col}">
                                        <img class="ore" src="img/ore1.png"></img></td>`)

            }
            else if(boardData[row][col] == 'O2'){

                $(`.row${row}`).append(`<td class="cell col${col}" row="${row}" col="${col}">
                                        <img class="ore" src="img/ore2.png"></img></td>`)

            }
            else{

                $(`.row${row}`).append(`<td class="cell col${col}" row="${row}" col="${col}"></td>`)

            }

        }

    }

}

function updateTurn(num){

    num == 1 ? $('.who').text('قرمز') : $('.who').text('آبی');
    num == 1 ? $('.who').css('color', 'rgb(255, 72, 72)') : $('.who').css('color', 'rgb(67, 67, 255)');

}

function updateScore(score1, score2){

    $('.score1').text(`${score1} `);
    $('.score2').text(` ${score2}`);

}

function drawEnd(data){

    $('.winner').text(`${data.winnerUsername} : برنده`);
    $('.user1').text(data.winnerUsername);
    $('.user2').text(data.looserUsername);
    $('.cal1').text(` +${data.calWinnerTrophy}`);
    $('.cal2').text(` ${data.calLooserTrophy}`);

    if(data.winnerTurn == 1){
        $('.user1').addClass('red');
        $('.user2').addClass('blue');
    }
    else{
        $('.user1').addClass('blue');
        $('.user2').addClass('red');
    }

}