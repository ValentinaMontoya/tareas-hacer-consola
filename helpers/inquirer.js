const inquirer = require('inquirer')
const colors = require('colors')

const inquirerMenu = async () => {
  console.clear()
  console.log(colors.rainbow('=============================='))
  console.log(
    colors.cyan('||'.rainbow + '  Seleccione una opción   ' + '||'.rainbow)
  )
  console.log(colors.rainbow('=============================='))
  const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        {
          value: 1,
          name: `${'1.'.cyan} Crear una tarea`,
        },
        {
          value: 2,
          name: `${'2.'.cyan} Listar tareas`,
        },
        {
          value: 3,
          name: `${'3.'.cyan} Listar tareas completadas`,
        },
        {
          value: 4,
          name: `${'4.'.cyan} Listar tareas pendientes`,
        },
        {
          value: 5,
          name: `${'5.'.cyan} Completar tarea(s)`,
        },
        {
          value: 6,
          name: `${'6.'.cyan} Borrar tarea`,
        },
        {
          value: 7,
          name: `${'7.'.cyan} Salir`,
        },
      ],
    },
  ]

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `presion ${'enter'.red} para continuar`,
    },
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message, // En realidad es message : message solo que el vs lo entiende
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      },
    },
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.cyan
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.cyan + 'Cancelar',
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mosterarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.cyan
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    }
  })

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ]

  const { ids } = await inquirer.prompt(preguntas)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mosterarListadoChecklist,
}
