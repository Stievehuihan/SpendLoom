// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gasto-form');
  const listaGastos = document.getElementById('lista-gastos');
  const filterMonth = document.getElementById('filter-month');
  const totalGeral = document.getElementById('total-geral');
  const monthlyTotal = document.getElementById('monthly-total');
  const limparTudoBtn = document.getElementById('limpar-tudo');
  const exportBtn = document.getElementById('export-btn');
  const somDinheiro = document.getElementById('somDinheiro');

  let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

  // Função para formatar valor em reais
  const formatarMoeda = (valor) => {
      return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  // Função para atualizar os totais
  const atualizarTotais = () => {
      const total = gastos.reduce((sum, gasto) => sum + gasto.valor, 0);
      totalGeral.textContent = formatarMoeda(total);

      const mesSelecionado = filterMonth.value;
      const gastosFiltrados = mesSelecionado === 'todos' 
          ? gastos 
          : gastos.filter(g => g.mes === mesSelecionado);
      const totalMensal = gastosFiltrados.reduce((sum, gasto) => sum + gasto.valor, 0);
      monthlyTotal.textContent = formatarMoeda(totalMensal);
  };

  // Função para renderizar a lista de gastos
  const renderizarGastos = () => {
      listaGastos.innerHTML = '';
      const mesSelecionado = filterMonth.value;
      const gastosFiltrados = mesSelecionado === 'todos' 
          ? gastos 
          : gastos.filter(g => g.mes === mesSelecionado);

      if (gastosFiltrados.length === 0) {
