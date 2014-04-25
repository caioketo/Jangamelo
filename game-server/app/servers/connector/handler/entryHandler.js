var consts = require('../../../consts/consts');
var userDao = require('../../../dao/userDao');

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
    if (!!msg) {
        var user = msg.user;
        var pass = msg.password;
        userDao.getAccount(user, pass, function (err, res) {
            if (res.uid > 0) {
                session.bind(res.uid);
                session.set('accountId', res.id);
                next(null, {
                    code: consts.RES_CODE.SUC_OK,
                    msg: res
                });
            }
        });
    }
    else {
        next(null, {code: consts.RES_CODE.ERR_FAIL, msg: 'User/Password wrong.'});
    }
};

Handler.prototype.selectChar = function(msg, session, next) {
    if (!!msg) {
        var charId = msg.id;
        userDao.getCharacter(charId, function (err, res) {
            if (res.id > 0) {
                var character = res;
            }
        });
    }
};