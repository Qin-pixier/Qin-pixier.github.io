import Cell from './index.vue'
Cell.install = (app: { component: any }) =>{
    app.component(Cell.name, Cell)
}
export default Cell