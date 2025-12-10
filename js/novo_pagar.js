import { db , addDoc, collection } from "./firebase.js"

window.salvarPagar = async function () {
    let descricao = document.getElementById("descricaoBoleto").value
    let valor = Number(document.getElementById("valorBoleto").value)
    let juros = Number(document.getElementById("jurosPagar").value)
    let data = document.getElementById("dataVencimentoPagar").value

    await addDoc(collection(db, "contas_pagar"), {
        descricao,
        valor,
        juros,
        data,
        pago: false
    })

    alert("Boleto cadastrado!")
    window.location.href = "pagar.html"
}


