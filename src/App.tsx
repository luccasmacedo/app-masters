import React from 'react';
import Books from './Books';
import { Layout } from 'antd';
import './styles.css';

const { Header, Footer, Content } = Layout;

function App() {
  const mystyle = {
    color: "white",
    outline: "currentcolor none medium",
    padding: "10px",
    fontFamily: "Poppins",
    lineHeight: "1.2em",
    fontSize: "40px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  };
  return (
    <Layout>
      <Header style={mystyle} >Biblioteca da App Masters</Header>
      <Content><Books /></Content>
      <Footer></Footer>
    </Layout>
  );

}
export default App;