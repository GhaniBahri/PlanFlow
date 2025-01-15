import { register } from "../controllers/userController"


const routes = (app) => {
    app.post('/register', register)

}

export default routes