# Projeto em Reactive Native

## Instlação

    npm install --global expo-cli

## Inciar Aplicação

    expo init my-project

## Executar Projeto
    expo start
## Icones

    expo install @expo/install-icons

### Uso

    import { Família_de_Icones } from '@expo/vector-icons';
    <Família_de_Icones name="nome-do-icone" />

## Fontes externas do Google

    expo install expo-font @expo-google-fonts/nome-da-fonte

### Uso

Na raiz do app (App.tsx)
    import { useFonts, Nome-da-Fonte-Tipo} from '@expo-google-fonts/nome-da-fonte';

### Verifica fonte carregada

  const [ fontsLoaded ] = useFonts({Nome-da-Fonte-Tipo});

## Navegação

    yarn add @react-navigation/native

    expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

    yarn add @react-navigation/stack

## Hack para Iphone X

    yarn add react-native-iphone-x-helper

### Uso

    import { getStatusBarHeight } from 'react-native-iphone-x-helper';

## Axios

    yarn add axios

## Json Server

    npm install -g json-server

### Uso

     json-server src\services\server.json --host 192.168.0.63 --port 3333 --delay 700 (Win)


## SVG

    expo install react-native-svg

## Animações com Lottie

    expo install lottie-react-native
