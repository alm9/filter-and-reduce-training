// DESAFIO 1 - BOOTCAMP DESENVOLVEDOR MOBILE - IGTI
//Autor: André de Lima Machado

document.getElementById('conteudo').innerHTML =
  'Não é possível exibir os resultados!';

const showAll = (result) => {
  const output = JSON.stringify(result);
  document.getElementById('conteudo').innerHTML = output;
  document.getElementById('conteudo').style.fontSize = '20px';
  document.getElementById('conteudo').style.color = 'red';
  document.getElementById('conteudo').style.backgroundColor = 'yellow';
};

const filterByBalance = (result, value) => {
  result = result.filter((el) => {
    if (el.balance > value) return el;
  });
  const output = JSON.stringify(result);
  document.getElementById('conteudo').innerHTML = output;
};

const sumBalanceOfAgency = (result, agency) => {
  const sum = result.reduce((acc, item) => {
    if (item.agencia === agency) return acc + item.balance;
    return acc;
  }, 0);
  document.getElementById('conteudo').innerHTML = 'Soma = ' + sum;
};

const sumCustomersOfAgency = (result, agency) => {
  const sum = result.reduce((acc, item) => {
    if (item.agencia === agency) return acc + 1;
    return acc;
  }, 0);
  document.getElementById('conteudo').innerHTML = 'Soma = ' + sum;
};

const sumBalanceAll = (result) => {
  const sum = result.reduce((acc, item) => acc + item.balance, 0);
  document.getElementById('conteudo').innerHTML = 'Soma = ' + sum;
};

const quantAccountsBalanceHigh = (result, value) => {
  const sum = result.reduce(
    (cont, item) => (item.balance > value ? cont + 1 : cont),
    0
  );
  document.getElementById('conteudo').innerHTML = 'Soma = ' + sum;
};

const quantAccountsBalanceHighInAgency = (result, value, ag) => {
  const sum = result.reduce(
    (cont, { balance, agencia }) =>
      agencia === ag && balance > value ? cont + 1 : cont,
    0
  );
  document.getElementById('conteudo').innerHTML = 'Soma = ' + sum;
};

const highestBalance = (result) => {
  const highest = result.reduce((previous, item) =>
    item.balance > previous.balance ? item : previous
  );
  document.getElementById('conteudo').innerHTML = `Informações do mais rico:<br>
    Nome: ${highest.name}<br>
    Saldo: ${highest.balance}<br>
    Agência: ${highest.agencia}`;
};

const lowestBalance = (result) => {
  const highest = result.reduce((previous, item) =>
    item.balance < previous.balance ? item : previous
  );
  document.getElementById(
    'conteudo'
  ).innerHTML = `Informações do mais pobre:<br>
    Nome: ${highest.name}<br>
    Saldo: ${highest.balance}<br>
    Agência: ${highest.agencia}`;
};

const sumBalanceEachAgency = (result) => {
  const sumAgencies = result.reduce((acc, { agencia, balance }) => {
    // console.log(acc);
    acc.has(agencia)
      ? acc.set(agencia, acc.get(agencia) + balance)
      : acc.set(agencia, balance);
    return acc;
  }, new Map());
  console.log('VEJA:');
  console.log(sumAgencies);

  return [...sumAgencies].sort((a, b) => a[1] - b[1]);
};

const highestAgency = (result) => {
  const agencies = sumBalanceEachAgency(result);
  // console.log(agencies);
  //obter value do próximo item do map:
  // const [highestAgency, amount] = agencies.entries().next().value;
  const [highestAgency, amount] = agencies.pop();
  // console.log(highestAgency);
  document.getElementById(
    'conteudo'
  ).innerHTML = `Informações da agência mais rica:<br>
    Agência: ${highestAgency}<br>
    Saldo total: ${amount}`;
};

const lowestAgency = (result) => {
  const agencies = sumBalanceEachAgency(result);
  const [highestAgency, amount] = agencies.shift();
  document.getElementById(
    'conteudo'
  ).innerHTML = `Informações da agência mais rica:<br>
    Agência: ${highestAgency}<br>
    Saldo total: ${amount}`;
};

const highestEachAgency = (result) => {
  return result.reduce((acc, { agencia, balance }) => {
    if (!acc.has(agencia) || acc.get(agencia) < balance)
      acc.set(agencia, balance);
    return acc;
  }, new Map());
};

const sumRichestEachAgency = (result) => {
  const highests = highestEachAgency(result);
  // console.log(highests);
  let sum = [...highests].reduce((acc, current) => {
    // console.log(acc, current);
    return acc + current[1];
  }, 0);
  document.getElementById(
    'conteudo'
  ).innerHTML = `Saldo somado dos mais ricos de cada agência:<br>${sum}`;
};

const richestfromAgency = (result, agency) => {
  const rich = result.reduce(
    (previous, { name, agencia, balance }) => {
      if (agency !== agencia || balance < previous[0]) return previous;
      return [balance, name];
    },
    [-1, 'Erro: Nao existe ninguém nessa agência!']
  );
  document.getElementById(
    'conteudo'
  ).innerHTML = `A pessoa + rica da agência ${agency} é: ${rich[1]}, com ${rich[0]}`;
};

const poorestfromAgency = (result, agency) => {
  const poor = result.reduce(
    (previous, { name, agencia, balance }) => {
      if (agency !== agencia || balance > previous[0]) return previous;
      return [balance, name];
    },
    [9999999999999, 'Erro: Nao existe ninguém nessa agência!']
  );
  document.getElementById(
    'conteudo'
  ).innerHTML = `A pessoa + pobre da agência ${agency} é: ${poor[1]}, com ${poor[0]}`;
};

const poorestsfromAgency = (result, agency) => {
  const poor = result.filter(({ agencia }) => agency === agencia);
  console.log(poor);
  poor.sort((a, b) => a.balance - b.balance);
  document.getElementById(
    'conteudo'
  ).innerHTML = `As pessoas + pobres da agência ${agency} são:<br>
  ${poor[0].name}, com ${poor[0].balance},<br>
  ${poor[1].name}, com ${poor[1].balance},<br>
  ${poor[2].name}, com ${poor[2].balance}
  `;
};

const hasNameInAgency = (result, text, agency) => {
  //poderia contar com reduce, mas irei filtrar e ver o length
  const filtered = result.filter(
    ({ name, agencia }) => agencia === agency && name.includes(text)
  );

  document.getElementById('conteudo').innerHTML = `${filtered.length} ${text}`;
};

const nextId = (result) => {
  const highest = result.reduce((previous, item) =>
    item.id > previous.id ? item : previous
  );
  document.getElementById('conteudo').innerHTML = `Id livre: ${
    highest.id + 1
  }<br><br>Informações do ultimo usuário cadastrado:<br>
    Nome: ${highest.name}<br>
    Saldo: ${highest.balance}<br>
    Agência: ${highest.agencia}`;
};

const execute = async () => {
  //Obtenção dos dados da API:

  // FORMA ANTIGA, COM then()
  // let response = fetch('http://localhost:3090/api/accounts')
  //   .then((resp) => resp.json())
  //   .catch((er) => er.json());
  // SEGUNDA FORMA, COM await
  let response = await fetch('http://localhost:3090/api/accounts');
  response = response.json();

  //Manipulando os dados da API:

  // showAll(await resultado);
  // filterByBalance(await response, 1000);
  // sumBalanceOfAgency(await response, 25);
  // sumBalanceAll(await response); //QUESTÃO 1
  // quantAccountsBalanceHigh(await response, 100);  //QUESTÃO 2
  // quantAccountsBalanceHighInAgency(await response, 100, 33); //QUESTÃO 3
  // highestBalance(await response);
  // lowestBalance(await response);
  // highestAgency(await response); //QUESTÃO 4
  // lowestAgency(await response); //QUESTÃO 5
  // sumRichestEachAgency(await response); //QUESTÃO 6
  // richestfromAgency(await response, 10); //QUESTÃO 7
  // poorestfromAgency(await response, 47); //QUESTÃO 8
  // poorestsfromAgency(await response, 47); //QUESTÃO 9
  // sumCustomersOfAgency(await response, 47); //QUESTÃO 10
  // hasNameInAgency(await response, 'Maria', 47); //QUESTÃO 11
  nextId(await response); //QUESTÃO 12
};

execute();
