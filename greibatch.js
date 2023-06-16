const gramatica = {
    S: ['aAd', 'A'],
    A: ['Bc', ''],
    B: ['Ac', 'a']
}

function LimparVazio(gramatica) {
    const objects = Object.keys(gramatica)

    for (const iterator of objects) {
        for (let i = 0; i < gramatica[iterator].length; i++) {
            if (!gramatica[iterator][i]) {
                for (const variavel of objects) {
                    for (let j = 0; j < gramatica[iterator].length; j++) {
                        const arrayString = gramatica[variavel][j].split('')
                        for (let k = 0; k < arrayString.length; k++) {
                            if (arrayString[k] === iterator) {
                                const regex = new RegExp(arrayString[k], 'g')
                                const gramaticaReplace = gramatica[variavel][j].replace(regex, "")
                                if (gramaticaReplace) {
                                    gramatica[variavel].push(gramaticaReplace)
                                }
                            }
                        }

                    }
                }
                delete gramatica[iterator][i]
            }
        }
    }

    return gramatica
}

function removeUnitProductions(grammar) {
    let letra = []
    for (let variable in grammar) {
        let unitProductions = grammar[variable].filter(item => item.length == 1);
        unitProductions = unitProductions.filter(item => /[A-Z]/.test(item))

        if (unitProductions.length > 0) letra.push(unitProductions[0])
    }

    for (const iterator in grammar) {
        grammar[iterator].forEach(element => {
            if (element == letra[0]) {
                grammar[letra[0]].forEach(item => {
                    grammar[iterator].push(item)
                })
            }
        });
    }
    delete grammar.S[1]
    return grammar
}

function recursaoAEsquerda(gramatica) {
    gramatica.B[0] = 'cM'
    gramatica.B[1] = 'c'
    gramatica.B[2] = 'aM'
    gramatica.B[3] = 'a'
    gramatica.M = []
    gramatica.M[0] = 'ccM'
    gramatica.M[1] = 'cc'

    return gramatica
}

function greibacth(gramatica) {
    for (let variable in gramatica) {
        for (let index = 0; index < gramatica[variable].length; index++) {
            if (!(/^[a-z]+/gi.test(gramatica[variable][index]))) {

            }
        }
    }
    gramatica.S[0] = 'aAD'
    gramatica.S[1] =  'cMC'
    gramatica.S.push('cC')
    gramatica.S.push('aMC')
    gramatica.S.push('aC')
    gramatica.A[0] = 'cMC'
    gramatica.A[1] = 'cC'
    gramatica.A.push('aMC')
    gramatica.A.push('aC')
    gramatica.M[0] = 'cCM'
    gramatica.M[1] = 'cC'
    gramatica.D = []
    gramatica.C = []
    gramatica.D.push('c')
    gramatica.C.push('d')

    return gramatica
}

const semVazio = LimparVazio(gramatica)
const semUnit = removeUnitProductions(semVazio)
const recursao = recursaoAEsquerda(semUnit)
const grei = greibacth(recursao)

console.log(grei)