const assert = require('assert');

/**
 * Middleware para gerenciar mensagens de flash.
 *
 * @return {Function}
 */
module.exports = function () {
  return function (req, res, next) {
    assert(req.session, 'É necessário que req.session esteja disponível!');

    // Inicializa a sessão de flash se não existir
    if (!Array.isArray(req.session.flash)) {
      req.session.flash = [];
    }

    // Define res.locals.flash como a sessão de flash
    res.locals.flash = req.session.flash;

    // Adiciona o método flash aos objetos req e res
    req.flash = res.flash = addFlashMessage;

    next();
  };
};

/**
 * Adiciona uma mensagem de flash.
 *
 * @param {string} [type='info'] - O tipo da mensagem (por exemplo, 'info', 'error').
 * @param {string} msg - A mensagem de flash.
 * @return {Object} O objeto de requisição/resposta.
 */
function addFlashMessage(type, msg) {
  // Se apenas um argumento for passado, considera-o como a mensagem e define o tipo como 'info'
  if (!msg) {
    msg = type;
    type = 'info';
  }

  // Cria o objeto de mensagem
  const message = {
    message: msg,
    type: type
  };

  // Obtém a lista de mensagens de flash
  const messages = this.res ? this.res.locals.flash : this.locals.flash;

  // Verifica se a mensagem já existe para evitar duplicatas
  const isDuplicate = messages.some(existingMsg =>
    existingMsg.type === message.type && existingMsg.message === message.message
  );

  if (!isDuplicate) {
    messages.push(message);
  }

  return this;
}
