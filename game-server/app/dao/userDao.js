var utils = require('../util/utils');
var pomelo = require('pomelo');
var userDao = module.exports;

userDao.getAccount = function (username, password, cb) {
    var sql = 'select id, username from Account where username = ? and password = ?';
    var args = [username, password];
    pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		if(err !== null) {
			console.log(err);
			utils.invokeCallback(cb, err, null);
		} else {
			if (!!res && res.length === 1) {
				var account = res[0];
				account.uid = account.id;
				var sql = 'select * from Player where account_id = ?';
                var args = [account.id];
                pomelo.app.get('dbclient').query(sql,args,function(err, res) {
                    if (err !== null) {
                        console.log(err);
                        utils.invokeCallback(cb, err, null);
                    }
                    else {
                        account.characters = [];
                        for (var i = 0; i < res.length; i++) {
                            account.characters.push(res[i]);
                        }
                        utils.invokeCallback(cb,null, account);
                    }
                });
			} else {
				utils.invokeCallback(cb, null, {uid:-1, username: username});
			}
		}
	});
};

userDao.getCharacter = function (charId, cb) {
    var sql = 'select * from Player where id = ?';
    var args = [charId];
    pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		if(err !== null) {
			console.log(err);
			utils.invokeCallback(cb, err, null);
		} else {
			if (!!res && res.length === 1) {
				var player = res[0];
                utils.invokeCallback(cb,null, player);
			} else {
				utils.invokeCallback(cb, null, {id:-1});
			}
		}
	});
};