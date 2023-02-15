import CellGroup from './index.vue'
CellGroup.install = (app: { component: any }) =>{
    app.component(CellGroup.name, CellGroup)
}
export default CellGroup