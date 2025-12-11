import { db , getDocs, collection, updateDoc, deleteDoc, doc } from "./firebase.js"


window.pagarParcial = async function (id, valorAtual) {
      let pago = Number(prompt("Valor pago:").replace(",", "."))
      if (pago <= 0) return

      let novoValor = Math.round( (valorAtual - pago) * 100) / 100  

     if (novoValor <= 0) {
          await deleteDoc(doc(db, "contas_receber", id))
          alert("Conta quitada!")
     } else {
         await updateDoc(doc(db, "contas_receber", id), { valor: novoValor })
     }

     atualizarReceber()
 }

async function atualizarReceber() {
    const lista = document.getElementById("listaReceber")
    if (!lista) return

    lista.innerHTML = ""

    const dados = await getDocs(collection(db, "contas_receber"))
    dados.forEach((item) => {
        const d = item.data()

        let hoje = new Date()
        let dataDivida = new Date(d.data)
        let diasAtraso = Math.floor((hoje - dataDivida) / 86400000)

        let total = d.valor + (d.valor * (d.juros / 100) * diasAtraso)

        const li = document.createElement("li")
        li.innerHTML = `
            <b>${d.cliente}</b><br>
            Original: R$ ${d.valor.toFixed(2)}<br>
            Dias atraso: ${diasAtraso}<br>
            Total: R$ ${total.toFixed(2)}<br>
            <button onclick="pagarParcial('${item.id}', ${total})">Pagamento</button>
        `
        lista.appendChild(li)
    })
}

atualizarReceber()
