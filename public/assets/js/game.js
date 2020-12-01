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

    drawBoard(data['initGame'])

    $('.find').css('display', 'none');
    $('.board').css('display', 'block');
    $('.alert').css('display', 'none');
    $('.info').css('display', 'block');

});

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

function drawBoard(data){

    let cellCounter = 0;
    let rowSize = data.row;
    let colSize = data.col;
    let boardData = data.boardData;

    for (let row = 1; row <= rowSize; row++) {

        $('.board').append(`<tr class="row${row}"></tr>`);
        
        for (let col = 1; col <= colSize; col++) {

            cellCounter += 1;
            let insideData = typeof boardData[cellCounter] == 'undefined' ? '' : boardData[cellCounter];
            $(`.row${row}`).append(`<td class="cell col${col}" name="${cellCounter}">${insideData}</td>`)

        }

    }

}