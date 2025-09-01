import {ScrollView, StyleSheet, Text, View} from 'react-native'
import Header from '../components/Header'
import FormCadastro from "../components/FormCadastro";
import BtnCont from "../components/BtnCont";
import sizes from "../design/sizes";
import colors from "../design/colors";
import EmptyList from "../components/EmptyList";
import Search from "../components/Search";
import Card from "../components/Card";
import {useEffect, useState} from "react";

export default function HomeScreen(){
    const [lista, setLista] = useState([])
    const [totalCriado, setTotalCriado] = useState(0);
    const [totalConcluido, setTotalConcluido] = useState(0);
    const [textCadastro, setTextCadastro] = useState("");


    useEffect(() => {
        //total de tarefas concluidas
        var totalConcluidos = lista.filter(function (item){
            return item.concluido;
        })

        var totalNaoConcluidos = lista.filter(function (item){
            return !item.concluido
            // if (item.concluido === true) {return false} return true
        })

        setTotalConcluido(totalConcluidos.length)
        setTotalCriado(totalNaoConcluidos.length)

    }, [lista]);

    function cadastrarTarefa(){
        var listaAux = [...lista];

        listaAux.push({
            titulo: textCadastro,
            concluido: false
        });

        console.log(listaAux);
        setTextCadastro("")
        setLista(listaAux);
    }

    function concluirTarefa(index){
        var listaAux = [...lista];
        if (listaAux[index].concluido === false) {
            listaAux[index].concluido = true;
            setLista(listaAux);
        }
    }


    function excluirTarefa(index){
        var listaAux = [...lista];
        listaAux.splice(index, 1)
        setLista(listaAux);
    }

    function desconcluirTarefa(index){
        var listaAux = [...lista];
        if (listaAux[index].concluido === true) {
            listaAux[index].concluido = false;
            setLista(listaAux);
        }
    }


    return(
        <ScrollView>
            <Header/>
            <FormCadastro setTexto={setTextCadastro} fnCadastrar={cadastrarTarefa} texto={textCadastro}/>

            <View style={styles.containerBotoes}>
                <BtnCont titulo={"Tarefas Criadas"} numero={totalCriado}/>
                <BtnCont titulo={"Concluidas"} numero={totalConcluido} isGreen={true}/>
            </View>
            <Search/>

            {lista.length === 0 && <EmptyList/>}

            {lista.map(function (item, index){
                return(
                    <Card fnDesconcluir={() => desconcluirTarefa()} fnConcluir={() => concluirTarefa(index)} fnExcluir={() =>excluirTarefa(index)} key={index} texto={item.titulo} ativo={item.concluido}/>
                )
            })}

        </ScrollView>
    )
}

const styles=StyleSheet.create({
    containerBotoes:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal: sizes.margin_horizontal,
        marginTop: sizes.padding_large,
        paddingBottom: sizes.padding_large,
        borderBottomWidth: 2,
        borderBottomColor: colors.gray_330,
    }
})