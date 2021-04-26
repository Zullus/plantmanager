# Projeto em Reactive Native

## Instlação

    npm install --global expo-cli

## Rodar Aplicação

expo init my-project

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