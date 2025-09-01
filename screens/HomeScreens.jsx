import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native'
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
    const [textFiltro, setTextFiltro] = useState("");






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
        if (textCadastro.trim() === "") {
            Alert.alert("Não é possivel adicionar tarefas vazias!")
            return
        }

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].titulo.toLowerCase() === textCadastro.toLowerCase()) {
                Alert.alert("Essa tarefa já existe!")
                return
            }
        }

        var listaAux = [...lista];

        listaAux.push({
            titulo: textCadastro,
            concluido: false
        });

        console.log(listaAux);
        setTextCadastro("")
        setLista(listaAux);
    }



    function concluirTarefa(index) {
        var listaAux = [...lista];
        listaAux[index].concluido = !listaAux[index].concluido;
        setLista(listaAux);
    }

    function excluirTarefa(index){
        var listaAux = [...lista];
        listaAux.splice(index, 1)
        setLista(listaAux);
    }

    return(
        <ScrollView>
            <Header/>
            <FormCadastro setTexto={setTextCadastro} fnCadastrar={cadastrarTarefa} texto={textCadastro}/>

            <View style={styles.containerBotoes}>
                <BtnCont titulo={"Tarefas Criadas"} numero={totalCriado}/>
                <BtnCont titulo={"Concluidas"} numero={totalConcluido} isGreen={true}/>
            </View>

            <Search texto={textFiltro} setTexto={setTextFiltro} />


            {lista.length === 0 && <EmptyList/>}


            {lista
                .sort(function (a, b){
                    return a.concluido - b.concluido
                })
                .map(function (item, index){
                if (item.titulo.toLowerCase().includes(textFiltro.toLowerCase())){
                    return(
                        <Card fnDesconcluir={() => desconcluirTarefa()} fnConcluir={() => concluirTarefa(index)} fnExcluir={() =>excluirTarefa(index)} key={index} texto={item.titulo} ativo={item.concluido}/>
                    )
                }
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