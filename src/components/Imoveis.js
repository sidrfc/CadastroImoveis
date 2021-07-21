import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    NativeBaseProvider,
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Image,
  } from 'native-base';


export default class Imoveis extends Component {
    render() {
        return(
            <NativeBaseProvider>
            <Box
              margin={1}
              padding={2}
              bg="#00ff99"
              rounded="lg"
              alignSelf="center"
              width={375}
              maxWidth="95%"
            >
              <HStack justifyContent="space-between">
                <Box justifyContent="space-between">
                  <VStack space={2}>
                    <Text fontSize="sm" color="black" fontWeight={'bold'}>
                        {this.props.id} - {this.props.endereco}
                    </Text>
                    <Text color="black" fontSize="xs">
                        {this.props.finalidade}
                    </Text>


                    <Text color="black" fontSize="xs">
                        Tipo: {this.props.tipo}
                    </Text>
                    <Text color="black" fontSize="xs">
                        Valor: R$ {this.props.valor}
                    </Text>                    
                  </VStack>
                  <Pressable

                    marginTop={1}
                    padding={2}
                    rounded="sm"
                    bg="red.600"
                    alignSelf="flex-start"
                    onPress={ ()=> {this.props.excluir(this.props.id)}}
                  >
                    <Text
                      textTransform="uppercase"
                      fontSize={'xs'}
                      fontWeight="bold"
                      color="white"
                    >
                      <Icon name="delete" size={13} color="white" /> EXCLUIR
                    </Text>
                  </Pressable>

                </Box>
                <Image
                  source={{
                    uri: this.props.imagem,
                  }}
                  alt={"..."}
                  height={70}
                  rounded="full"
                  width={70}
                />
              </HStack>
            </Box>
            
          </NativeBaseProvider>



        )
    }
}

