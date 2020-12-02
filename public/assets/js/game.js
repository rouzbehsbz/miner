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

    $('.username1').text(data['1'].username);
    $('.trophy1').text(' ' + data['1'].trophy);
    $('.username2').text(data['2'].username);
    $('.trophy2').text(' ' + data['2'].trophy);

    $('table').remove();
    drawBoard(data['initGame']);

    $('.find').css('display', 'none');
    $('.board').css('display', 'block');
    $('.alert').css('display', 'none');
    $('.info').css('display', 'block');

});

socket.on('selectCell', (data)=>{
    
    $('table').remove();
    drawBoard(data);
    
})

socket.on('oppLeft', ()=>{

    redirect(`${url}game`)

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

$(document).on('click', '.cell', (event)=>{

    socket.emit('selectCell', {
        row: parseInt($(event.target).attr('row')),
        col: parseInt($(event.target).attr('col'))
    });

});


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