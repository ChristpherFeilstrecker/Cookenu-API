import app from "./app"
import createUser from './endpoints/createUser'
import login from "./endpoints/login"
import { getMyProfile } from "./endpoints/getMyProfile"
import { getOtherProfile } from "./endpoints/getOtherProfile"
import { getRecipe } from "./endpoints/getRecipe"
import { creatRecipe } from "./endpoints/creatRecipe"
import followUser from "./endpoints/followUser"
import unfollowUser from "./endpoints/unfollowUser"
import { getFeedRecipes } from "./endpoints/getFeedRecipes"
import { createSQLTables } from "./data/migration"


//get
app.get('/user/profile', getMyProfile ) // Pegar próprio perfil --> ver OK
app.get('/user/feed', getFeedRecipes)// Pega as receitas dos usuários que segue --> OK
app.get('/user/:id', getOtherProfile) // Pegar perfil de outro usuário --> ver OK
app.get('/recipe/:id', getRecipe ) // Pegar receita --> ver OK

//post
app.post('/users/signup', createUser)  // Signup --> OK
app.post('/user/follow',followUser) // Seguir usuário --> ver OK
app.post('/user/unfollow',unfollowUser)//Parar de seguir usuário --> OK
app.post('/login',login) // Login                --> OK
app.post('/recipe',creatRecipe) // Criar receita --> OK


//put

//delete