const dados = [
    { cpf: "000.000.000-00", url:"comprovantes/testecomprovante.html",
      cpf: "228.030.003-15", url:"comprovantes/22803000315.html"
     }
];

function formatarCPF(cpf) {
    return cpf.replace(/\D/g, '')
              .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

function criarTabela(dados) {
    const tabela = document.querySelector('#minhaTabela tbody');
    dados.forEach(({cpf, url}) => {
        const linha = tabela.insertRow();
        linha.classList.add('oculto');
        linha.innerHTML = `<td>${cpf}</td><td>${url}</td>`;
    });
}

function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

function filtrarTabela(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const linhas = document.querySelectorAll('#minhaTabela tbody tr');
    const errorCpf = document.getElementById('errorCpf');
    let encontrou = false;
    let urlParaRedirecionar = '';

    if (!validarCPF(cpf)) {
        errorCpf.style.display = 'inline';
        return;
    } else {
        errorCpf.style.display = 'none';
    }

    linhas.forEach(linha => {
        const [celulaCpf, celulaUrl] = Array.from(linha.cells).map(cell => cell.textContent.trim());
        const mostrar = (cpf === "" || cpf === celulaCpf.replace(/\D/g, ''));
        
        if (mostrar) {
            linha.classList.remove('oculto');
            encontrou = true;
            urlParaRedirecionar = celulaUrl;
        } else {
            linha.classList.add('oculto');
        }
    });

    if (encontrou) {
        window.location.href = urlParaRedirecionar; 
    } else {
        alert('Não foram encontrados resultados com os parâmetros informados. Favor verificar os dados inseridos e tentar novamente.');
    }

    // Limpa os campos e redefine o foco
    document.getElementById('cpf').value = '';
    document.getElementById('cpf').focus();
}

document.getElementById('formFiltro').addEventListener('submit', filtrarTabela);
document.getElementById('cpf').addEventListener('input', function() {
    this.value = formatarCPF(this.value.replace(/\D/g, '').slice(0, 11));
    const errorCpf = document.getElementById('errorCpf');
    errorCpf.style.display = validarCPF(this.value.replace(/\D/g, '')) ? 'none' : 'inline';
});

criarTabela(dados);