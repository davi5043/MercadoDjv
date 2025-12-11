import { db, getDocs, collection, updateDoc, doc, deleteDoc, addDoc } from "./firebase.js"

// Função para marcar a conta como paga
window.pagar = async function (id) {
    await updateDoc(doc(db, "contas_pagar", id), { pago: true })
    atualizarPagar()
}

// Função para realizar um pagamento parcial
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

// Função para salvar a conta a pagar
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

// Função para atualizar a lista de contas a pagar
async function atualizarPagar() {
    const lista = document.getElementById("listaPagar")
    if (!lista) return

    lista.innerHTML = ""

    const dados = await getDocs(collection(db, "contas_pagar"))
    dados.forEach((item) => {
        const d = item.data()
        const li = document.createElement("li")

        li.innerHTML = `
            ${d.descricao} - R$ ${d.valor.toFixed(2)}
            ${d.pago 
                ? `✔️ Pago <button onclick="excluirConta('${item.id}')">Excluir</button>`
                : `<button onclick="pagarParcial('${item.id}', ${d.valor})">Pagar</button>`
            }
        `
        lista.appendChild(li)
    })
}

// Função para excluir a conta
window.excluirConta = async function (id) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta conta?")
    if (confirmacao) {
        await deleteDoc(doc(db, "contas_pagar", id))
        alert("Conta excluída!")
        atualizarPagar()  // Atualiza a lista após a exclusão
    }
}

// Chama a função para atualizar a lista de contas a pagar
atualizarPagar()
