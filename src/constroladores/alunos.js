const alunos = require('../dados/alunos')

const obterAlunos = (req, res) => {
    return res.json(alunos)
}

const obterAlunoPeloId = (req, res) => {
    const idRequistado = Number(req.params.id)

    if (isNaN(idRequistado)) {
        return res.status(400).json({ mensagem: 'O id informado não é um numero válido.' })
    }

    const aluno = alunos.find(aluno => aluno.id === idRequistado)

    if (!aluno) {
        return res.status(400).json({ mensagem: 'Aluno não encontrado' })
    }
    return res.json(aluno)
}

const adicionarAluno = (req, res) => {
    const { nome, sobrenome, idade, curso } = req.body;

    let idProximoAlunoCriado = 1;
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome deve ser informado' })
    }
    if (!sobrenome) {
        return res.status(400).json({ mensagem: 'O sobrenomedeve ser informado' })
    }
    if (!idade) {
        return res.status(400).json({ mensagem: 'A idade deve ser informado' })
    }
    if (!curso) {
        return res.status(400).json({ mensagem: 'O curso deve ser informado' })
    }
    if (idade < 18) {
        return res.status(400).json({ mensagem: 'O aluno a ser adicionado deve ter pelo menos 18 anos' })
    };

    const novoAluno = {
        id: idProximoAlunoCriado,
        nome,
        sobrenome,
        idade,
        curso
    }

    alunos.push(novoAluno);

    idProximoAlunoCriado++

    return res.status(201).send()

}

const excluirAluno = (req, res) => {
    const idRequistado = Number(req.params.id)

    if (isNaN(idRequistado)) {
        return res.status(400).json({ mensagem: 'O id informado não é um numero válido.' })
    }

    const indiceAlunoExclusao = alunos.findIndex(aluno => aluno.id === idRequistado)

    if (!indiceAlunoExclusao < 0) {
        return res.status(400).json({ mensagem: 'Aluno não encontrado' })
    }

    const alunoExcluido = alunos.splice(indiceAlunoExclusao, 1)[0]

    return res.json(alunoExcluido)
}


module.exports = {
    obterAlunos,
    adicionarAluno,
    obterAlunoPeloId,
    excluirAluno,
}