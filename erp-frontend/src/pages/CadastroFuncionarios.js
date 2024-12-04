import React, { useState } from 'react';

function CadastroFuncionarios() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    estadoCivil: '',
    nomeConjuge: '',
    dataNascimento: '',
    filial: '',
    cpf: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    dataAdmissao: '',
    setor: '',
    funcao: '',
    tipoAlimentacao: '',
    centroCusto: '',
    salarioBase: '',
    escolaridade: '',
    filhos: 0,
    filhosInfo: [],
  });

  const filiais = ['Filial A', 'Filial B', 'Filial C'];
  const estadosCivis = ['Solteiro (a)', 'Casado (a)', 'Divorciado (a)', 'União Estável', 'Viúvo (a)'];
  const setores = ['Setor 1', 'Setor 2', 'Setor 3'];
  const funcoes = ['Função 1', 'Função 2', 'Função 3'];
  const tiposAlimentacao = ['Refeição', 'Alimentação'];
  const centrosCusto = ['Centro 1', 'Centro 2', 'Centro 3'];
  const escolaridades = ['Fundamental', 'Médio', 'Superior', 'Pós-graduação'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() }); // Converte para maiúsculas
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Mantém o valor original
  };

  const handleCPFChange = (e) => {
    const value = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: value });
  };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length > 11) cpf = cpf.slice(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  };

  const handleCEPChange = (e) => {
    const value = formatCEP(e.target.value);
    setFormData({ ...formData, cep: value });
  };

  const formatCEP = (cep) => {
    cep = cep.replace(/\D/g, '');
    if (cep.length > 8) cep = cep.slice(0, 8);
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    return cep;
  };

  const buscarCEP = async () => {
    const cepNumeros = formData.cep.replace(/\D/g, '');
    if (cepNumeros.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || '',
        }));
      } else {
        alert('CEP não encontrado.');
      }
    } catch (error) {
      alert('Erro ao buscar CEP.');
    }
  };

  const handleSalarioChange = (e) => {
    const value = formatCurrency(e.target.value);
    setFormData({ ...formData, salarioBase: value });
  };

  const formatCurrency = (value) => {
    let val = value.replace(/\D/g, '');
    val = (parseInt(val) / 100).toFixed(2) + '';
    val = val.replace('.', ',');
    val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return val;
  };

  const handleFilhosChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    const filhosInfo = Array(value)
      .fill()
      .map(() => ({
        nome: '',
        dataNascimento: '',
        cpf: '',
      }));
    setFormData({ ...formData, filhos: value, filhosInfo });
  };

  const handleFilhoInfoChange = (index, field, value) => {
    const updatedFilhos = [...formData.filhosInfo];
    updatedFilhos[index][field] = value.toUpperCase();
    setFormData({ ...formData, filhosInfo: updatedFilhos });
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '';
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    if (mesAtual < nascimento.getMonth() || (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const calcularTempoEmpresa = () => {
    if (!formData.dataAdmissao) return '';
    const admissao = new Date(formData.dataAdmissao);
    const hoje = new Date();
    let anos = hoje.getFullYear() - admissao.getFullYear();
    let meses = hoje.getMonth() - admissao.getMonth();
    if (meses < 0) {
      anos--;
      meses += 12;
    }
    return `${anos} anos e ${meses} meses`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Funcionário cadastrado:', formData);
    alert('Funcionário cadastrado com sucesso!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Cadastro de Funcionários</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Campos do formulário */}
        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Estado Civil:</label>
          <select name="estadoCivil" value={formData.estadoCivil} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {estadosCivis.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        {['Casado (a)', 'União Estável'].includes(formData.estadoCivil) && (
          <div>
            <label>Nome do Cônjuge:</label>
            <input
              type="text"
              name="nomeConjuge"
              value={formData.nomeConjuge}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            required
          />
          <span> Idade: {calcularIdade(formData.dataNascimento)}</span>
        </div>
        <div>
          <label>Filial:</label>
          <select name="filial" value={formData.filial} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {filiais.map((filial) => (
              <option key={filial} value={filial}>
                {filial}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            required
          />
        </div>
        <div>
          <label>Data de Admissão:</label>
          <input
            type="date"
            name="dataAdmissao"
            value={formData.dataAdmissao}
            onChange={handleInputChange}
            required
          />
          <span> Tempo de Empresa: {calcularTempoEmpresa()}</span>
        </div>
        <div>
          <label>Setor:</label>
          <select name="setor" value={formData.setor} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {setores.map((setor) => (
              <option key={setor} value={setor}>
                {setor}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Função:</label>
          <select name="funcao" value={formData.funcao} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {funcoes.map((funcao) => (
              <option key={funcao} value={funcao}>
                {funcao}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo de Alimentação:</label>
          <select name="tipoAlimentacao" value={formData.tipoAlimentacao} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {tiposAlimentacao.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Centro de Custo:</label>
          <select name="centroCusto" value={formData.centroCusto} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {centrosCusto.map((centro) => (
              <option key={centro} value={centro}>
                {centro}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Escolaridade:</label>
          <select name="escolaridade" value={formData.escolaridade} onChange={handleSelectChange} required>
            <option value="">Selecione</option>
            {escolaridades.map((escolaridade) => (
              <option key={escolaridade} value={escolaridade}>
                {escolaridade}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleCEPChange}
            onBlur={buscarCEP}
            placeholder="00000-000"
            required
          />
        </div>
        <div>
          <label>Rua:</label>
          <input type="text" name="rua" value={formData.rua} onChange={handleInputChange} />
        </div>
        <div>
          <label>Número:</label>
          <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} />
        </div>
        <div>
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} />
        </div>
        <div>
          <label>UF:</label>
          <input type="text" name="uf" value={formData.uf} onChange={handleInputChange} />
        </div>
        <div>
          <label>Salário Base:</label>
          <input
            type="text"
            name="salarioBase"
            value={formData.salarioBase}
            onChange={handleSalarioChange}
            placeholder="0,00"
            required
          />
        </div>
        <div>
          <label>Quantidade de Filhos:</label>
          <input type="number" name="filhos" value={formData.filhos} onChange={handleFilhosChange} min="0" required />
        </div>
        {formData.filhos > 0 &&
          formData.filhosInfo.map((filho, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h4>Filho {index + 1}</h4>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  value={filho.nome}
                  onChange={(e) => handleFilhoInfoChange(index, 'nome', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Data de Nascimento:</label>
                <input
                  type="date"
                  value={filho.dataNascimento}
                  onChange={(e) => handleFilhoInfoChange(index, 'dataNascimento', e.target.value)}
                  required
                />
                <span> Idade: {calcularIdade(filho.dataNascimento)}</span>
              </div>
              <div>
                <label>CPF:</label>
                <input
                  type="text"
                  value={filho.cpf}
                  onChange={(e) => handleFilhoInfoChange(index, 'cpf', e.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>
          ))}
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroFuncionarios;
