$(function () {
    var selectSize = '',
        selectPrice = '',
        selectCover = '',
        endPaper = 0,
        sum = 0,
        qty = 1,
        pageSizes = {
            "20x20": {47: "Didital Paper Type DP LI", 53: "Digital Paerl Paper"},
            "19x25": {53: "Didital Paper Type DP LI", 57: "Digital Paerl Paper"},
            "20x30": {57: "Didital Paper Type DP LI", 65: "Digital Paerl Paper"},
            "25x25": {63: "Didital Paper Type DP LI", 69: "Digital Paerl Paper"},
            "30x30": {76: "Didital Paper Type DP LI", 85: "Digital Paerl Paper"},
            "35x35": {105: "Didital Paper Type DP LI", 117: "Digital Paerl Paper"},
            "30x40": {105: "Didital Paper Type DP LI", 117: "Digital Paerl Paper"},
            "40x40": {212: "Didital Paper Type DP LI", 238: "Digital Paerl Paper"}
        },
        covers = {
            "20x20": {53: "Обрезная фото обложка", 204: "Фото обложка", 355: "Обложка кож.зам.", 587: "Обложка холст"},
            "19x25": {57: "Обрезная фото обложка", 228: "Фото обложка", 373: "Обложка кож.зам.", 667: "Обложка холст"},
            "20x30": {
                65: "Обрезная фото обложка",
                254: "Фото обложка",
                506: "Обложка кож.зам.",
                712: "Обложка холст",
                1288: "Обложка пластификация"
            },
            "25x25": {
                69: "Обрезная фото обложка",
                305: "Фото обложка",
                525: "Обложка кож.зам.",
                800: "Обложка холст",
                1288: "Обложка пластификация"
            },
            "30x30": {
                85: "Обрезная фото обложка",
                424: "Фото обложка",
                727: "Обложка кож.зам.",
                992: "Обложка холст",
                1473: "Обложка пластификация"
            },
            "35x35": {
                525: "Фото обложка",
                1051: "Обложка кож.зам.",
                1126: "Обложка холст",
                1682: "Обложка пластификация"
            },
            "30x40": {
                525: "Фото обложка",
                1051: "Обложка кож.зам.",
                1126: "Обложка холст",
                1682: "Обложка пластификация"
            },
            "40x40": {
                847: "Фото обложка",
                1660: "Обложка кож.зам.",
                1320: "Обложка холст",
                2080: "Обложка пластификация"
            }
        },
        endpapers = {
            "20x20": 47,
            "19x25": 53,
            "20x30": 57,
            "25x25": 63,
            "30x30": 94,
            "35x35": 124,
            "30x40": 124,
            "40x40": 169
        };

    insertPageSize();

    $('#page-size').change(function () {
       changeSize();
    });

    $('#qty').change(function () {
       changeQty();
    });

    $('#cover').change(function () {
        changeCover();
    });

    function insertPageSize() {
        var html = '';
        for (var size in pageSizes) {
            for (var price in pageSizes[size]) {
                html +=
                    '<option data-size="' + size + '" ' +
                    'data-price="' + price + '">' +
                    '' + size + ' - ' + price + ' &#8381; — ' + pageSizes[size][price] + '</option>';
            }
        }
        $('#page-size').append(html);
    }

    function changeSize() {
        sum = selectCover = 0;
        qty = 1;
        $('#qty').val('1');

        selectSize = $('#calc option').filter(':selected').data('size');
        selectPrice = $('#calc option').filter(':selected').data('price');

        insertCover();
        recalc();
    }

    function changeQty() {
        qty = $('#qty').val();
        if(qty < 1) {
            qty = 1;
            $('#qty').val('1');
        }
        recalc();
    }

    function insertCover() {
        var htm = '<option selected>Вид обложки</option>',
            price;
        for (price in covers[selectSize]) {
            htm +=
                '<option data-price="' + price + '">' +
                ''+ price + ' &#8381; — ' + covers[selectSize][price] + '</option>';
        }
        $('#cover').html(htm);
    }

    function changeCover() {
        selectCover = $('#cover option').filter(':selected').data('price');
        recalc();
    }
    
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function recalc() {
        selectPrice = isNumeric(selectPrice) ? selectPrice : 0;
        qty = isNumeric(qty) ? qty : 1;
        selectCover = isNumeric(selectCover) ? selectCover : 0;
        var endpaperPrice = endpapers[selectSize];
        endPaper = isNumeric(endpapers[selectSize]) ? endpapers[selectSize] : 0;
        sum = selectPrice * qty + selectCover + endPaper;
        changeTable();
    }

    function changeTable() {
        $('.page-size').html(selectPrice + ' &#8381;');
        $('.qty').html(qty);
        $('.cover').html(selectCover + ' &#8381;');
        $('.endpaper').html(endPaper + ' &#8381;');
        $('.sum').html(sum + ' &#8381;');
    }
});