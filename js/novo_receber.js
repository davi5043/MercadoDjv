import { db , addDoc, collection } from "./firebase.js"

window.salvarReceber = async function () {
    let cliente = document.getElementById("nomeCliente").value
    let valor = Number(document.getElementById("valorDivida").value)
    let juros = Number(document.getElementById("jurosDia").value)
    let data = document.getElementById("dataVencimentoReceber").value

    await addDoc(collection(db, "contas_receber"), {
        cliente,
        valor,
        juros,
        data
    })

    alert("Recebimento registrado!")
    window.location.href = "receber.html"
}

