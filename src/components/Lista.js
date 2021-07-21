import React, {Component} from 'react';
import { View,  TextInput, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Banco from '../database/Banco';
import Imovel from '../model/Imovel';
import Imoveis from '../components/Imoveis';
import { DevSettings } from 'react-native';

import {
  NativeBaseProvider,
  Text
} from 'native-base';

export default class Lista extends Component {
    // Iniciação dos nossos states
    constructor(props) {
      super(props);
      this.state = {
        endereco: "",
        finalidade: "",
        tipo: "",
        valor: "",
        imagem: "",
        imoveis: []
      }
      this.imoveis = []
      this.listar()
    }

    // Métodos com persistencia no banco
    listar() {
      const db = new Banco();
      db.listar().then(data => {
        this.setState({imoveis: data})
      })
    }

    cadastrar(endereco, finalidade, tipo, valor, imagem) {
      const db = new Banco();
      const imovel = new Imovel(endereco, finalidade, tipo, valor, imagem);
      db.adicionar(imovel);
      DevSettings.reload();
    }

    remover(id) {
      const db = new Banco();
      db.deletar(id).then(data => {
        DevSettings.reload();
      })
    }

    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
        this.setState({ imagem: data.uri })
      }
    };

    render() {
        return(
            <NativeBaseProvider  >   

                <Text alignSelf="center">LISTA DE IMOVÉIS</Text>

                <ScrollView margin={8}> 
                  {this.state.imoveis.map(imovel => (
                    <Imoveis key={imovel.id} id={imovel.id} endereco={imovel.endereco} finalidade={imovel.finalidade} tipo={imovel.tipo} valor={imovel.valor} imagem={imovel.imagem} excluir={this.remover}></Imoveis>
                  ))}
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    height: 20,
    width: 100
  },
  capture: {
    flex: 0,
    backgroundColor: '#00ff99',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});