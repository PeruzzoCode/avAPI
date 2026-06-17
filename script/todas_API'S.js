function irParaTela(idDaTela) {
    document.getElementById("menu-principal").style.display = "none";
    document.getElementById(idDaTela).style.display = "block";
}

function voltarParaMenu() {
    let telas = document.getElementsByClassName("tela");
    for (let i = 0; i < telas.length; i++) {
        telas[i].style.display = "none";
    }
    document.getElementById("menu-principal").style.display = "block";
}

document.getElementById("bt_busca_cep").addEventListener("click", buscarCEP);
document.getElementById("bt_busca_agify").addEventListener("click", buscarAgify);
document.getElementById("bt_busca_rickmorty").addEventListener("click", buscarRickAndMorty);
document.getElementById("bt_busca_nationalize").addEventListener("click", buscarNationalize);
document.getElementById("bt_busca_dog").addEventListener("click", buscarDog);
document.getElementById("bt_busca_cat").addEventListener("click", buscarCat);
document.getElementById("bt_busca_bored").addEventListener("click", buscarBored);
document.getElementById("bt_busca_bitcoin").addEventListener("click", buscarBitcoin);
document.getElementById("bt_busca_dolar").addEventListener("click", buscarDolar);
document.getElementById("bt_busca_ip").addEventListener("click", buscarIP);

function buscarCEP() {
    let cep = document.getElementById("inp_cep").value;

    document.getElementById("erro-cep").innerText = "";
    document.getElementById("res-rua").innerText = "";
    document.getElementById("res-bairro").innerText = "";
    document.getElementById("res-cidade").innerText = "";
    document.getElementById("res-estado").innerText = "";
    document.getElementById("bt_maps").style.display = "none";

    fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.erro) {
            document.getElementById("erro-cep").innerText = "CEP não encontrado.";
        } else {
            document.getElementById("res-rua").innerText = "Logradouro: " + dados.logradouro;
            document.getElementById("res-bairro").innerText = "Bairro: " + dados.bairro;
            document.getElementById("res-cidade").innerText = "Cidade: " + dados.localidade;
            document.getElementById("res-estado").innerText = "Estado: " + dados.uf;

            let btnMaps = document.getElementById("bt_maps");
            btnMaps.style.display = "block";
            btnMaps.onclick = function() {
                let enderecoCompleto = dados.logradouro + ", " + dados.localidade + " - " + dados.uf;
                window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(enderecoCompleto), "_blank");
            };
        }
    })
    .catch(() => {
        document.getElementById("erro-cep").innerText = "Erro na requisição. Digite apenas números.";
    });
}

function buscarAgify() {
    let nome = document.getElementById("inp_nome_agify").value;
    document.getElementById("erro-agify").innerText = "";

    if (!nome) {
        document.getElementById("erro-agify").innerText = "Por favor, digite um nome.";
        return;
    }

    fetch("https://api.agify.io/?name=" + nome)
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.age === null) {
            document.getElementById("erro-agify").innerText = "Não foram encontrados registros para este nome.";
        } else {
            document.getElementById("res-nome-agify").innerText = "Nome: " + dados.name;
            document.getElementById("res-idade-agify").innerText = "Idade Estimada: " + dados.age + " anos";
            document.getElementById("res-qtd-agify").innerText = "Registros Analisados: " + dados.count;
        }
    })
    .catch(() => {
        document.getElementById("erro-agify").innerText = "Erro ao conectar com o serviço.";
    });
}

function buscarRickAndMorty() {
    let idPersonagem = document.getElementById("inp_id_rickmorty").value;
    
    document.getElementById("erro-rickmorty").innerText = "";
    document.getElementById("res-nome-rickmorty").innerText = "";
    document.getElementById("res-status-rickmorty").innerText = "";
    document.getElementById("res-especie-rickmorty").innerText = "";
    document.getElementById("res-genero-rickmorty").innerText = "";
    
    let img = document.getElementById("res-img-rickmorty");
    img.src = "";
    img.style.display = "none";

    if (!idPersonagem) {
        document.getElementById("erro-rickmorty").innerText = "Por favor, digite um ID válido.";
        return;
    }

    fetch("https://rickandmortyapi.com/api/character/" + idPersonagem)
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Personagem não encontrado");
        }
        return resposta.json();
    })
    .then(dados => {
        let statusTraduzido = dados.status === "Alive" ? "Vivo" : dados.status === "Dead" ? "Morto" : "Desconhecido";
        let generoTraduzido = dados.gender === "Male" ? "Masculino" : dados.gender === "Female" ? "Feminino" : dados.gender;

        document.getElementById("res-nome-rickmorty").innerText = "Nome: " + dados.name;
        document.getElementById("res-status-rickmorty").innerText = "Status: " + statusTraduzido;
        document.getElementById("res-especie-rickmorty").innerText = "Espécie: " + dados.species;
        document.getElementById("res-genero-rickmorty").innerText = "Gênero: " + generoTraduzido;
        
        img.src = dados.image;
        img.style.display = "block";
    })
    .catch(erro => {
        document.getElementById("erro-rickmorty").innerText = "Personagem não encontrado. Tente outro ID (Ex: 1 a 826).";
    });
}

function buscarNationalize() {
    let nome = document.getElementById("inp_nome_nationalize").value;
    document.getElementById("erro-nationalize").innerText = "";

    fetch("https://api.nationalize.io/?name=" + nome)
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.country.length === 0) {
            document.getElementById("erro-nationalize").innerText = "Nenhum país encontrado para este nome.";
        } else {
            document.getElementById("res-nome-nationalize").innerText = "Nome: " + dados.name;
            document.getElementById("res-pais-nationalize").innerText = "País mais provável: " + dados.country[0].country_id;
            document.getElementById("res-prob-nationalize").innerText = "Probabilidade: " + (dados.country[0].probability * 100).toFixed(2) + "%";
        }
    })
    .catch(() => {
        document.getElementById("erro-nationalize").innerText = "Erro ao consultar a API.";
    });
}

function buscarDog() {
    document.getElementById("erro-dog").innerText = "";
    
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(resposta => resposta.json())
    .then(dados => {
        let img = document.getElementById("res-img-dog");
        img.src = dados.message;
        img.style.display = "block";
    })
    .catch(() => {
        document.getElementById("erro-dog").innerText = "Erro ao carregar imagem.";
    });
}

function buscarCat() {
    document.getElementById("erro-cat").innerText = "";

    fetch("https://catfact.ninja/fact")
    .then(resposta => resposta.json())
    .then(dados => {
        document.getElementById("res-fato-cat").innerText = '"' + dados.fact + '"';
    })
    .catch(() => {
        document.getElementById("erro-cat").innerText = "Erro ao buscar curiosidade.";
    });
}

function buscarBored() {
    document.getElementById("erro-bored").innerText = "";

    fetch("https://bored-api.appbrewery.com/random")
    .then(resposta => resposta.json())
    .then(dados => {
        document.getElementById("res-atividade-bored").innerText = "Sugestão: " + dados.activity;
    })
    .catch(() => {
        document.getElementById("erro-bored").innerText = "Erro ao sortear atividade.";
    });
}

function buscarBitcoin() {
    document.getElementById("erro-bitcoin").innerText = "";

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(resposta => resposta.json())
    .then(dados => {
        let preco = dados.bpi.USD.rate;
        document.getElementById("res-preco-bitcoin").innerText = "U$ " + preco;
    })
    .catch(() => {
        document.getElementById("erro-bitcoin").innerText = "Erro ao buscar preço do Bitcoin.";
    });
}

function buscarDolar() {
    document.getElementById("erro-dolar").innerText = "";

    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then(resposta => resposta.json())
    .then(dados => {
        let info = dados.USDBRL;
        document.getElementById("res-preco-dolar").innerText = "Cotação Atual: R$ " + parseFloat(info.bid).toFixed(2);
        document.getElementById("res-max-dolar").innerText = "Máxima do Dia: R$ " + parseFloat(info.high).toFixed(2);
        document.getElementById("res-min-dolar").innerText = "Mínima do Dia: R$ " + parseFloat(info.low).toFixed(2);
    })
    .catch(() => {
        document.getElementById("erro-dolar").innerText = "Erro ao buscar cotação.";
    });
}

function buscarIP() {
    document.getElementById("erro-ip").innerText = "";

    fetch("https://ipapi.co/json/")
    .then(resposta => resposta.json())
    .then(dados => {
        document.getElementById("res-ip-ip").innerText = "Seu IP: " + dados.ip;
        document.getElementById("res-cidade-ip").innerText = "Cidade: " + dados.city;
        document.getElementById("res-estado-ip").innerText = "Estado: " + dados.region;
        document.getElementById("res-pais-ip").innerText = "País: " + dados.country_name;
    })
    .catch(() => {
        document.getElementById("erro-ip").innerText = "Erro ao localizar IP.";
    });
}