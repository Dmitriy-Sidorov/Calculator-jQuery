$(document).ready(function () {
    $('.calc select').change(function () {
        $edition = $('select#card_edition').val();
        $paper = $('select#card_paper').val();
        $color = $('select#card_color').val();
        $print_file = $('select#card_color option:selected').attr('data-print-file');
        $paper_ratio = $('select#card_paper option:selected').attr('data-paper-ratio');
        $color_format = $('select#card_color option:selected').attr('data-color');
        $print = $('select#card_color option:selected').attr('data-print');

        $division = 30;
        $final_edition = $edition / $division;
        $price = $final_edition * $paper_ratio + parseInt($print_file) + $final_edition*$print;

        $('span#final_price').text(Math.round($price));
        if ($color_format) {
            $('.card-images img').hide();
            $('#card_' + $color_format).show();
        }
    });
});