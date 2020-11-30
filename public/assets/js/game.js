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

socket.on('startGame', ()=>{

    $('.find').css('display', 'none');

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