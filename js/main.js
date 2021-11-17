$(document).ready(function() {
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(3000).fadeOut('slow');
        $('body').delay(250).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/lookMe.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#eee url("img/iput-bg.jpg")',
        imageAlt: 'CC',
        confirmButtonText: CONFIG.btnIntro
      }).then(function(){
        $('.content').show(200);
      })
}

 function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.volume = 0.25; // để tới 1.0 = 100% thôi 
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.volume = 0.25; // để tới 1.0 = 100% thôi 
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}


$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.volume = 0.5; // để tới 1.0 = 100% thôi 
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Vì saooo em iu anh'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(255, 0, 212, 0.43)
              url("img/giphy2.gif")
              center bottom
              no-repeat
            `,
        confirmButtonColor: '#d63030',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#d08383',
                onClose: () => {
                    window.location = CONFIG.messLink;
                  }
            })
        }
    })
})

