import { db, getDocs, collection, updateDoc, doc, deleteDoc, addDoc } from "./firebase.js"

window.pagar = async function (id) {
    await updateDoc(doc(db, "contas_pagar", id), { pago: true })
    atualizarPagar()
}

window.pagarParcial = async function (id, valorAtual) {
    let pago = Number(prompt("Valor pago:").replace(",", "."))
    if (pago <= 0) return

    let novoValor = Math.round((valorAtual - pago) * 100) / 100

    if (novoValor <= 0) {
        await deleteDoc(doc(db, "contas_pagar", id))
        alert("Conta quitada!")
    } else {
        await updateDoc(doc(db, "contas_pagar", id), { valor: novoValor })
    }

    atualizarPagar()
}

window.salvarPagar = async function () {
    let descricao = document.getElementById("descricaoBoleto").value
    let valor = Number(document.getElementById("valorBoleto").value)

    await addDoc(collection(db, "contas_pagar"), {
        descricao,
        valor,
        pago: false
    })

    alert("Boleto cadastrado!")
    window.location.href = "pagar.html"
}

async function atualizarPagar() {
    const lista = document.getElementById("listaPagar")
    if (!lista) return

    lista.innerHTML = "" 

    const dados = await getDocs(collection(db, "contas_pagar"))
    dados.forEach((item) => {
        const d = item.data()
        const li = document.createElement("li")

        let hoje = new Date()
        let dataDivida = new Date(d.data)
        let diasAtraso = Math.floor((hoje - dataDivida) / (1000 * 3600 * 24)) 
        li.innerHTML = `
            <div class="conta">
                <p><strong>${d.descricao}</strong></p>
                <p>Original: R$ ${d.valor.toFixed(2)}</p>
                <p>Dias de Atraso: ${diasAtraso > 0 ? diasAtraso : 0}</p>
                <p>Total: R$ ${(d.valor + (d.valor * ((diasAtraso * d.juros) / 100))).toFixed(2)}</p>
                ${d.pago 
                    ? `<button onclick="excluirConta('${item.id}')">Excluir</button>` 
                    : `<button onclick="pagarParcial('${item.id}', ${(d.valor + (d.valor * ((diasAtraso * d.juros) / 100))).toFixed(2)})">Pagar</button>`
                }
            </div>
        `
        lista.appendChild(li)
    })
}

window.excluirConta = async function (id) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta conta?")
    if (confirmacao) {
        await deleteDoc(doc(db, "contas_pagar", id))
        alert("Conta excluída!")
        atualizarPagar()
    }
}

window.novoRecebimento = function () {
    window.location.href = "novoRecebimento.html"
}

window.voltar = function () {
    window.history.back()
}

atualizarPagar()
