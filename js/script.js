import { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "./firebase.js"

function fazerLogin() {
    let user = document.getElementById("usuario")?.value
    let pass = document.getElementById("senha")?.value

    if (user === "admin" && pass === "123") {
        window.location.href = "menu.html"
    } else {
        alert("Usuário ou senha incorretos!")
    }
}

window.fazerLogin = fazerLogin; 



async function atualizarPagar() {
    const lista = document.getElementById("listaPagar")
    if (!lista) return;

    lista.innerHTML = ""

    const querySnapshot = await getDocs(collection(db, "contas_pagar"))

    querySnapshot.forEach((docItem) => {
        const dados = docItem.data()

        const li = document.createElement("li")
        li.innerHTML = `
            ${dados.descricao} - R$ ${dados.valor}
            ${dados.pago ? "✔️ Pago" :
            `<button onclick="pagar('${docItem.id}')">Pagar</button>`}
        `;
        lista.appendChild(li)
    })
}

async function salvarPagar() {
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

window.pagar = async function (id) {
    const ref = doc(db, "contas_pagar", id)
    await updateDoc(ref, { pago: true })
    atualizarPagar()
}

async function salvarPagar() {
    let descricao = document.getElementById("descricaoBoleto").value
    let valor = Number (document.getElementById).value

    await addDoc(collection(db, "contas_pagar"), {
        decricao,
        valor,
        pago: false
    })
    alert("Boleto cadastrado")
    window.location.href = "pagar.html"

}

window.pagar = async function (id) {
    const ref = doc(db, "contas_pagar", id)
    await updateDoc(ref, { pago: true })
    atualizarPagar()
}


async function atualizarReceber() {
    const lista = document.getElementById("listaReceber")
    if (!lista) return

    lista.innerHTML = ""

    const querySnapshot = await getDocs(collection(db, "contas_receber"))

    querySnapshot.forEach((docItem) => {
        const dados = docItem.data()

        let hoje = new Date()
        let dataDivida = new Date(dados.data)
        let diasAtraso = Math.floor((hoje - dataDivida) / (1000 * 60 * 60 * 24))

        let total = dados.valor + (dados.valor * (dados.juros / 100) * diasAtraso)

                const li = document.createElement("li")
        li.innerHTML = `
            <b>${dados.cliente}</b><br>
            Original: R$ ${dados.valor.toFixed(2)}<br>
            Dias atraso: ${diasAtraso}<br>
            Total: <b>R$ ${total.toFixed(2)}</b><br>
            <button onclick="pagarParcial('${docItem.id}', ${dados.valor})">Pagamento</button>
        `;
        lista.appendChild(li)
    })
}

async function salvarReceber() {
    let cliente = document.getElementById("nomeCliente").value
    let valor = Number(document.getElementById("valorDivida").value)
    let juros = Number(document.getElementById("jurosDia").value)

     await addDoc(collection(db, "contas_receber"), {
        cliente,
        valor,
        juros,
        data: new Date().toISOString()
    })

    alert("Recebimento registrado!")
    window.location.href = "receber.html"
}

 