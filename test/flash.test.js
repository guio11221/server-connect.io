const express = require('express');
const session = require('cookie-session');
const request = require('supertest');
const assert = require('assert');
const flash = require('../'); // Ajuste o caminho conforme necessário

describe('Middleware Flash', function () {
    it('deve inicializar .session.flash e .locals.flash', function (done) {
        const app = express();
        app.use(session({ keys: ['a', 'b'] }));
        app.use(flash());

        app.use(function (req, res, next) {
            assert(Array.isArray(req.session.flash));
            assert(Array.isArray(res.locals.flash));
            assert.deepStrictEqual(req.session.flash, res.locals.flash);
            res.end();
        });

        request(app.listen())
            .get('/')
            .expect(200, done);
    });

    it('deve definir mensagens de flash corretamente via req.flash()', function (done) {
        const app = express();
        app.use(session({ keys: ['a', 'b'] }));
        app.use(flash());

        app.use(function (req, res) {
            req.flash('info', 'Mensagem de teste');
            req.flash('error', 'Ocorreu um erro');
            assert.deepStrictEqual(res.locals.flash, [
                { type: 'info', message: 'Mensagem de teste' },
                { type: 'error', message: 'Ocorreu um erro' }
            ]);
            res.end();
        });

        request(app.listen())
            .get('/')
            .expect(200, done);
    });

    it('deve evitar mensagens de flash duplicadas', function (done) {
        const app = express();
        app.use(session({ keys: ['a', 'b'] }));
        app.use(flash());

        app.use(function (req, res) {
            req.flash('info', 'Mensagem duplicada');
            req.flash('info', 'Mensagem duplicada');
            assert.deepStrictEqual(res.locals.flash, [
                { type: 'info', message: 'Mensagem duplicada' }
            ]);
            res.end();
        });

        request(app.listen())
            .get('/')
            .expect(200, done);
    });

    it('deve limpar mensagens de flash após serem lidas', function (done) {
        const app = express();
        app.use(session({ keys: ['a', 'b'] }));
        app.use(flash());

        app.use(function (req, res, next) {
            req.flash('info', 'Mensagem para limpar');
            res.end();
        });

        request(app.listen())
            .get('/')
            .expect(200)
            .then(() => {
                // Verificar limpeza
                const app2 = express();
                app2.use(session({ keys: ['a', 'b'] }));
                app2.use(flash());

                app2.use(function (req, res) {
                    assert.deepStrictEqual(res.locals.flash, []);
                    res.end();
                });

                return request(app2.listen())
                    .get('/')
                    .expect(200, done);
            });
    });

    it('deve suportar res.flash() se implementado', function (done) {
        const app = express();
        app.use(session({ keys: ['a', 'b'] }));
        app.use(flash());

        // Supondo que você implemente o método res.flash()
        app.use(function (req, res) {
            res.flash = req.flash; // Implementação mock
            res.flash('info', 'Mensagem de flash do res');
            assert.deepStrictEqual(res.locals.flash, [
                { type: 'info', message: 'Mensagem de flash do res' }
            ]);
            res.end();
        });

        request(app.listen())
            .get('/')
            .expect(200, done);

    });


});

