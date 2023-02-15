import Divider from "./index.vue";

Divider.install = (app: { component: any }) => {
  app.component(Divider.name, Divider);
};
export default Divider;