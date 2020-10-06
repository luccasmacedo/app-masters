import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BookDetails from './BookDetails';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

function Books(props: any) {
    const buttonStile = {
        alignItems: "center",
        display: "flex"
    };

    let books = require("./booksArray.js");

    //Solicita o nome da pessoa que realiza o emprestimo do livro
    function inputUserName(book: any) {

        let personName = prompt("Qual o seu nome?");
        let date = new Date();

        if (personName) {

            //Cria objeto para ser salvo no navegador
            let livroEmprestado = {
                title: '',
                name: personName,
                date: date
            }
            livroEmprestado.title = book;

            //Checa se existe dados de emprestimo no armazenamento local do navegador
            if (localStorage.getItem('arr')) {

                let arr = localStorage.getItem('arr');

                if (arr) {
                    let array = JSON.parse(arr);
                    array.push(livroEmprestado);
                    localStorage.setItem('arr', JSON.stringify(array));
                }
            }
            else {

                //Senao, cria array e armazena localmente
                const array: Object[] = [];
                array.push(livroEmprestado);
                localStorage.setItem('arr', JSON.stringify(array));
            }
        }
     window.location.reload();
    }

    //Exlui dados do livro emprestado
    function refund(book: any) {

        let r = window.confirm("Deseja confirmar Devolucao?");

        if (r) {
            let arr = localStorage.getItem('arr');

            if (arr) {

                let array = JSON.parse(arr);
                let index = array.findIndex(obj => obj.title === book);
                array.splice(index, 1);

                localStorage.setItem('arr', JSON.stringify(array));
            }
        }
	window.location.reload();
    }

    //Cria os botoes de pegar livro e devolucao
    function displayButton(book: any) {

        if (localStorage.getItem('arr')) {

            let arr = localStorage.getItem('arr');

            if (arr) {

                let array = JSON.parse(arr);
                let index = array.findIndex(obj => obj.title === book);

                //Mostra botao de devolucao caso emprestado
                if (index !== -1) {
                    return (
                        <div>
                            <Text type="warning"> Emprestado para {array[index].name} as {array[index].date}</Text>
                            <Button type="default" danger style={buttonStile} onClick={() => refund(book)}>Devolver livro</Button>
                        </div>
                    );
                } else {
                    //Retorna botao pegar livro
                    return (
                        <Button type="primary" style={buttonStile} onClick={() => inputUserName(book)}>Pegar livro</Button>
                    );
                }
            }
        } else {
            //Retorna botao pegar livro
            return (
                <Button type="primary" style={buttonStile} onClick={() => inputUserName(book)}>Pegar livro</Button>
            );
        }
    }

    //Lista os livros e adiciona parametros a rota para ser acessado pelo componente que detalha as informacoes do livro
    const listBooks = books.map((book: any) =>
        <li key={book.titulo.toString()} >
            <Link to={{
                pathname: `/bookdetails`, state:
                {
                    titulo: book.titulo,
                    isbn: book.isbn10,
                    ano: book.anoPublicacao,
                    autor: book.autor,
                    idioma: book.idioma,
                    editora: book.editora,
                    edicao: book.edicao
                }
            }}> {book.titulo}</Link>
            {displayButton(book.titulo)}
        </li>
    );

    return (
        <Router>
            <ul>{listBooks}</ul>
            <Switch>
                <Route exact path='/bookdetails' component={BookDetails} />
            </Switch>
        </Router>
    );
}
export default Books;
