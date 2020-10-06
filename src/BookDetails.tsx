import React from 'react';
import { RouteProps } from 'react-router';
import 'antd/dist/antd.css';
import { Typography} from 'antd';

const { Title} = Typography;

class BookDetails extends React.Component<RouteProps>{
    render() {
        return (
            <div>
                <Title> Detalhes do livro </Title>
                <h3>Nome: {this.props.location.state.titulo}</h3>
                <h3>Autor: {this.props.location.state.autor}</h3>
                <h3>Idioma: {this.props.location.state.idioma}</h3>
                <h3>Ano de Publicação: {this.props.location.state.ano}</h3>
                <h3>Editora:  {this.props.location.state.editora}</h3>
                <h3>Edição: {this.props.location.state.edicao}</h3>
                <h3>ISBN: {this.props.location.state.isbn}</h3>
            </div>
        );
    }
}
export default BookDetails;