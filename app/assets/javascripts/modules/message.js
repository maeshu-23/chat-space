$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="messageBox">
            <div class="messageInfo">
              <div class="messageInfo__name">
                ${message.user_name}
              </div>
              <div class="messageInfo__date">
                ${message.created_at}
              </div>
            </div>
            <div class="Message" >
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
          </div>
         </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="messageBox">
          <div class="messageInfo">
            <div class="messageInfo__name">
              ${message.user_name}
            </div>
            <div class="messageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message" >
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    console.log(formData)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      let html = buildHTML(data);
      console.log(html)
      $('.main-chat').append(html);   
      $('.main-chat').animate({ scrollTop: $('.main-chat')[0].scrollHeight});   
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
         alert("メッセージ送信に失敗しました");
         $('.submit-btn').prop('disabled', false);
     });
  });
});