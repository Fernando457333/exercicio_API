const express = require('express');
const { obterAlunos, obterAlunoPeloId, adicionarAluno, excluirAluno } = require('./constroladores/alunos')
const rotas = express();

rotas.get('/alunos', obterAlunos);
rotas.get('/alunos/:id', obterAlunoPeloId);
rotas.post('/alunos', adicionarAluno);
rotas.delete('/alunos/:id', excluirAluno);

module.exports = rotas;