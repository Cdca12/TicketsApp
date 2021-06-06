import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categorias from "../views/categorias/Categorias.vue";
import AgregarCategoria from "../views/categorias/AgregarCategoria.vue";
import Personal from "../views/personal/Personal.vue";
import AgregarPersonal from "../views/personal/AgregarPersonal.vue";
import EditarPersonal from "../views/personal/EditarPersonal.vue";
import Tickets from "../views/tickets/Tickets.vue";
import AgregarTicket from "../views/tickets/AgregarTicket.vue";
import EditarTicket from "../views/tickets/EditarTicket.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/categorias/agregar",
    name: "AgregarCategoria",
    component: AgregarCategoria,
  },
  {
    path: "/personal",
    name: "Personal",
    component: Personal,
  },
  {
    path: "/personal/agregar",
    name: "AgregarPersonal",
    component: AgregarPersonal,
  },
  {
    path: "/personal/editar/:id",
    name: "EditarPersonal",
    component: EditarPersonal,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
  },
  {
    path: "/tickets/agregar",
    name: "AgregarTicket",
    component: AgregarTicket,
  },
  {
    path: "/tickets/editar/:id",
    name: "EditarTicket",
    component: EditarTicket,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
