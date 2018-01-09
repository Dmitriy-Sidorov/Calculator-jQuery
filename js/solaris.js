$(document).ready(function () {

    $colorSelect = $('#colorSelect .colorItem');
    $carImg = $('#imgHolder img');


    $colorSelect.on('click', function () {
        $imgPath = $(this).attr('data-color');
        $carImg.attr('src', 'img/solaris/' + $imgPath + '.png');
    })
});