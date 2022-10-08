const colors = require('colors')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mosterarListadoChecklist,
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarLeerArchivo')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()
  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)
        break
      case 2:
        tareas.listadoCompleto()
        break
      case 3:
        tareas.listarPendientesEmpletadas(true)
        break
      case 4:
        tareas.listarPendientesEmpletadas(false)
        break
      case 5:
        const ids = await mosterarListadoChecklist(tareas.getListadoArr)
        tareas.toggleCompletadas(ids)
        break
      case 6:
        const id = await listadoTareasBorrar(tareas.getListadoArr)
        if (id !== 0) {
          const resp = await confirmar('¿Está seguro?')
          if (resp) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          }
        }
        console.log({ id })
        break
    }
    guardarDB(tareas.getListadoArr)

    if (opt !== 7) await pausa()
  } while (opt !== 7)
  //   pausa()
}

main()
