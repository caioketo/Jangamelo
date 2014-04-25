var pomelo = window.pomelo;
var host = "192.168.25.17";
var port = "3010";
var account;
function login() {
    pomelo.init({
        host: host,
        port: port,
        log: true
    }, function() {
        var user = document.getElementById('username').value;
        var pass = document.getElementById('password').value;
        
        pomelo.request("connector.entryHandler.entry", {
            user: user,
            password: pass
        }, function(data) {
            account = data.msg;
            var accEle = document.getElementById('account');
            accEle.parentNode.removeChild(accEle);
            var mainEle = document.getElementById('main');
            var charsEle = document.createElement('div');
            charsEle.setAttribute('id', 'chars');
            mainEle.appendChild(charsEle);
            var ul = document.createElement('ul');
            for (var i = 0; i < account.characters.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('id', account.characters[i].id);
                li.setAttribute('onclick', 'selectChar(' + account.characters[i].id + ');');
                li.innerHTML = account.characters[i].name;
                ul.appendChild(li);
            }
            charsEle.appendChild(ul);
        });
    });
}

function selectChar(charId) {
    pomelo.request("connector.entryHandler.selectChar", {
        charId: charId
    }, function(data) {
        alert(JSON.stringify(data));
    });
};