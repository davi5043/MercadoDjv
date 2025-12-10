import { db , getDocs, collection, updateDoc, doc, deleteDoc } from "./firebase.js"

window.pagar = async function (id) {
    await updateDoc(doc(db, "contas_pagar", id), { pago: true })
    atualizarPagar()
}

window.pagarParcial = async function (id, valorAtual) {
    let pago = Number(prompt("Valor pago:").replace(",", "."))
    if (pago <= 0) return

    let novoValor = Math.round( (valorAtual - pago) * 100) / 100
    

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

        li.innerHTML = `
            ${d.descricao} - R$ ${d.valor.toFixed(2)}
            ${d.pago ? "✔️ Pago" : `<button onclick="pagarParcial('${item.id}', ${d.valor})">Pagar</button>`}
        `
        lista.appendChild(li)
    })
}

atualizarPagar()