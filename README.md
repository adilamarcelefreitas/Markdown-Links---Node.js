# Markdown Links - CLI e Library (Node.js)

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Fluxograma](#2-fluxograma)
* [3. Instalação](#3-instalação)
* [4. Comandos no terminal](#4-comandos-no-terminal)
* [5. Testes](#5-testes)
* [6. Checklist](#6-checklist)

***
## Prefácio

Markdown é usada em muitas plataformas que manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos com este formato em qualquer repositório (começando pelo tradicional README.md). Os arquivos Markdown normalmente contém links que podem estar quebrados, ou que já não são válidos, prejudicando muito o valor da informação que está ali.

Nesse projeto, criou-se uma ferramenta, usando Node.js, que lê e analisa arquivos no formato Markdown, para verificar os arquivos que contenham links e mostrar algumas estatísticas. Neste projeto, foi criado uma ferramenta de linha de comando (CLI) assim como a sua própria biblioteca (library) em Javascript usando o Node.js.


***
## Fluxograma

![Fluxograma MDLINKS -](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/78222e7b-9b06-4aa3-8024-14ff7b44757a)

***
## Instalação

*  `npm install md-links-adilafreitas`

***
## Comandos no terminal 

O usuário que utilizar a ferramenta desenvolvida, poderá localizar os links em um arquivo de interesse com o comando abaixo:

* `md-links caminho-do-arquivo` 
<br>

![md-links](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/8e153aaf-fa02-4189-b7e2-c5557e15d8dc)

A segunda possibilidade de uso é inserir o comando --validate após o caminho do arquivo, para que assim a ferramenta informe os links que estão com erros.

* `md-links caminho-do-arquivo --validate` </br>
<br>
  
![--validate](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/fa68d65c-c557-4f6d-9839-23d06b7c137e)

A terceira funcionalidade, é verificar informações resumidas sobre os links, acrescentando o comando --stats:
* `md-links caminho-do-arquivo --stats` </br>
<br>

![--stats](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/99846cee-850e-4151-b271-b5065e4218d4)

Também é possível utilizar as duas opções acima, juntas:
* `md-links caminho-do-arquivo --stats --validate` 
</br>

![--validate --stats](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/1df29c6b-45f1-4903-bf4b-ac3ca259e813)


A ferramenta está apta a tratar os erros de arquivos não .md, exemplo:
* `md-links package.json`
<br>

![error](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/f438a3f2-0bd9-4614-972f-c2cbdf2d743d)

***
## Testes

A aplicação foi finalizada com cobertura maior de 70%.
<br>
![testesunitariosmdlinks](https://github.com/adilamarcelefreitas/SAP011-md-links/assets/137333338/af8491b6-e844-4d57-97f9-19dea33472e1)

***

## Checklist

- ✅ Possui CLI;
- ✅ É instalável;
- ✅ Passa pelo linter;
- ✅ Passa pelos testes (npm test);
- ✅ Inclui fluxograma de estudos e tomada de decisões no README.md;
- ✅ Testes unitários cobrem um mínimo de 70% de statements, functions, lines e branches;
- [✅] Package.json: deve possuir nome, versão, descrição, autor, licença, dependências e scripts (pretest, test e etc).
***

## Desenvolvedora:

👩‍💻 Ádila Freitas - [LinkedIn](https://www.linkedin.com/in/adilamarcelefreitas/) | [GitHub](https://github.com/adilamarcelefreitas) 


