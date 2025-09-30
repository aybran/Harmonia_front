// componente rexsponsavel por emitir notificações utilizando a biblioteca react-hot-tost
import { AuthProvider } from "./context/AuthContext";

// importação do arquivo authProvider responsavel pelo autemeticação de rotas privadas

//importação do appRoutes  componente de gerenciamento de rotas 
import { AppRoutes } from "./routes/AppRoutes";

// construção codigo principal 
function App(){
  return(
     <AuthProvider>
       <AppRoutes/>
     </AuthProvider>
  )
}
export default App;