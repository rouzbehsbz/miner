$('form').submit(function(event){

    event.preventDefault();

    let postUrl = $(this).attr("action");
    let username = $('input[name=username_inp]').val();
    let password = $('input[name=password_inp]').val();

    $.post(postUrl,
    {
        username_inp: username,
        password_inp: password
    },
    function(data, status){

        if(data.status == 'success'){

            redirect(data.url)

        }
        else{

        $('.msg').text(data);
        $('.error').css('display', 'block');

        }

    });

});