
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
// core components/views for RTL layout

const dashboardRoutes = [

  {
    path: "/user",
    name: "Cadastro de Produtos",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  

];

export default dashboardRoutes;
