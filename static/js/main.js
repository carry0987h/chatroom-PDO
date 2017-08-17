var currentUser;
initApp();

function fetchMessages(shouldScroll) {
	$.ajax({
		url: 'backend/chat-messages.php',
		success: function(response) {
			var parsedResponse = JSON.parse(response);
			renderMessages(parsedResponse);
			if (shouldScroll) {
				scrollChatAreaDown();
			}
		}
	});
}

function initApp() {
	$.ajax({
		url: 'backend/return-user-id.php',
		type: 'GET',
		success: function(response) {
			currentUser = response;
			fetchMessages(true);
			setInterval(fetchMessages, 3000);
		}
	});
}

function renderMessages(messages) {	
	$('#chat-area').empty();

	messages
		.sort(function(a, b) {
			var firstID = a.id;
			var secondID = b.id;

			if (firstID < secondID) {
				return -1;
			}
			else if (firstID > secondID) {
				return 1;
			}
			
			return 0;
		}) 
		.forEach(function(message) {
			var time = message.time;
			var sender = message.username;
			var content = message.content;
			var id = message.sender_id;

			var $timeInfo = $('<span>', {
				class: 'time-info'
			});
			
			$timeInfo.text(formatTime(time));

			var $senderInfo = $('<span>', {
				class: 'sender-info'
			});
			$senderInfo.text(sender);
			
			var $messageInformation = $('<div>', {
				class: 'message-information'
			});
			$messageInformation.append($timeInfo);
			$messageInformation.append($senderInfo);

			var $content = $('<div>', {
				class: id === currentUser ? 'own-content' : 'content'
			});

			$content.text(content);
			
			var $message = $('<li>');

			$message.append($messageInformation);
			$message.append($content);

			$("#chat-area").append($message);
		});
}

$('#message-form').submit(function(e) {
	e.preventDefault();
	var message = $('#message').val().trim();
	if (!message) {
		return;
	}
	$.ajax({
		url: 'backend/insert-message.php',
		type: 'POST',
		data: {
			message: message 
		},
		success: function(response) {
			console.log(response);
			$("#message").val('');
			fetchMessages(true);
		}
	});
});

function scrollChatAreaDown() {
	var height = 0;
	$('ul li').each(function(i, value){
	    height += parseInt($(this).outerHeight(true));
	});

	height += '';

	$('ul').animate({scrollTop: height});
}

function formatTime(time) {
	var dateTime = new Date(time.replace(/-/g, '/'));
	var day = dateTime.getDate();
	var month = dateTime.getMonth() +  1;
	var year = dateTime.getFullYear();
	var seconds = dateTime.getSeconds();
	var minutes = dateTime.getMinutes();
	var hours = dateTime.getHours();

	return day + '.' + month + '.' + year +
		' ' + hours + ':' + minutes + ':' + seconds;
}