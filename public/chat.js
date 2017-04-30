window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById('field');
    var sendButton = document.getElementById('send');
    var content = document.getElementById('content');
    var name = document.getElementById('name');

    socket.on('message', (data) => {
        if (data.message) {
            messages.push(data);
            var html = '';

            for (var i=0; i<messages.length; i+=1) {
                html += '<b>' + (messages[i].username ? messages[i].username: name) + ' :'
                html += messages[i].message + '<br />';
            }

            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log(`There is a problem:${data}`)
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        var nme = name.value;
        socket.emit('send', { message: text, username: nme });
        field.value = '';
    };
};
