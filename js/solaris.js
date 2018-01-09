$(document).ready(function () {

    $srcValue = $('#imgHolder img').attr('src');


    $('.colorItem').on('click', function () {
        $('#imgHolder img').attr('src', 'img/solaris/' + $(this).attr('data-color') + '.png');
    })
});