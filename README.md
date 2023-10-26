# Markdown Links - CLI e Biblioteca

## Índice

* 1. Prefácio 
* 2. Fluxograma
* 3. Instalação
* 4. Comandos no terminal
* 5. Testes
* 6. Checklist 

***
## Prefácio

Markdown é usada em muitas plataformas que manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos com este formato em qualquer repositório (começando pelo tradicional README.md). Os arquivos Markdown normalmente contém links que podem estar quebrados, ou que já não são válidos, prejudicando muito o valor da informação que está ali.

Nesse projeto, criou-se uma ferramenta, usando Node.js, que lê e analisa arquivos no formato Markdown, para verificar os arquivos que contenham links e mostrar algumas estatísticas. Neste projeto, foi criado uma ferramenta de linha de comando (CLI) assim como a sua própria biblioteca (library) em Javascript usando o Node.js.


***
## Fluxograma

IMAGEM

***
## Instalação

*  `npm install md-links-adilafreitas`

***
## Comandos no terminal 

O usuário que utilizar a ferramenta desenvolvida, poderá localizar os links em um arquivo de interesse com o comando abaixo:

* `md-links caminho-do-arquivo` 
<br>
</br>
  <img alt="Exemplo da funcionalidade --validate" width="850" src="" />

A segunda possibilidade de uso é inserir o comando --validate após o caminho do arquivo, para que assim a ferramenta informe os links que estão com erros.

* `md-links caminho-do-arquivo --validate` </br>
<br>
</br>
  <img alt="Exemplo da funcionalidade --validate" width="850" src="" />

A terceira funcionalidade, é verificar informações resumidas sobre os links, acrescentando o comando --stats:
* `md-links caminho-do-arquivo --stats` </br>
</br>
<img alt="Exemplo da funcionalidade --stats" width="850" src=" /><br>

Também é possível utilizar as duas opções acima, juntas:
* `md-links caminho-do-arquivo --stats --validate` 
</br>
</br>
<img alt="Exemplo da funcionalidade --stats" width="850" src="" /><br>

A ferramenta está apta a tratar os erros de arquivos não .md, exemplo:

* `md-links package.json`
<br>
</br>
<img alt="Exemplo da funcionalidade --stats" width="850" src="" />

***
## Testes

A aplicação foi finalizada com cobertura maior de 70%.

</br><img alt="Exemplo da funcionalidade --stats" width="850" src="" /><br>

***

## Checklist

- ✅ Possui CLI;
- ✅ É instalável;
- ✅ Passa pelo linter;
- ✅ Passa pelos testes (npm test);
- ✅ Inclui fluxograma de estudos e tomada de decisões no README.md;
- ✅ Testes unitários cobrem um mínimo de 70% de statements, functions, lines e branches;
- [✅] Package.json: deve possuir nome, versão, descrição, autor, licença, dependências e scripts (pretest, test e etc).


