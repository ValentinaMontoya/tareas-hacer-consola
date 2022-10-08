const Tarea = require('./tarea')
const colors = require('colors')

class Tareas {
  _listado = {}

  constructor() {
    this._listado = {}
  }

  get getListadoArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArr(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto() {
    this.getListadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.cyan
      const { desc, completadoEn } = tarea
      const estado = completadoEn ? 'Completada'.cyan : 'Pendiente'.cyan

      console.log(`${idx} ${desc} :: ${estado}`)
    })
  }

  listarPendientesEmpletadas(Completadas = true) {
    let contador = 0
    this.getListadoArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea
      const estado = completadoEn ? 'Completada'.cyan : 'Pendiente'.cyan

      if (Completadas && estado === 'Completada'.cyan) {
        contador++
        console.log(`${(contador + '.').cyan} ${desc} :: ${completadoEn}`)
      }

      if (!Completadas && estado === 'Pendiente'.cyan) {
        contador++
        console.log(`${(contador + '.').cyan} ${desc} :: ${estado}`)
      }
    })
  }
  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.getListadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas
