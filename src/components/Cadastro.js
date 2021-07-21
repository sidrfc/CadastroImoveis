import React, {Component} from 'react';
import { View,  TextInput, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import Banco from '../database/Banco';
import Imovel from '../model/Imovel';

import { DevSettings } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { NativeBaseProvider, Text, Box, ScrollView } from 'native-base';

export default class Cadastro extends Component {
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
            <NativeBaseProvider>   
              <Text alignSelf="center">CADASTRO DE IMOVÉIS</Text>
              <ScrollView margin={3}>
                
              <Box flex={1} bg="#ffffff" >

                <Text>Endereço:</Text>
                <TextInput placeholder="Informe o endereço.." onChangeText={ (endereco) => {this.setState({endereco: endereco})}}></TextInput>
                <Text>Finalidade (Venda/Aluguel):</Text>
                <TextInput placeholder="Informe a finalidade (Venda/Aluguel)..." onChangeText={ (finalidade) => {this.setState({finalidade: finalidade})}}></TextInput>
                <Text>Tipo (Casa/Apartamento):</Text>
                <TextInput placeholder="Informe o tipo (Casa/Apartamento)..." onChangeText={ (tipo) => {this.setState({tipo: tipo})}}></TextInput>
                <Text>Valor (R$)  :</Text>
                <TextInput placeholder="Informe o valor (R$)..." onChangeText={ (valor) => {this.setState({valor: valor})}}></TextInput>

                <Text></Text><Text></Text><Text></Text>
                <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}

            // Irá pedir permissão para acessar a câmera, caso não haja
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Nós precisamos da sua permissão para usar a câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
            // Irá pedir permissão para acessar o áudio, caso não haja
            androidRecordAudioPermissionOptions={{
              title: 'Permissão para usar gravação de áudio',
              message: 'Precisamos da sua permissão para usar seu áudio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
          />


              <Text></Text>
              <Text></Text>
 

          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }} >
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 12 }}> TIRAR FOTO </Text>
            </TouchableOpacity>
          </View>
        </View>
                <TouchableHighlight style={styles.save} onPress={() => {this.cadastrar(this.state.endereco, this.state.finalidade, this.state.tipo, this.state.valor, this.state.imagem)}}>
                  <Text>CADASTRAR</Text>
                </TouchableHighlight>
              </Box>
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
    padding: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  save: {
    flex: 0,
    backgroundColor: '#61faf5',
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});