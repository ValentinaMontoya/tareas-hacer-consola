const colors = require('colors')
const { resolve } = require('path')

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear()
    console.log(colors.rainbow('=============================='))
    console.log(
      colors.magenta('||'.rainbow + '  Seleccione una opción   ' + '||'.rainbow)
    )
    console.log(colors.rainbow('=============================='))

    console.log(`${'1.'.red} Crear una tarea`)
    console.log(`${'2.'.red} Listar tareas`)
    console.log(`${'3.'.red} Listar tareas completadas`)
    console.log(`${'4.'.red} Listar tareas pendientes`)
    console.log(`${'5.'.red} Completar tarea(s)`)
    console.log(`${'6.'.red} Borrar tarea`)
    console.log(`${'0.'.red} Salir`)

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    readline.question(`Seleccione una opción: `, (opt) => {
      readline.close()
      resolve(opt)
    })
  })
}

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question(`Presione ENTER para continuar`, (opt) => {
      readline.close()
      resolve()
    })
  })
}

module.exports = {
  mostrarMenu,
  pausa,
}
