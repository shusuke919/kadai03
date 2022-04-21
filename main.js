

//検索イベント
$("#search").on("click",function(){
  //$('table#tb tbody').append('12');
  var target = $('#word').val();
  console.log(target)
  $('#data').empty();
  $('#head').empty();

  //APIに流すパラメータ
  var params = {
      term:target,
      limit:30,//検索曲数
      lang: 'ja_jp',
      entry: 'music',
      media: 'music',
      country: 'JP',
};

$.ajax({
    url: 'https://itunes.apple.com/search',
    method: 'GET',
    data: params,
    dataType: 'jsonp',
    
    success:function(json){
      console.log(json);
      showData(json);
    },
    error:function(){
        $(function(){
            //$("#error").text("＊ エラーが発生しました ＊");
          });
      },
  });
  function showData(json) {
      // データが取得できたら
      if (json.results.length != 0) {
          
          //target = document.getElementById("result");
          var head = "";
          var html = ""; 
          head += '<tr id="header">\n';
          head += '<th class="jacket">ジャケット</th>';
          head += '<th class="name">曲名</th>';
          head += '<th class="artist">アーティスト名</th>';
          head += '<th class="play">試聴</th>';
          head += '<th class="check"></th>';
          head += ' </tr>';
          $('#head').append(head);
          for (var i = 0, len = json.results.length; i < len; i++) { 
              var result = json.results[i];
              html += '<tr class="music-list" id="' + result.trackId + '">\n';
              html += "<td class=jacket'>";
              html += '<img src="' + result.artworkUrl100 + '" class="" />';
              html += "</td>\n";
              html += "<td>";
              html += '<class="name">'+ result.trackName;
              html += "</td>\n";
              html += "<td>";
              html += '<class="artist">' + result.artistName;
              html += "</td>\n";
              html += "<td>";
              html += '<audio src="' + result.previewUrl + '" controls="" class="play"></audio><br>'; 
              html += '<td><input type="button" value="お気に入りに追加" class="bookmark"></th>';
              html += "</td>\n";

              html += '</tr>';
          }
      }
      console.log(html);
      $('#data').append(html);
  }
});

//曲をクリックしたときのイベント
$(document).on("click",'.bookmark',function(){
  //alert("お気に入りに追加しました！");
  //var index = localStorage.length;
  var trackId = $(this).closest('tr').attr('id')
  //console.log(index);

  var datalist={
      img_html : $(this).closest('tr').children('td').eq(0).html(),
      music_name : $(this).closest('tr').children('td').eq(1).text(),
      artist_name :$(this).closest('tr').children('td').eq(2).text(),
      play:$(this).closest('tr').children('td').eq(3).html()
  }
  //console.log($(this).closest('tr').attr('id'))
  localStorage.setItem(trackId,JSON.stringify(datalist));
  //console.log(JSON.parse(localStorage.getItem(index)));
  json_data =JSON.parse(localStorage.getItem(trackId));


  $('#head').append(head);
          for (var i = 0, len = json.results.length; i < len; i++) { 
              var result = json.results[i];
              html += '<tr class="music-list" id="' + result.trackId + '">\n';
              html += "<td class=jacket'>";
              html += '<img src="' + result.artworkUrl100 + '" class="" />';
              html += "</td>\n";
              html += "<td>";
              html += '<class="name">'+ result.trackName;
              html += "</td>\n";
              html += "<td>";
              html += '<class="artist">' + result.artistName;
              html += "</td>\n";
              html += "<td>";
              html += '<audio src="' + result.previewUrl + '" controls="" class="play"></audio><br>'; 
              html += '<td><input type="button" value="お気に入りに追加" class="bookmark"></th>';
              html += "</td>\n";

              html += '</tr>';
          }

});



//オーディオ監視（できない）
/*++++ オーディオ要素のリスト ++++*/
var audios = document.querySelectorAll( "audio" );

for(var i=0;i<audios.length;i++){
audios[ i ].addEventListener( "play", function(){
  console.log(audios);
  for(var j=0;j<audios.length;j++){
  if( audios[ j ]!=this ){ audios[ j ].pause() }
  }
}, false );
}

//お気に入り表示
$("#favorite").on("click",function(){
  //リスト表示
  var head = "";
  var html = ""; 
  html += "<table><thead id='head-modal'>"
  html += '<tr id="header-modal">\n';
  html += '<th class="jacket-modal">ジャケット</th>';
  html += '<th class="name-modal">曲名</th>';
  html += '<th class="artist-modal">アーティスト名</th>';
  html += '<th class="play-modal">試聴</th>';
  html += '<th class="check-modal"></th>';
  html += ' </tr>';
  html += "</thead>\n";
  html += "<tbody id='data-modal'>";
  for(var j=0;j<localStorage.length;j++){
      html += '<tr class="music-list-modal">\n';
      var key = localStorage.key(j);
      json_data =JSON.parse(localStorage.getItem(key));
      html += "<td class=jacket-modal'>";
      html += json_data.img_html;
      html += "</td>\n";
      html += '<td class="name-modal">'+ json_data.music_name;
      html += "</td>\n";
      html += "<td>";
      html += '<class="artist-modal">' + json_data.artist_name;
      html += "</td>\n";
      html += "<td>";
      html += json_data.play; 
      html += "</td>\n";
      html += "<td>";
      html += '<input type="button" value="お気に入りから削除" class="delete">';
      html += "</td>\n";
      html += '</tr>';
  }
  html += "</tbody>";
  html += "</table>";
  $("#modal-main").append(html);
  $("body").append('<div id="modal-bg"></div>');
  modalResize();
  $("#modal-bg,#modal-main").fadeIn("slow");

  $("#modal-bg").click(function(){
      console.log("click");
      var pointY = $(window).scrollTop();
    $('body').css({
    'position': 'fixed',
    'width': '100%',
    'top': -pointY
      });
      $("#modal-main,#modal-bg").fadeOut("slow",function(){
          $('#modal-bg').remove() ;
          $('#modal-main').empty();
          //背景固定を解除する
        $('body').css({
          'position': 'relative',
          'width': '',
          'top': ''
        });
          $(window).scrollTop(pointY);
          $('#modal-main').append('<div id="close">✘</div>');
       });
  });

  
   $(window).resize(modalResize);
    function modalResize(){
        var w = $(window).width();
        var h = $(window).height();

        var cw = $("#modal-main").outerWidth();
        var ch = $("#modal-main").outerHeight();

      //取得した値をcssに追加する
      $("#modal-main").css({
          "left": ((w - cw)/2) + "px",
          "top": ((h - ch)/2) + "px"
      });
   }
});

$(document).on('click','#close', function() {
  var pointY = $(window).scrollTop();
$('body').css({
  'position': 'fixed',
  'width': '100%',
  'top': -pointY
  });
  $("#modal-main,#modal-bg").fadeOut("slow",function(){
      $('#modal-bg').remove() ;
      $('#modal-main').empty();
      //背景固定を解除する
    $('body').css({
      'position': 'relative',
      'width': '',
      'top': ''
    });
      $(window).scrollTop(pointY);
      $('#modal-main').append('<div id="close">✘</div>');
  });
});

$(document).on("click",".delete",function(){
  var index = $('.delete').index(this);
  var delete_trackId = localStorage.key(index);
  console.log(delete_trackId);
  localStorage.removeItem(delete_trackId);
  $(this).closest('tr').remove();
  //画面更新しないといけない
});