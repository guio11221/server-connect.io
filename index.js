const { format } = require('util');

/**
 * Expose `flash()` function on requests.
 *
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */
module.exports = function flash(options = {}) {
  const safe = options.unsafe === undefined ? true : !options.unsafe;
  const logger = options.logger || console;

  return function(req, res, next) {
    if (req.flash && safe) {
      return next();
    }
    req.flash = _flash.bind(req);
    next();
  };

  function _flash(type, ...msgs) {
    if (!this.session) {
      throw new Error('req.flash() requires sessions');
    }

    const flash = this.session.flash = this.session.flash || {};

    if (type && msgs.length > 0) {
      if (msgs.length > 1 && format) {
        msgs = format(...msgs);
      } else if (Array.isArray(msgs[0])) {
        msgs[0].forEach(msg => {
          (flash[type] = flash[type] || []).push(msg);
        });
        return flash[type].length;
      } else {
        (flash[type] = flash[type] || []).push(msgs[0]);
      }
      return flash[type].length;
    } else if (type) {
      const messages = flash[type] || [];
      delete flash[type];
      return messages;
    } else {
      this.session.flash = {};
      return flash;
    }
  }
};

/**
 * Middleware to clear flash messages after they are read.
 *
 * @return {Function}
 * @api public
 */
module.exports.clearFlash = function clearFlash() {
  return function(req, res, next) {
    if (req.session && req.session.flash) {
      req.session.flash = {};
    }
    next();
  };
};
