    // =========================================================================
    // 1. BASE DE DATOS COMPLETA DE LOS 45 ARCHIVOS KOTLIN (TEMAS 03 AL 07)
    // =========================================================================
    const FILES_DATA = [
      // ============================ TEMA 03 (1) ==============================
      {
        id: "t03-ej01",
        topic: "Tema 03",
        exercise: "EJERCICIOSTema03",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema03/EJERCICIOSTema03/app/src/main/java/com/example/ejercicios_tema03/MainActivity.kt",
        summary: "Colecciones Kotlin (filter, map, forEach, find) y ejercicios comentados 01–09 (variables, when, funciones, primos, arrays).",
        code: `package com.example.ejercicios_tema03

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.ejercicios_tema03.ui.theme.EJERCICIOSTema03Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJERCICIOSTema03Theme {
                val precios: List<Double> = listOf(8.50, 15.0, 4.50, 20.0, 12.0, 7.0)
                val preciosSuperioresADiez: List<Double> = precios.filter { it >= 10.0 }
                Log.d("TAG", "$preciosSuperioresADiez")

                val preciosConDescuentos: List<Double> = preciosSuperioresADiez.map { it * 0.9 }
                Log.d("TAG", "$preciosConDescuentos")

                preciosConDescuentos.forEach {
                    Log.d("TAG", "Precio final de cada producto superior a 10: $it €")
                }

                val productoSuperiorADieciocho: Double? = precios.find { it >= 18.0 }
                Log.d("TAG", "El producto mayor a 18: $productoSuperiorADieciocho")

                precios.filter { it >= 10.0 }
                    .map { it * 0.9 }
                    .forEach { Log.d("TAG", "Precio final de cada producto encadenado: $it €") }
            }
        }
    }
}

/*
// EJERCICIO01
val asignatura: String = "Matematicas"
val notaPrimerExamen: Double = 8.0
val notaSegundoExamen: Double = 9.0
val notaMedia: Double = (notaPrimerExamen + notaSegundoExamen) / 2
Log.d("TAG", "ASIGNATURA: $asignatura")
Log.d("TAG", "NOTA DEL PRIMER EXAMEN: $notaPrimerExamen")
Log.d("TAG", "NOTA DEL SEGUNDO EXAMEN: $notaSegundoExamen")
Log.d("TAG", "NOTA MEDIA: $notaMedia")

// EJERCICIO02
val totalEuros: Int = 130
val billetes50: Int = totalEuros / 50
val resto: Int = totalEuros % 50
val billetes10: Int = resto / 10
Log.d("TAG", "$totalEuros euros hacen un total de: $billetes50 billetes de 50 euros y $billetes10 billetes de 10 euros")

// EJERCICIO03
val nombreUsuario: String = "admin"
val passwordUsuario: String? = "Adm1"
passwordUsuario?.let {
    Log.d("TAG", "Bienvenido $nombreUsuario")
    Log.d("TAG", "El password introducido es $passwordUsuario")
} ?: run {
    Log.d("TAG", "Error: $nombreUsuario no ha introducido el password requerido")
}

// EJERCICIO04
val num1: Int = 10
val num2: Int = 20
val num3: Int = 30
mostrarNumeros(num1, num2, num3)
sumaNumeros(num1, num2, num3)
val media: Double = calcularMedia(num1, num2, num3)
Log.d("TAG", "La media es: $media")
operaciones(media, num3)

fun mostrarNumeros(num1: Int, num2: Int, num3: Int) {
    Log.d("TAG", "Numero 1: $num1")
    Log.d("TAG", "Numero 2: $num2")
    Log.d("TAG", "Numero 3: $num3")
}

fun sumaNumeros(num1: Int, num2: Int, num3: Int) {
    val suma: Int = num1 + num2 + num3
    Log.d("TAG", "La suma es: $suma")
}

fun calcularMedia(num1: Int, num2: Int, num3: Int): Double {
    return (num1 + num2 + num3) / 3.0
}

fun operaciones(media: Double, num3: Int) {
    val resultado: Double = media * num3
    Log.d("TAG", "La multiplicacion de la media por el num3 es: $resultado")
}

// EJERCICIO06
val nota: Int = 9
when (nota) {
    in 0..4 -> Log.d("TAG", "SUSPENSO")
    in 5..6 -> Log.d("TAG", "BIEN")
    in 7..8 -> Log.d("TAG", "NOTABLE")
    in 9..10 -> Log.d("TAG", "SOBRESALIENTE")
}

// EJERCICIO07
val num1: Int = 65
val num2: Int = 43
val opcion: Int = 3
when (opcion) {
    1 -> sumar(num1, num2)
    2 -> restar(num1, num2)
    3 -> multiplicar(num1, num2)
    4 -> dividir(num1, num2)
    else -> Log.d("TAG", "Error, opcion invalida")
}

fun sumar(num1: Int, num2: Int) {
    val resultado = num1 + num2
    Log.d("TAG", "El resultado de la suma de $num1 y $num2 es: $resultado")
}

fun restar(num1: Int, num2: Int) {
    val resultado = num1 - num2
    Log.d("TAG", "El resultado de la resta de $num1 y $num2 es: $resultado")
}

fun multiplicar(num1: Int, num2: Int) {
    val resultado = num1 * num2
    Log.d("TAG", "El resultado de la multiplicacion de $num1 y $num2 es: $resultado")
}

fun dividir(num1: Int, num2: Int) {
    val resultado = num1 / num2
    Log.d("TAG", "El resultado de la division de $num1 y $num2 es: $resultado")
}

// EJERCICIO08
val primos = ArrayList<Int>()
var numero = 1
while (primos.size < 80) {
    var esPrimo = true
    if (numero > 1) {
        for (i in 2 until numero) {
            if (numero % i == 0) {
                esPrimo = false
            }
        }
    }
    if (esPrimo) {
        primos.add(numero)
    }
    numero++
}
for (i in 0 until primos.size) {
    Log.d("TAG", "[$i] -> \${primos[i]}")
}

// EJERCICIO09
val nombres = arrayListOf("Pepe", "Juan", "Marta", "Ana", "Pedro", "Maria")
val notas = arrayListOf(7, 8, 6, 9, 4, 5)
val opcion: Int = 2
when (opcion) {
    1 -> mostrarNotas(notas)
    2 -> mostrarMejorAlumno(nombres, notas)
    else -> Log.d("TAG", "Error, opcion invalida")
}

fun mostrarNotas(notas: ArrayList<Int>) {
    Log.d("TAG", "Notas de la clase:")
    for (i in 0 until notas.size) {
        Log.d("TAG", "Alumno $i: \${notas[i]}")
    }
}

fun mostrarMejorAlumno(nombres: ArrayList<String>, notas: ArrayList<Int>) {
    var indiceMax = 0
    var notaMax = notas[0]
    for (i in 1 until notas.size) {
        if (notas[i] > notaMax) {
            notaMax = notas[i]
            indiceMax = i
        }
    }
    Log.d("TAG", "El alumno con la media más alta es \${nombres[indiceMax]} con un $notaMax")
}
*/`
      },

      // ============================ TEMA 04 (3) ==============================
      {
        id: "t04-ej01",
        topic: "Tema 04",
        exercise: "Ejercicio01T4",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema04/Ejercicio01T4/app/src/main/java/com/example/ejercicio01t4/MainActivity.kt",
        summary: "Box a pantalla completa con imagen de fondo (spain) y texto centrado de saludo en rojo.",
        code: `package com.example.pruebatema04

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.example.pruebatema04.ui.theme.PruebaTema04Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PruebaTema04Theme {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        painter = painterResource(R.drawable.spain),
                        contentDescription = "Imagen del escudo de España",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                    Text(
                        text = stringResource(R.string.saludo),
                        color = Color.Red,
                        fontSize = 60.sp
                    )
                }
            }
        }
    }
}`
      },
      {
        id: "t04-ej02",
        topic: "Tema 04",
        exercise: "Ejercicio02T4",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema04/Ejercicio02T4/app/src/main/java/com/example/ejercicio02t4/MainActivity.kt",
        summary: "Box centrado con imagen de fondo y dos textos (bienvenida en azul 60.sp y nombre en negro 32.sp).",
        code: `package com.example.ejercicio02t4

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.example.ejercicio02t4.ui.theme.Ejercicio02T4Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Ejercicio02T4Theme {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        painter = painterResource(R.drawable.fondo),
                        contentDescription = "Imagen verde de fondo",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                    Text(
                        text = stringResource(R.string.bienvenida),
                        color = Color.Blue,
                        fontSize = 60.sp
                    )
                    Text(
                        text = stringResource(R.string.nombre),
                        color = Color.Black,
                        fontSize = 32.sp
                    )
                }
            }
        }
    }
}`
      },
      {
        id: "t04-ej04",
        topic: "Tema 04",
        exercise: "Ejercicio04T4",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema04/Ejercicio04T4/app/src/main/java/com/example/ejercicio04t4/MainActivity.kt",
        summary: "Ciclo de vida completo de una Activity con registros en Logcat (onCreate a onDestroy).",
        code: `package com.example.ejercicio04t4

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.ejercicio04t4.ui.theme.Ejercicio04T4Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Ejercicio04T4Theme {
            }
        }
        Log.d("CicloVida", "onCreate() Activity creada")
    }

    override fun onStart() {
        super.onStart()
        Log.d("CicloVida", "onStart() Activity visible")
    }

    override fun onResume() {
        super.onResume()
        Log.d("CicloVida", "onResume() Activity en primer plano")
    }

    override fun onPause() {
        super.onPause()
        Log.d("CicloVida", "onPause() Activity fuera del primer plano")
    }

    override fun onStop() {
        super.onStop()
        Log.d("CicloVida", "onStop() Activity no visible")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("CicloVida", "onDestroy() Activity destruida")
    }
}`
      },

      // ============================ TEMA 05 (14) =============================
      {
        id: "t05-ej01",
        topic: "Tema 05",
        exercise: "EJ01Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ01Tema05/app/src/main/java/com/example/ej01_tema05/MainActivity.kt",
        summary: "Primer Composable MiPrimeraPantalla() con texto cargado desde stringResource.",
        code: `package com.example.ej01_tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej01_tema05.ui.theme.EJ01Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ01Tema05Theme {
                MiPrimeraPantalla()
            }
        }
    }
}

@Composable
fun MiPrimeraPantalla() {
    Text(
        text = stringResource(R.string.texto)
    )
}`
      },
      {
        id: "t05-ej02",
        topic: "Tema 05",
        exercise: "EJ02Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ02Tema05/app/src/main/java/com/example/ej02_tema05/MainActivity.kt",
        summary: "Tipografías y esquema de color de MaterialTheme en una Column centrada.",
        code: `package com.example.ej02_tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.ej02_tema05.ui.theme.EJ02Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ02Tema05Theme {
                MisTextos()
            }
        }
    }
}

@Composable
fun MisTextos() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.titulo_mediano),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.titleMedium
        )
        Text(
            text = stringResource(R.string.encabezado_grande),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.headlineLarge
        )
        Text(
            text = stringResource(R.string.cuerpo_mediano),
            color = MaterialTheme.colorScheme.secondary,
            style = MaterialTheme.typography.bodyMedium
        )
        Text(
            text = stringResource(R.string.etiqueta_pequeña),
            color = MaterialTheme.colorScheme.secondary,
            style = MaterialTheme.typography.labelSmall
        )
    }
}`
      },
      {
        id: "t05-ej03",
        topic: "Tema 05",
        exercise: "EJ03Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ03Tema05/app/src/main/java/com/example/ej03tema05/MainActivity.kt",
        summary: "Uso de modificadores background, border, size y padding en dos Text personalizados.",
        code: `package com.example.ej03tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.ej03tema05.ui.theme.EJ03Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ03Tema05Theme {
                MisTextosPersonalizado()
            }
        }
    }
}

@Composable
fun MisTextosPersonalizado() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.texto1),
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.Green)
                .border(width = 2.dp, color = Color.Black)
                .padding(8.dp)
        )
        Text(
            text = stringResource(R.string.texto2),
            modifier = Modifier
                .size(width = 200.dp, height = 200.dp)
                .background(Color.Cyan)
                .border(width = 4.dp, color = Color.Blue)
                .padding(8.dp)
        )
    }
}`
      },
      {
        id: "t05-ej04-main",
        topic: "Tema 05",
        exercise: "EJ04Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ04Tema05/app/src/main/java/com/example/ej04tema05/MainActivity.kt",
        summary: "Pantalla dividida en dos mitades iguales usando Column y weight(1f) con Color.Green y Morado.",
        code: `package com.example.ej04tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej04tema05.ui.theme.EJ04Tema05Theme
import com.example.ej04tema05.ui.theme.Morado

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ04Tema05Theme {
                PantallPrincipal()
            }
        }
    }
}

@Composable
fun PantallPrincipal() {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Color.Green)
        )
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Morado)
        )
    }
}`
      },
      {
        id: "t05-ej04-color",
        topic: "Tema 05",
        exercise: "EJ04Tema05",
        filename: "Color.kt",
        type: "color",
        path: "Tema05/EJ04Tema05/app/src/main/java/com/example/ej04tema05/ui/theme/Color.kt",
        summary: "Paleta personalizada con color Morado.",
        swatches: [{ name: "Morado", hex: "#EE27F5" }],
        code: `package com.example.ej04tema05.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val Morado = Color(0xFFEE27F5)`
      },
      {
        id: "t05-ej05",
        topic: "Tema 05",
        exercise: "EJ05Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ05Tema05/app/src/main/java/com/example/ej05tema05/MainActivity.kt",
        summary: "Composición de 3 bloques de color (Verde, Blanco y Negro) combinando Column y Row.",
        code: `package com.example.ej05tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej05tema05.ui.theme.EJ05Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ05Tema05Theme {
                PantallTresColores()
            }
        }
    }
}

@Composable
fun PantallTresColores() {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Row(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    .background(Color.Green)
            )
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    .background(Color.White)
            )
        }
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Color.Black)
        )
    }
}`
      },
      {
        id: "t05-ej06-main",
        topic: "Tema 05",
        exercise: "EJ06Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ06Tema05/app/src/main/java/com/example/ej06tema05/MainActivity.kt",
        summary: "Cuadrícula 2x2 alternando ColorRojo y ColorAmarillo con textos centrados.",
        code: `package com.example.ej06tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej06tema05.ui.theme.ColorAmarillo
import com.example.ej06tema05.ui.theme.ColorRojo
import com.example.ej06tema05.ui.theme.EJ06Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ06Tema05Theme {
                PantallaCuatroColores()
            }
        }
    }
}

@Composable
fun PantallaCuatroColores() {
    // Contiene lo que me pide: Column, Row, Box, MaterialTheme
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Row(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    // El color creado en Color.kt
                    .background(ColorRojo),
                // Que el texto esté en el centro
                contentAlignment = Alignment.Center
            ) {
                Text(
                    // De dónde se coge el texto y el tipo de texto que se pone
                    text = stringResource(R.string.textoUno),
                    style = MaterialTheme.typography.titleMedium
                )
            }
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    // El color creado en Color.kt
                    .background(ColorAmarillo),
                // Que el texto esté en el centro
                contentAlignment = Alignment.Center
            ) {
                Text(
                    // Texto y el tipo
                    text = stringResource(R.string.textoDos),
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
        Row(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    // El color creado en Color.kt
                    .background(ColorAmarillo),
                // Que el texto esté en el centro
                contentAlignment = Alignment.Center
            ) {
                Text(
                    // Texto y el tipo
                    text = stringResource(R.string.textoTres),
                    style = MaterialTheme.typography.titleMedium
                )
            }
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize()
                    // El color creado en Color.kt
                    .background(ColorRojo),
                // Que el texto esté en el centro
                contentAlignment = Alignment.Center
            ) {
                Text(
                    // Texto y el tipo
                    text = stringResource(R.string.textoCuatro),
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
    }
}`
      },
      {
        id: "t05-ej06-color",
        topic: "Tema 05",
        exercise: "EJ06Tema05",
        filename: "Color.kt",
        type: "color",
        path: "Tema05/EJ06Tema05/app/src/main/java/com/example/ej06tema05/ui/theme/Color.kt",
        summary: "Paleta personalizada con ColorRojo y ColorAmarillo.",
        swatches: [
          { name: "ColorRojo", hex: "#FF0000" },
          { name: "ColorAmarillo", hex: "#FFDE21" }
        ],
        code: `package com.example.ej06tema05.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val ColorRojo = Color(0xFFFF0000)
val ColorAmarillo = Color(0xFFFFDE21)`
      },
      {
        id: "t05-ej07",
        topic: "Tema 05",
        exercise: "EJ07Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ07Tema05/app/src/main/java/com/example/ej07tema05/MainActivity.kt",
        summary: "PantallaLogin() con banner superior (weight 2f) y formulario inferior (weight 8f) con botón.",
        code: `package com.example.ej07tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.ej07tema05.ui.theme.EJ07Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ07Tema05Theme {
                PantallaLogin()
            }
        }
    }
}

@Composable
fun PantallaLogin() {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Box(
            modifier = Modifier
                .weight(2f)
                .fillMaxSize()
                .background(Color.Yellow),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = stringResource(R.string.publiciad),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary
            )
        }
        Box(
            modifier = Modifier
                .weight(8f)
                .fillMaxSize()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = stringResource(R.string.email),
                    style = MaterialTheme.typography.headlineLarge,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = stringResource(R.string.contraseña),
                    style = MaterialTheme.typography.headlineLarge,
                    color = MaterialTheme.colorScheme.primary
                )
                Button(
                    onClick = { /* Acción al pulsar */ },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = stringResource(R.string.button_text),
                        style = MaterialTheme.typography.displaySmall
                    )
                }
            }
        }
    }
}`
      },
      {
        id: "t05-ej08-main",
        topic: "Tema 05",
        exercise: "EJ08Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ08Tema05/app/src/main/java/com/example/ej08tema05/MainActivity.kt",
        summary: "4 franjas de color con alineaciones distintas y Composables reutilizables BotonNormal y BotonOvalado.",
        code: `package com.example.ej08tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.ej08tema05.ui.theme.Amarillo
import com.example.ej08tema05.ui.theme.AzulBoton
import com.example.ej08tema05.ui.theme.Cian
import com.example.ej08tema05.ui.theme.EJ08Tema05Theme
import com.example.ej08tema05.ui.theme.Magenta
import com.example.ej08tema05.ui.theme.Verde

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ08Tema05Theme {
                PantallaBotones()
            }
        }
    }
}

@Composable
fun PantallaBotones() {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Amarillo),
            contentAlignment = Alignment.BottomCenter
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
            }
        }
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Verde),
            contentAlignment = Alignment.Center
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                BotonOvalado(stringResource(R.string.button))
                BotonOvalado(stringResource(R.string.button))
                BotonOvalado(stringResource(R.string.button))
            }
        }
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Cian),
            contentAlignment = Alignment.Center
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
            }
        }
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .background(Magenta),
            contentAlignment = Alignment.TopCenter
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
                BotonNormal(stringResource(R.string.button))
            }
        }
    }
}

@Composable
fun BotonNormal(texto: String) {
    Button(
        onClick = { },
        modifier = Modifier.width(115.dp),
        colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
    ) {
        Text(
            text = texto,
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.onPrimary
        )
    }
}

@Composable
fun BotonOvalado(texto: String) {
    Button(
        onClick = { },
        shape = RoundedCornerShape(85),
        modifier = Modifier
            .width(110.dp)
            .height(218.dp),
        colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
    ) {
        Text(
            text = texto,
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.onPrimary
        )
    }
}`
      },
      {
        id: "t05-ej08-color",
        topic: "Tema 05",
        exercise: "EJ08Tema05",
        filename: "Color.kt",
        type: "color",
        path: "Tema05/EJ08Tema05/app/src/main/java/com/example/ej08tema05/ui/theme/Color.kt",
        summary: "Paleta de 5 colores añadidos: Amarillo, Verde, Cian, Magenta y AzulBoton.",
        swatches: [
          { name: "Amarillo", hex: "#FFEB3B" },
          { name: "Verde", hex: "#4CAF50" },
          { name: "Cian", hex: "#00BCD4" },
          { name: "Magenta", hex: "#E91E63" },
          { name: "AzulBoton", hex: "#5C6BC0" }
        ],
        code: `package com.example.ej08tema05.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val Amarillo = Color(0xFFFFEB3B)
val Verde = Color(0xFF4CAF50)
val Cian = Color(0xFF00BCD4)
val Magenta = Color(0xFFE91E63)
val AzulBoton = Color(0xFF5C6BC0)`
      },
      {
        id: "t05-ej09",
        topic: "Tema 05",
        exercise: "EJ09Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ09Tema05/app/src/main/java/com/example/ej09tema05/MainActivity.kt",
        summary: "PantallaInvitacion() con cabecera de imagen (30%) y datos del evento distribuidos (70%).",
        code: `package com.example.ej09tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.ej09tema05.ui.theme.EJ09Tema05Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ09Tema05Theme {
                PantallaInvitacion()
            }
        }
    }
}

@Composable
fun PantallaInvitacion() {
    // Contiene lo que me pide: Column, Box, Text, Image, MaterialTheme
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Box(
            modifier = Modifier
                // Coge el 30% de la pantalla
                .weight(3f)
                .fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Image(
                // Dónde se guarda la imagen y con el texto que representa la imagen
                painter = painterResource(R.drawable.invi),
                contentDescription = stringResource(R.string.image_description),
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
            Text(
                // Texto que se llama del strings.xml, con el tipo de letra, color y padding
                text = stringResource(R.string.titulo_invitacion),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(top = 32.dp)
            )
        }
        Column(
            modifier = Modifier
                // Coge el 70% restante de la pantalla
                .weight(7f)
                // Coge el máximo ancho de la columna
                .fillMaxWidth()
                // Muestra el color del fondo
                .background(MaterialTheme.colorScheme.background)
                // Padding de la columna
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Todos los textos de strings.xml, con los estilos y color primario
            Text(
                text = stringResource(id = R.string.evento),
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = stringResource(id = R.string.fecha),
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = stringResource(id = R.string.hora),
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = stringResource(id = R.string.direccion),
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = stringResource(id = R.string.telefono),
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}`
      },
      {
        id: "t05-ej10-main",
        topic: "Tema 05",
        exercise: "EJ10Tema05",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema05/EJ10Tema05/app/src/main/java/com/example/ej10tema05/MainActivity.kt",
        summary: "Interfaz de control con botones Izquierda/Derecha ovalados, imagen de Android central y botones Arriba/Abajo.",
        code: `package com.example.ej10tema05

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.ej10tema05.ui.theme.AzulBoton
import com.example.ej10tema05.ui.theme.EJ10Tema05Theme
import com.example.ej10tema05.ui.theme.VerdeFondo

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ10Tema05Theme {
                PantallaPrincipal()
            }
        }
    }
}

@Composable
fun PantallaPrincipal() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VerdeFondo)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(6.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = { /* Acción */ },
                shape = RoundedCornerShape(50),
                modifier = Modifier
                    .width(135.dp)
                    .height(200.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
            ) {
                Text(
                    text = stringResource(id = R.string.izquierda),
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
            Button(
                onClick = { /* Acción */ },
                shape = RoundedCornerShape(50),
                modifier = Modifier
                    .width(135.dp)
                    .height(200.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
            ) {
                Text(
                    text = stringResource(id = R.string.derecha),
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }

        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) {
            Image(
                painter = painterResource(id = R.drawable.android),
                contentDescription = stringResource(id = R.string.android_desc),
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        }

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(15.dp)
        ) {
            Button(
                onClick = { /* Acción */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(45.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
            ) {
                Text(
                    text = stringResource(id = R.string.arriba),
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
            Button(
                onClick = { /* Acción */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(45.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AzulBoton)
            ) {
                Text(
                    text = stringResource(id = R.string.abajo),
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }
    }
}`
      },
      {
        id: "t05-ej10-color",
        topic: "Tema 05",
        exercise: "EJ10Tema05",
        filename: "Color.kt",
        type: "color",
        path: "Tema05/EJ10Tema05/app/src/main/java/com/example/ej10tema05/ui/theme/Color.kt",
        summary: "Paleta personalizada con VerdeFondo y AzulBoton.",
        swatches: [
          { name: "VerdeFondo", hex: "#8BC34A" },
          { name: "AzulBoton", hex: "#5C6BC0" }
        ],
        code: `package com.example.ej10tema05.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val VerdeFondo = Color(0xFF8BC34A)
val AzulBoton = Color(0xFF5C6BC0)`
      },

      // ============================ TEMA 06 (15) =============================
      {
        id: "t06-ej01",
        topic: "Tema 06",
        exercise: "EJ01Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ01Tema06/app/src/main/java/com/example/ej01tema06/MainActivity.kt",
        summary: "FichaTecnica() de smartphone con HorizontalDivider e iconos Material (Batería, Pantalla, Wifi).",
        code: `package com.example.ej01tema06

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BatteryChargingFull
import androidx.compose.material.icons.filled.PhoneAndroid
import androidx.compose.material.icons.filled.Wifi
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej01tema06.ui.theme.EJ01Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ01Tema06Theme {
                FichaTecnica()
            }
        }
    }
}

@Composable
fun FichaTecnica() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Image(
            painter = painterResource(R.drawable.iphone),
            contentDescription = stringResource(R.string.imagen_movil),
            modifier = Modifier
                .fillMaxWidth()
                .height(350.dp),
            contentScale = ContentScale.Fit
        )
        Spacer(Modifier.height(16.dp))
        Text(
            text = stringResource(R.string.modelo_movil),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold
        )
        Spacer(Modifier.height(3.dp))
        HorizontalDivider(
            modifier = Modifier.padding(vertical = 15.dp),
            thickness = 1.dp,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(Modifier.height(16.dp))
        Text(
            text = stringResource(R.string.caracteristicas),
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            color = MaterialTheme.colorScheme.primary
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.BatteryChargingFull,
                contentDescription = stringResource(R.string.descrip_bateria),
                modifier = Modifier.size(24.dp),
                tint = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = stringResource(R.string.bateria),
                style = MaterialTheme.typography.bodyLarge
            )
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.PhoneAndroid,
                contentDescription = stringResource(R.string.descrip_pantalla),
                modifier = Modifier.size(24.dp),
                tint = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = stringResource(R.string.pantalla),
                style = MaterialTheme.typography.bodyLarge
            )
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Wifi,
                contentDescription = stringResource(R.string.descrip_conec),
                modifier = Modifier.size(24.dp),
                tint = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = stringResource(R.string.conectividad),
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}`
      },
      {
        id: "t06-ej02",
        topic: "Tema 06",
        exercise: "EJ02Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ02Tema06/app/src/main/java/com/example/ej02tema06/MainActivity.kt",
        summary: "Card de videojuego (Zelda) con borde, elevación, imagen recortada y botón con Toast.",
        code: `package com.example.ej02tema06

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej02tema06.ui.theme.EJ02Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ02Tema06Theme {
                PantallaVideojuego()
            }
        }
    }
}

@Composable
fun PantallaVideojuego() {
    val context = LocalContext.current
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    width = 2.dp,
                    color = MaterialTheme.colorScheme.primary,
                    shape = RoundedCornerShape(12.dp)
                ),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.zelda),
                    contentDescription = stringResource(id = R.string.img_juego_desc),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(5.dp)),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = stringResource(id = R.string.juego_titulo),
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = stringResource(id = R.string.juego_categoria),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(top = 4.dp)
                )
                Text(
                    text = stringResource(id = R.string.juego_desc),
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp, bottom = 16.dp)
                )
                Button(
                    onClick = {
                        Toast.makeText(context, R.string.toast_info, Toast.LENGTH_SHORT).show()
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = stringResource(R.string.icono_info)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = stringResource(id = R.string.boton_mas_info))
                }
            }
        }
    }
}`
      },
      {
        id: "t06-ej03",
        topic: "Tema 06",
        exercise: "EJ03Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ03Tema06/app/src/main/java/com/example/ej03tema06/MainActivity.kt",
        summary: "Contador de visitas persistente con rememberSaveable y botones Incrementar, Decrementar y Reiniciar.",
        code: `package com.example.ej03tema06

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.ej03tema06.ui.theme.EJ03Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ03Tema06Theme {
                PantallaContador()
            }
        }
    }
}

@Composable
fun PantallaContador() {
    var contadorVisitas by rememberSaveable { mutableIntStateOf(0) }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.contador),
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "\${stringResource(R.string.visitas)} $contadorVisitas",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(16.dp))
        HorizontalDivider(
            modifier = Modifier.padding(20.dp),
            thickness = 2.dp,
            color = MaterialTheme.colorScheme.primary
        )
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Button(onClick = {
                contadorVisitas = incrementar(contadorVisitas)
            }) {
                Text(text = stringResource(R.string.incrementar))
            }
            Button(onClick = {
                contadorVisitas = decrementar(contadorVisitas)
            }) {
                Text(text = stringResource(R.string.decrementar))
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = {
            contadorVisitas = reiniciar()
        }) {
            Text(text = stringResource(R.string.reiniciar))
        }
    }
}

private fun incrementar(valorActual: Int): Int {
    return valorActual + 1
}

private fun decrementar(valorActual: Int): Int {
    return if (valorActual > 0) {
        valorActual - 1
    } else {
        0
    }
}

private fun reiniciar(): Int {
    return 0
}`
      },
      {
        id: "t06-ej04-main",
        topic: "Tema 06",
        exercise: "EJ04Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ04Tema06/app/src/main/java/com/example/ej04tema06/MainActivity.kt",
        summary: "PlanificarViaje() con RadioButtons e iconos para elegir entre coche, tren y avión.",
        code: `package com.example.ej04tema06

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Flight
import androidx.compose.material.icons.filled.Train
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej04tema06.ui.theme.EJ04Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ04Tema06Theme {
                PlanificarViaje()
            }
        }
    }
}

@Composable
fun PlanificarViaje() {
    var transporteSeleccionado by rememberSaveable { mutableStateOf("") }
    val transporte = listOf(
        Transporte(stringResource(R.string.coche), Icons.Default.DirectionsCar),
        Transporte(stringResource(R.string.tren), Icons.Default.Train),
        Transporte(stringResource(R.string.avion), Icons.Default.Flight)
    )
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.titulo_viaje),
            style = MaterialTheme.typography.headlineMedium,
            color = Color.Red,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.padding(16.dp))
        Text(
            text = stringResource(R.string.medio_transporte),
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary
        )
        transporte.forEach { opcion ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = opcion.icono,
                    contentDescription = stringResource(R.string.iconos_coche_tren_avion),
                    tint = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = opcion.texto,
                    modifier = Modifier.weight(3f),
                    style = MaterialTheme.typography.bodyLarge
                )
                RadioButton(
                    selected = transporteSeleccionado == opcion.texto,
                    onClick = { transporteSeleccionado = opcion.texto },
                    colors = RadioButtonDefaults.colors(
                        selectedColor = Color.Gray,
                        unselectedColor = Color.Gray
                    )
                )
            }
        }
        Text(
            text = "\${stringResource(R.string.transporte_seleccionado)} $transporteSeleccionado",
            modifier = Modifier.padding(vertical = 12.dp),
            style = MaterialTheme.typography.titleLarge,
            color = Color.Red,
            fontWeight = FontWeight.Bold
        )
    }
}`
      },
      {
        id: "t06-ej04-class",
        topic: "Tema 06",
        exercise: "EJ04Tema06",
        filename: "Transporte.kt",
        type: "class",
        path: "Tema06/EJ04Tema06/app/src/main/java/com/example/ej04tema06/Transporte.kt",
        summary: "Modelo de datos Transporte con texto e icono ImageVector.",
        code: `package com.example.ej04tema06

import androidx.compose.ui.graphics.vector.ImageVector

data class Transporte(
    val texto: String,
    val icono: ImageVector
)`
      },
      {
        id: "t06-ej05",
        topic: "Tema 06",
        exercise: "EJ05Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ05Tema06/app/src/main/java/com/example/ej05tema06/MainActivity.kt",
        summary: "Calculadora con OutlinedTextField, Checkboxes (sumar/restar), validación y Toast.",
        code: `package com.example.ej05tema06

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej05tema06.ui.theme.EJ05Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ05Tema06Theme {
                PantallaCalculadora()
            }
        }
    }
}

@Composable
fun PantallaCalculadora() {
    var num1 by remember { mutableStateOf("") }
    var num2 by remember { mutableStateOf("") }
    var sumar by remember { mutableStateOf(false) }
    var restar by remember { mutableStateOf(false) }
    var resultado by remember { mutableStateOf("") }
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.calculadora),
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(24.dp))
        OutlinedTextField(
            value = num1,
            onValueChange = { num1 = it },
            label = { Text(text = stringResource(R.string.primer_numero)) },
            modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = num2,
            onValueChange = { num2 = it },
            label = { Text(text = stringResource(R.string.segundo_numero)) },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = sumar,
                onCheckedChange = { sumar = it }
            )
            Text(text = stringResource(R.string.sumar))
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = restar,
                onCheckedChange = { restar = it }
            )
            Text(text = stringResource(R.string.restar))
        }
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = {
                val res = calcularOperaciones(num1, num2, sumar, restar, context)
                if (res.startsWith("Error")) {
                    Toast.makeText(context, res, Toast.LENGTH_SHORT).show()
                    resultado = ""
                } else {
                    resultado = res
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = stringResource(R.string.calcular))
        }
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = resultado,
            color = Color.Red,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.titleLarge
        )
    }
}

private fun calcularOperaciones(
    n1: String,
    n2: String,
    sumar: Boolean,
    restar: Boolean,
    context: Context
): String {
    val numero1 = n1.toIntOrNull()
    val numero2 = n2.toIntOrNull()
    if (numero1 == null || numero2 == null) {
        return context.getString(R.string.error)
    }
    if (!sumar && !restar) {
        return context.getString(R.string.error_seleccionar)
    }
    var textoResultado = ""
    if (sumar) {
        textoResultado += "\${context.getString(R.string.suma)} \${numero1 + numero2}\\n"
    }
    if (restar) {
        textoResultado += "\${context.getString(R.string.resta)} \${numero1 - numero2}"
    }
    return textoResultado
}`
      },
      {
        id: "t06-ej06-main",
        topic: "Tema 06",
        exercise: "EJ06Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ06Tema06/app/src/main/java/com/example/ej06tema06/MainActivity.kt",
        summary: "Personalización de Mr. Potato con Switches (gafas y sombrero) y cambio dinámico de imagen.",
        code: `package com.example.ej06tema06

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej06tema06.ui.theme.Dorado
import com.example.ej06tema06.ui.theme.EJ06Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ06Tema06Theme {
                PantallaMrPotato()
            }
        }
    }
}

@Composable
fun PantallaMrPotato() {
    var tieneGafas by remember { mutableStateOf(false) }
    var tieneSombrero by remember { mutableStateOf(false) }
    val idImagen = obtenerImagenPotato(tieneGafas, tieneSombrero)

    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(R.drawable.fondo),
            contentDescription = stringResource(R.string.imagen_fondo),
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Column(
            modifier = Modifier.fillMaxSize()
        ) {
            Column(
                modifier = Modifier
                    .weight(0.65f)
                    .fillMaxWidth()
                    .padding(top = 100.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = stringResource(R.string.personalizacion),
                    style = MaterialTheme.typography.titleLarge,
                    color = Dorado,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 65.dp)
                )
                Image(
                    painter = painterResource(idImagen),
                    contentDescription = stringResource(R.string.imagen_potato),
                    modifier = Modifier.fillMaxWidth(0.8f),
                    contentScale = ContentScale.Fit
                )
            }
            Column(
                modifier = Modifier
                    .weight(0.35f)
                    .fillMaxWidth()
                    .padding(horizontal = 32.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = stringResource(R.string.gafas),
                        style = MaterialTheme.typography.bodyLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Switch(
                        checked = tieneGafas,
                        onCheckedChange = { tieneGafas = it }
                    )
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = stringResource(R.string.sombrero),
                        style = MaterialTheme.typography.bodyLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Switch(
                        checked = tieneSombrero,
                        onCheckedChange = { tieneSombrero = it }
                    )
                }
            }
        }
    }
}

private fun obtenerImagenPotato(gafas: Boolean, sombrero: Boolean): Int {
    return when {
        gafas && sombrero -> R.drawable.potatogs
        gafas -> R.drawable.potatog
        sombrero -> R.drawable.potatos
        else -> R.drawable.potato
    }
}`
      },
      {
        id: "t06-ej06-color",
        topic: "Tema 06",
        exercise: "EJ06Tema06",
        filename: "Color.kt",
        type: "color",
        path: "Tema06/EJ06Tema06/app/src/main/java/com/example/ej06tema06/ui/theme/Color.kt",
        summary: "Paleta personalizada con color Dorado.",
        swatches: [{ name: "Dorado", hex: "#D4AF37" }],
        code: `package com.example.ej06tema06.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val Dorado = Color(0xFFD4AF37)`
      },
      {
        id: "t06-ej07-main",
        topic: "Tema 06",
        exercise: "EJ07Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ07Tema06/app/src/main/java/com/example/ej07tema06/MainActivity.kt",
        summary: "Ficha de contacto Walter White con IconButtons de llamar/colgar y estado de llamada.",
        code: `package com.example.ej07tema06

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.CallEnd
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej07tema06.ui.theme.EJ07Tema06Theme
import com.example.ej07tema06.ui.theme.Verde

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ07Tema06Theme {
                PantallaWalterWhite()
            }
        }
    }
}

@Composable
fun PantallaWalterWhite() {
    var estadoLlamada by remember { mutableStateOf("") }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(15.dp)
            .padding(top = 25.dp),
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(32.dp))
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            border = BorderStroke(1.dp, Color.Black)
        ) {
            Column(
                modifier = Modifier.padding(12.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Image(
                    painter = painterResource(R.drawable.walter),
                    contentDescription = stringResource(R.string.imagen_walter),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(550.dp)
                        .clip(RoundedCornerShape(12.dp)),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = stringResource(R.string.nombre_walter),
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = Color.Gray
                )
                Text(
                    text = stringResource(R.string.telefono_walter),
                    style = MaterialTheme.typography.bodyLarge,
                    color = Color.Gray
                )
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
        Spacer(modifier = Modifier.height(24.dp))
        Row(
            horizontalArrangement = Arrangement.spacedBy(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { estadoLlamada = "llamando" }) {
                Icon(
                    imageVector = Icons.Default.Call,
                    contentDescription = stringResource(R.string.icono_llamar),
                    tint = Verde,
                    modifier = Modifier.size(50.dp)
                )
            }
            IconButton(onClick = { estadoLlamada = "finalizada" }) {
                Icon(
                    imageVector = Icons.Default.CallEnd,
                    contentDescription = stringResource(R.string.icono_colgar),
                    tint = Color.Red,
                    modifier = Modifier.size(50.dp)
                )
            }
        }
        Spacer(modifier = Modifier.weight(1f))
        if (estadoLlamada == "llamando") {
            Text(
                text = stringResource(R.string.llamando),
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color.Black,
                modifier = Modifier.padding(bottom = 40.dp)
            )
        } else if (estadoLlamada == "finalizada") {
            Text(
                text = stringResource(R.string.llamada_finalizada),
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color.Black,
                modifier = Modifier.padding(bottom = 40.dp)
            )
        }
    }
}`
      },
      {
        id: "t06-ej07-color",
        topic: "Tema 06",
        exercise: "EJ07Tema06",
        filename: "Color.kt",
        type: "color",
        path: "Tema06/EJ07Tema06/app/src/main/java/com/example/ej07tema06/ui/theme/Color.kt",
        summary: "Paleta personalizada con color Verde para el icono de llamada.",
        swatches: [{ name: "Verde", hex: "#4CAF50" }],
        code: `package com.example.ej07tema06.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val Verde = Color(0xFF4CAF50)`
      },
      {
        id: "t06-ej08-main",
        topic: "Tema 06",
        exercise: "EJ08Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ08Tema06/app/src/main/java/com/example/ej08tema06/MainActivity.kt",
        summary: "Selector de jugador Commandos con TextField, RadioButtons, imagen y validación por Toast.",
        code: `package com.example.ej08tema06

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej08tema06.ui.theme.Azul_Clarito
import com.example.ej08tema06.ui.theme.EJ08Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ08Tema06Theme {
                PantallaCommandos()
            }
        }
    }
}

@Composable
fun PantallaCommandos() {
    // Estados para el nombre y el personaje seleccionado
    var nombre by remember { mutableStateOf("") }
    var personajeSeleccionado by remember { mutableStateOf("") }
    // Contexto para que se pueda mostrar el Toast
    val context = LocalContext.current

    // Lista de personajes
    val personajes = listOf(
        stringResource(R.string.francotirador),
        stringResource(R.string.marine),
        stringResource(R.string.espia),
        stringResource(R.string.boina_verde)
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Azul_Clarito)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Título
        Text(
            text = stringResource(R.string.nombre_jugador),
            style = MaterialTheme.typography.headlineMedium,
            color = Color.Black,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        // Campo para escribir el nombre
        TextField(
            value = nombre,
            onValueChange = { nombre = it },
            label = { Text(text = stringResource(R.string.introduce_nombre)) },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        // Lista con los RadioButton generada con el forEach
        personajes.forEach { personaje ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                RadioButton(
                    selected = personajeSeleccionado == personaje,
                    onClick = { personajeSeleccionado = personaje }
                )
                Text(
                    text = personaje,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
            }
        }
        Spacer(modifier = Modifier.height(24.dp))
        // Imagen de Commandos
        Image(
            painter = painterResource(R.drawable.commandos),
            contentDescription = stringResource(R.string.imagen_commandos),
            modifier = Modifier
                .height(230.dp)
                .fillMaxWidth(0.6f)
                .clip(RoundedCornerShape(12.dp)),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(24.dp))
        // Botón guardar
        Button(
            onClick = {
                val mensaje = guardarJugador(
                    nombre = nombre,
                    personaje = personajeSeleccionado,
                    context = context
                )
                Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
            },
            modifier = Modifier
                .width(200.dp)
                .height(50.dp),
            shape = RoundedCornerShape(25.dp)
        ) {
            Text(
                text = stringResource(R.string.guardar),
                style = MaterialTheme.typography.headlineSmall
            )
        }
    }
}

// Función que valida y devuelve el mensaje para el Toast
private fun guardarJugador(nombre: String, personaje: String, context: Context): String {
    if (nombre.isEmpty()) {
        return context.getString(R.string.error_nombre)
    }
    if (personaje.isEmpty()) {
        return context.getString(R.string.error_personaje)
    }
    val textoElige = context.getString(R.string.mostrar)
    return "$nombre $textoElige $personaje"
}`
      },
      {
        id: "t06-ej08-color",
        topic: "Tema 06",
        exercise: "EJ08Tema06",
        filename: "Color.kt",
        type: "color",
        path: "Tema06/EJ08Tema06/app/src/main/java/com/example/ej08tema06/ui/theme/Color.kt",
        summary: "Paleta personalizada con color de fondo Azul_Clarito.",
        swatches: [{ name: "Azul_Clarito", hex: "#DCE6F2" }],
        code: `package com.example.ej08tema06.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

// Color que me creo para el fondo
val Azul_Clarito = Color(0xFFDCE6F2)`
      },
      {
        id: "t06-ej09",
        topic: "Tema 06",
        exercise: "EJ09Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ09Tema06/app/src/main/java/com/example/ej09tema06/MainActivity.kt",
        summary: "JuegoAdivinar() del 1 al 10 con pistas, contador de intentos y botón de reinicio.",
        code: `package com.example.ej09tema06

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej09tema06.ui.theme.EJ09Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ09Tema06Theme {
                JuegoAdivinar()
            }
        }
    }
}

@Composable
fun JuegoAdivinar() {
    var numeroSecreto by remember { mutableIntStateOf((1..10).random()) }
    var numeroUsuario by remember { mutableStateOf("") }
    var intentos by remember { mutableIntStateOf(0) }
    var mensajeGanador by remember { mutableStateOf("") }
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = stringResource(R.string.titulo_juego),
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 24.dp)
        )
        OutlinedTextField(
            value = numeroUsuario,
            onValueChange = { numeroUsuario = it },
            label = { Text(text = stringResource(R.string.introduce_numero)) },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "\${stringResource(R.string.intentos)} $intentos",
            style = MaterialTheme.typography.bodyLarge
        )
        Spacer(modifier = Modifier.height(40.dp))
        val textoEnhorabuena = stringResource(R.string.enhorabuena)
        Button(
            onClick = {
                val resultado = comprobarAcierto(numeroUsuario, numeroSecreto, context)
                if (resultado == "¡Has acertado!") {
                    mensajeGanador = "$textoEnhorabuena \${intentos + 1} intentos"
                    intentos++
                } else {
                    Toast.makeText(context, resultado, Toast.LENGTH_SHORT).show()
                    if (!resultado.startsWith("Error")) {
                        intentos++
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = stringResource(R.string.probar_suerte))
        }
        Spacer(modifier = Modifier.height(10.dp))
        Button(
            onClick = {
                numeroSecreto = (1..10).random()
                numeroUsuario = ""
                intentos = 0
                mensajeGanador = ""
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = stringResource(R.string.reiniciar))
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = mensajeGanador,
            style = MaterialTheme.typography.titleMedium,
            color = Color.Red,
            fontWeight = FontWeight.Bold
        )
    }
}

private fun comprobarAcierto(numeroTexto: String, numeroSecreto: Int, context: Context): String {
    val numero = numeroTexto.toIntOrNull()
    if (numero == null || numero !in 1..10) {
        return context.getString(R.string.error_numero)
    }
    return when {
        numero == numeroSecreto -> "¡Has acertado!"
        numero < numeroSecreto -> context.getString(R.string.pista_mayor)
        else -> context.getString(R.string.pista_menor)
    }
}`
      },
      {
        id: "t06-ej10-main",
        topic: "Tema 06",
        exercise: "EJ10Tema06",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema06/EJ10Tema06/app/src/main/java/com/example/ej10tema06/MainActivity.kt",
        summary: "VisitaRoma() con 4 monumentos (MonumentoItem reutilizable) con Checkbox en Dorado y Toast.",
        code: `package com.example.ej10tema06

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej10tema06.ui.theme.Dorado
import com.example.ej10tema06.ui.theme.EJ10Tema06Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ10Tema06Theme {
                VisitaRoma()
            }
        }
    }
}

@Composable
fun VisitaRoma() {
    // Estados individuales para cada Checkbox
    var coliseo by remember { mutableStateOf(false) }
    var fontana by remember { mutableStateOf(false) }
    var panteon by remember { mutableStateOf(false) }
    var basilica by remember { mutableStateOf(false) }
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = stringResource(R.string.titulo_visita),
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = Dorado,
            modifier = Modifier.padding(bottom = 32.dp)
        )
        // Fila 1
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            MonumentoItem(
                nombre = stringResource(R.string.coliseo),
                idImagen = R.drawable.coliseo,
                descripcion = stringResource(R.string.imagen_coliseo),
                marcado = coliseo,
                onCheckedChange = { coliseo = it }
            )
            MonumentoItem(
                nombre = stringResource(R.string.fontana),
                idImagen = R.drawable.fontana,
                descripcion = stringResource(R.string.imagen_fontana),
                marcado = fontana,
                onCheckedChange = { fontana = it }
            )
        }
        Spacer(modifier = Modifier.height(16.dp))
        // Fila 2
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            MonumentoItem(
                nombre = stringResource(R.string.panteon),
                idImagen = R.drawable.panteon,
                descripcion = stringResource(R.string.imagen_panteon),
                marcado = panteon,
                onCheckedChange = { panteon = it }
            )
            MonumentoItem(
                nombre = stringResource(R.string.basilica),
                idImagen = R.drawable.basilica,
                descripcion = stringResource(R.string.imagen_basilica),
                marcado = basilica,
                onCheckedChange = { basilica = it }
            )
        }
        Spacer(modifier = Modifier.height(32.dp))
        Button(
            onClick = {
                val mensaje = generarMensajeVisita(coliseo, fontana, panteon, basilica, context)
                Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
            },
            modifier = Modifier.width(150.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Dorado,
                contentColor = Color.White
            )
        ) {
            Text(
                text = stringResource(R.string.guardar_visita),
                fontWeight = FontWeight.Bold
            )
        }
        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
fun MonumentoItem(
    nombre: String,
    idImagen: Int,
    descripcion: String,
    marcado: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(id = idImagen),
            contentDescription = descripcion,
            modifier = Modifier
                .width(180.dp)
                .height(130.dp)
                .clip(RoundedCornerShape(12.dp)),
            contentScale = ContentScale.Crop
        )
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(top = 4.dp)
        ) {
            Checkbox(
                checked = marcado,
                onCheckedChange = onCheckedChange,
                colors = CheckboxDefaults.colors(
                    checkedColor = Dorado,
                    uncheckedColor = Dorado
                )
            )
            Text(
                text = nombre,
                style = MaterialTheme.typography.bodyMedium,
                color = Color.Black
            )
        }
    }
}

private fun generarMensajeVisita(
    coliseo: Boolean,
    fontana: Boolean,
    panteon: Boolean,
    basilica: Boolean,
    context: Context
): String {
    var textoMonumentos = ""
    if (coliseo) {
        textoMonumentos += context.getString(R.string.coliseo)
    }
    if (fontana) {
        if (textoMonumentos != "") textoMonumentos += ", "
        textoMonumentos += context.getString(R.string.fontana)
    }
    if (panteon) {
        if (textoMonumentos != "") textoMonumentos += ", "
        textoMonumentos += context.getString(R.string.panteon)
    }
    if (basilica) {
        if (textoMonumentos != "") textoMonumentos += ", "
        textoMonumentos += context.getString(R.string.basilica)
    }
    if (textoMonumentos == "") {
        return context.getString(R.string.no_seleccionado)
    }
    return "\${context.getString(R.string.monumentos_seleccionados)} $textoMonumentos"
}`
      },
      {
        id: "t06-ej10-color",
        topic: "Tema 06",
        exercise: "EJ10Tema06",
        filename: "Color.kt",
        type: "color",
        path: "Tema06/EJ10Tema06/app/src/main/java/com/example/ej10tema06/ui/theme/Color.kt",
        summary: "Paleta personalizada con color Dorado para monumentos de Roma.",
        swatches: [{ name: "Dorado", hex: "#D4AF37" }],
        code: `package com.example.ej10tema06.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

// Color que me creo para utilizarlo
val Dorado = Color(0xFFD4AF37)`
      },

      // ============================ TEMA 07 (12) =============================
      {
        id: "t07-ej01",
        topic: "Tema 07",
        exercise: "EJ01Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ01Tema07/app/src/main/java/com/example/ej01tema07/MainActivity.kt",
        summary: "LazyColumn mostrando una lista de 9 series desde recursos de texto.",
        code: `package com.example.ej01tema07

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ej01tema07.ui.theme.EJ01Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ01Tema07Theme {
                PantallaEJ01()
            }
        }
    }
}

@Composable
fun PantallaEJ01() {
    val listaSeries = listOf(
        R.string.lista_uno,
        R.string.lista_dos,
        R.string.lista_tres,
        R.string.lista_cuatro,
        R.string.lista_cinco,
        R.string.lista_seis,
        R.string.lista_siete,
        R.string.lista_ocho,
        R.string.lista_nueve
    )
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 60.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.titulo),
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 40.dp)
        )
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp)
        ) {
            items(listaSeries) { series ->
                Text(
                    text = stringResource(series),
                    fontSize = 18.sp,
                    color = MaterialTheme.colorScheme.secondary,
                    modifier = Modifier.padding(vertical = 6.dp)
                )
            }
        }
    }
}`
      },
      {
        id: "t07-ej02",
        topic: "Tema 07",
        exercise: "EJ02Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ02Tema07/app/src/main/java/com/example/ej02tema07/MainActivity.kt",
        summary: "Menú desplegable DropdownMenu con 6 opciones en color Magenta y estado seleccionado.",
        code: `package com.example.ej02tema07

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej02tema07.ui.theme.EJ02Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ02Tema07Theme {
                PantallaEJ02()
            }
        }
    }
}

@Composable
fun PantallaEJ02() {
    val opciones = listOf(
        R.string.opcion_uno,
        R.string.opcion_dos,
        R.string.opcion_tres,
        R.string.opcion_cuatro,
        R.string.opcion_cinco,
        R.string.opcion_seis
    )
    var estaDesplegado by remember { mutableStateOf(false) }
    var opcionSeleccionada by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.titulo),
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = Color.Magenta,
            modifier = Modifier.padding(bottom = 40.dp)
        )
        Box {
            Button(
                onClick = { estaDesplegado = true },
                shape = RoundedCornerShape(20.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Magenta,
                    contentColor = Color.White
                )
            ) {
                Text(text = stringResource(R.string.seleccionar))
            }
            DropdownMenu(
                expanded = estaDesplegado,
                onDismissRequest = { estaDesplegado = false }
            ) {
                opciones.forEach { idString ->
                    DropdownMenuItem(
                        text = { Text(text = stringResource(idString)) },
                        onClick = {
                            opcionSeleccionada = idString
                            estaDesplegado = false
                        }
                    )
                }
            }
        }
        Spacer(modifier = Modifier.height(40.dp))
        if (opcionSeleccionada == 0) {
            Text(
                text = stringResource(R.string.no_seleccionado),
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color.Black
            )
        } else {
            Text(
                text = "\${stringResource(R.string.seleccionado)} \${stringResource(opcionSeleccionada)}",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color.Black
            )
        }
    }
}`
      },
      {
        id: "t07-ej03",
        topic: "Tema 07",
        exercise: "EJ03Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ03Tema07/app/src/main/java/com/example/ej03tema07/MainActivity.kt",
        summary: "Lista dinámica de ciudades con mutableStateListOf, añadir desde OutlinedTextField y eliminar.",
        code: `package com.example.ej03tema07

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej03tema07.ui.theme.EJ03Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ03Tema07Theme {
                PantallaEJ03()
            }
        }
    }
}

@Composable
fun PantallaEJ03() {
    val listaCiudades = remember { mutableStateListOf<String>() }
    var nombreCiudad by remember { mutableStateOf("") }
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 80.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(80.dp))
        Text(
            text = stringResource(R.string.titulo),
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = Color.Black,
            modifier = Modifier.padding(bottom = 32.dp)
        )
        OutlinedTextField(
            value = nombreCiudad,
            onValueChange = { nombreCiudad = it },
            label = { Text(text = stringResource(R.string.nombre_ciudad)) },
            modifier = Modifier.width(280.dp)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = {
                val mensaje = aniadirCiudad(nombreCiudad, listaCiudades, context)
                Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
            },
            modifier = Modifier.width(200.dp),
            shape = RoundedCornerShape(20.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Black,
                contentColor = Color.White
            )
        ) {
            Text(text = stringResource(R.string.aniadir_ciudad))
        }
        Spacer(modifier = Modifier.height(32.dp))
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(vertical = 8.dp, horizontal = 8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(listaCiudades) { ciudad ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            shape = RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = ciudad,
                        style = MaterialTheme.typography.bodyLarge,
                        color = Color.Black
                    )
                    IconButton(
                        onClick = {
                            val mensaje = eliminarCiudad(ciudad, listaCiudades, context)
                            Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
                        }
                    ) {
                        Icon(
                            imageVector = Icons.Default.Delete,
                            contentDescription = stringResource(R.string.icono_eliminar),
                            tint = Color.Black
                        )
                    }
                }
            }
        }
    }
}

private fun aniadirCiudad(nombre: String, lista: MutableList<String>, context: Context): String {
    return if (nombre.isEmpty()) {
        context.getString(R.string.error_vacio)
    } else {
        lista.add(nombre)
        "$nombre \${context.getString(R.string.aniadida_ok)}"
    }
}

private fun eliminarCiudad(nombre: String, lista: MutableList<String>, context: Context): String {
    lista.remove(nombre)
    return "$nombre \${context.getString(R.string.eliminada_ok)}"
}`
      },
      {
        id: "t07-ej04",
        topic: "Tema 07",
        exercise: "EJ04Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ04Tema07/app/src/main/java/com/example/ej04tema07/MainActivity.kt",
        summary: "Scaffold con TopAppBar (Atrás y Favoritos), FloatingActionButton (Info) e imagen de receta.",
        code: `package com.example.ej04tema07

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBackIosNew
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import com.example.ej04tema07.ui.theme.EJ04Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ04Tema07Theme {
                PantallaEJ04()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaEJ04() {
    val context = LocalContext.current
    val textoAtras = stringResource(R.string.atras)
    val textoFavoritos = stringResource(R.string.favoritos)
    val textoIngredientes = stringResource(R.string.ingredientes)

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = stringResource(R.string.titulo_receta)) },
                navigationIcon = {
                    IconButton(onClick = {
                        Toast.makeText(context, textoAtras, Toast.LENGTH_SHORT).show()
                    }) {
                        Icon(
                            imageVector = Icons.Default.ArrowBackIosNew,
                            contentDescription = stringResource(R.string.desc_atras)
                        )
                    }
                },
                actions = {
                    IconButton(onClick = {
                        Toast.makeText(context, textoFavoritos, Toast.LENGTH_SHORT).show()
                    }) {
                        Icon(
                            imageVector = Icons.Default.Favorite,
                            contentDescription = stringResource(R.string.desc_fav)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary,
                    actionIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    Toast.makeText(context, textoIngredientes, Toast.LENGTH_SHORT).show()
                },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = stringResource(R.string.desc_info)
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            Image(
                painter = painterResource(R.drawable.plato_comida),
                contentDescription = stringResource(R.string.desc_imagen),
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}`
      },
      {
        id: "t07-ej05",
        topic: "Tema 07",
        exercise: "EJ05Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ05Tema07/app/src/main/java/com/example/ej05tema07/MainActivity.kt",
        summary: "Plantilla inicial de Activity vacía tal como aparece en el PDF original.",
        code: `package com.example.ej05tema07

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej05tema07.ui.theme.EJ05Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ05Tema07Theme {
            }
        }
    }
}

@Composable
fun `
      },
      {
        id: "t07-ej06-main",
        topic: "Tema 07",
        exercise: "EJ06Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ06Tema07/app/src/main/java/com/example/ej06tema07/MainActivity.kt",
        summary: "Plantilla inicial de Activity vacía tal como aparece en el PDF original.",
        code: `package com.example.ej06tema07

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.ej06tema07.ui.theme.EJ06Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ06Tema07Theme {
            }
        }
    }
}

@Composable
fun `
      },
      {
        id: "t07-ej06-class",
        topic: "Tema 07",
        exercise: "EJ06Tema07",
        filename: "Pelicula.kt",
        type: "class",
        path: "Tema07/EJ06Tema07/app/src/main/java/com/example/ej06tema07/Pelicula.kt",
        summary: "Modelo de datos Pelicula con título, año, recurso de imagen y descripción.",
        code: `package com.example.ej06tema07

data class Pelicula(
    val titulo: String,
    val anio: String,
    val imagen: Int,
    val descripcionImagen: String
)`
      },
      {
        id: "t07-ej07-main",
        topic: "Tema 07",
        exercise: "EJ07Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ07Tema07/app/src/main/java/com/example/ej07tema07/MainActivity.kt",
        summary: "Selector de 6 deportes con DropdownMenu (leadingIcon) y Card estilizada con Azul1 y Azul2.",
        code: `package com.example.ej07tema07

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.DirectionsBike
import androidx.compose.material.icons.automirrored.filled.DirectionsRun
import androidx.compose.material.icons.filled.Pool
import androidx.compose.material.icons.filled.SportsBasketball
import androidx.compose.material.icons.filled.SportsSoccer
import androidx.compose.material.icons.filled.SportsTennis
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.ej07tema07.ui.theme.Azul1
import com.example.ej07tema07.ui.theme.Azul2
import com.example.ej07tema07.ui.theme.EJ07Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ07Tema07Theme {
                PantallaEJ07()
            }
        }
    }
}

@Composable
fun PantallaEJ07() {
    val listaDeportes = listOf(
        Deporte(stringResource(R.string.futbol), stringResource(R.string.desc_futbol), Icons.Default.SportsSoccer),
        Deporte(stringResource(R.string.baloncesto), stringResource(R.string.desc_baloncesto), Icons.Default.SportsBasketball),
        Deporte(stringResource(R.string.tenis), stringResource(R.string.desc_tenis), Icons.Default.SportsTennis),
        Deporte(stringResource(R.string.natacion), stringResource(R.string.desc_natacion), Icons.Default.Pool),
        Deporte(stringResource(R.string.atletismo), stringResource(R.string.desc_atletismo), Icons.AutoMirrored.Filled.DirectionsRun),
        Deporte(stringResource(R.string.ciclismo), stringResource(R.string.desc_ciclismo), Icons.AutoMirrored.Filled.DirectionsBike)
    )
    var estaDesplegado by remember { mutableStateOf(false) }
    var indiceSeleccionado by remember { mutableIntStateOf(0) }
    var haSeleccionado by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = stringResource(R.string.titulo),
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = Color.Black,
            modifier = Modifier.padding(bottom = 32.dp)
        )
        Box {
            Button(
                onClick = { estaDesplegado = true },
                shape = RoundedCornerShape(20.dp)
            ) {
                Text(text = stringResource(R.string.seleccionar_deporte))
            }
            DropdownMenu(
                expanded = estaDesplegado,
                onDismissRequest = { estaDesplegado = false }
            ) {
                var indice = 0
                listaDeportes.forEach { deporte ->
                    val indiceActual = indice
                    DropdownMenuItem(
                        text = { Text(deporte.nombre) },
                        leadingIcon = {
                            Icon(
                                imageVector = deporte.icono,
                                contentDescription = deporte.nombre
                            )
                        },
                        onClick = {
                            indiceSeleccionado = indiceActual
                            haSeleccionado = true
                            estaDesplegado = false
                        }
                    )
                    indice++
                }
            }
        }
        Spacer(modifier = Modifier.height(100.dp))
        if (!haSeleccionado) {
            Text(
                text = stringResource(R.string.sin_seleccion),
                color = MaterialTheme.colorScheme.error,
                fontWeight = FontWeight.Bold
            )
        } else {
            val deporteElegido = listaDeportes[indiceSeleccionado]
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Azul2),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        imageVector = deporteElegido.icono,
                        contentDescription = deporteElegido.nombre,
                        modifier = Modifier.size(48.dp),
                        tint = Azul1
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = deporteElegido.nombre,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = Azul1
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = deporteElegido.descripcion,
                        style = MaterialTheme.typography.bodyMedium,
                        color = Azul1,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }
    }
}`
      },
      {
        id: "t07-ej07-color",
        topic: "Tema 07",
        exercise: "EJ07Tema07",
        filename: "Color.kt",
        type: "color",
        path: "Tema07/EJ07Tema07/app/src/main/java/com/example/ej07tema07/ui/theme/Color.kt",
        summary: "Paleta personalizada con Azul1 y Azul2 para las tarjetas de deportes.",
        swatches: [
          { name: "Azul1", hex: "#2E4A7D" },
          { name: "Azul2", hex: "#BDD7EE" }
        ],
        code: `package com.example.ej07tema07.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val Azul1 = Color(0xFF2E4A7D)
val Azul2 = Color(0xFFBDD7EE)`
      },
      {
        id: "t07-ej07-class",
        topic: "Tema 07",
        exercise: "EJ07Tema07",
        filename: "Deporte.kt",
        type: "class",
        path: "Tema07/EJ07Tema07/app/src/main/java/com/example/ej07tema07/Deporte.kt",
        summary: "Modelo de datos Deporte con nombre, descripción e icono ImageVector.",
        code: `package com.example.ej07tema07

import androidx.compose.ui.graphics.vector.ImageVector

data class Deporte(
    val nombre: String,
    val descripcion: String,
    val icono: ImageVector
)`
      },
      {
        id: "t07-ej08-main",
        topic: "Tema 07",
        exercise: "EJ08Tema07",
        filename: "MainActivity.kt",
        type: "main",
        path: "Tema07/EJ08Tema07/app/src/main/java/com/example/ej08tema07/MainActivity.kt",
        summary: "Gestor de actividades con Scaffold, TopAppBar, FAB de borrado masivo, alta y Checkboxes de favoritas.",
        code: `package com.example.ej08tema07

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ej08tema07.ui.theme.EJ08Tema07Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            EJ08Tema07Theme {
                PantallaEJ08()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaEJ08() {
    val context = LocalContext.current

    // Actividades iniciales
    val actCine = stringResource(R.string.act_cine)
    val actBici = stringResource(R.string.act_bici)
    val actSenderismo = stringResource(R.string.act_senderismo)
    val actLeer = stringResource(R.string.act_leer)
    val actVideoJuegos = stringResource(R.string.act_videojuegos)

    // Lista de actividades
    val listaActividades = remember {
        mutableStateListOf(
            Actividad(actCine),
            Actividad(actBici),
            Actividad(actSenderismo),
            Actividad(actLeer),
            Actividad(actVideoJuegos)
        )
    }

    // Estado del campo de texto
    var nuevaActividad by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = stringResource(R.string.titulo_app)) },
                actions = {
                    IconButton(onClick = {
                        mostrarActividadesFavoritas(listaActividades, context)
                    }) {
                        Icon(
                            imageVector = Icons.Default.Favorite,
                            contentDescription = stringResource(R.string.favoritas)
                        )
                    }
                    IconButton(onClick = {
                        mostrarInformacionLista(listaActividades, context)
                    }) {
                        Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = stringResource(R.string.info)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    actionIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    eliminarTodasActividades(listaActividades, context)
                },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = stringResource(R.string.eliminar_todas)
                )
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = stringResource(R.string.anadir_actividad),
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = nuevaActividad,
                    onValueChange = { nuevaActividad = it },
                    label = { Text(text = stringResource(R.string.nombre_actividad)) },
                    modifier = Modifier.width(300.dp)
                )
                Spacer(modifier = Modifier.width(22.dp))
                IconButton(
                    onClick = {
                        val anadida = anadirActividad(nuevaActividad, listaActividades, context)
                        if (anadida) {
                            nuevaActividad = ""
                        }
                    },
                    modifier = Modifier.size(40.dp),
                    colors = IconButtonDefaults.filledIconButtonColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                        contentColor = MaterialTheme.colorScheme.onPrimary
                    )
                ) {
                    Icon(
                        imageVector = Icons.Default.Add,
                        contentDescription = stringResource(R.string.anadir)
                    )
                }
            }
            Spacer(modifier = Modifier.height(45.dp))
            Text(
                text = stringResource(R.string.lista_actividades),
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(listaActividades) { actividad ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                color = MaterialTheme.colorScheme.surfaceVariant,
                                shape = RoundedCornerShape(8.dp)
                            )
                            .padding(horizontal = 16.dp, vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = actividad.nombre,
                            style = MaterialTheme.typography.bodyLarge,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Checkbox(
                            checked = actividad.favorita.value,
                            onCheckedChange = { marcado ->
                                actividad.favorita.value = marcado
                                val mensaje = if (marcado) {
                                    R.string.favorita_anadida
                                } else {
                                    R.string.favorita_eliminada
                                }
                                Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
                            },
                            colors = CheckboxDefaults.colors(
                                checkedColor = MaterialTheme.colorScheme.primary,
                                checkmarkColor = Color.White,
                                uncheckedColor = Color.Gray
                            )
                        )
                    }
                }
            }
        }
    }
}

// Añade una nueva actividad a la lista siempre y cuando el nombre no esté vacío
private fun anadirActividad(nombre: String, lista: MutableList<Actividad>, context: Context): Boolean {
    return if (nombre.isEmpty()) {
        Toast.makeText(context, context.getString(R.string.error_nombre), Toast.LENGTH_SHORT).show()
        false
    } else {
        lista.add(Actividad(nombre.trim()))
        Toast.makeText(context, context.getString(R.string.anadida_ok), Toast.LENGTH_SHORT).show()
        true
    }
}

// Elimina todas las actividades de la lista actual, vaciándola por completo
private fun eliminarTodasActividades(lista: MutableList<Actividad>, context: Context) {
    if (lista.isEmpty()) {
        Toast.makeText(context, context.getString(R.string.lista_vacia), Toast.LENGTH_SHORT).show()
    } else {
        lista.clear()
        Toast.makeText(context, context.getString(R.string.eliminadas_todas), Toast.LENGTH_SHORT).show()
    }
}

// Muestra con un Toast todas las actividades marcadas como favoritas
private fun mostrarActividadesFavoritas(lista: List<Actividad>, context: Context) {
    var textoFavoritas = ""
    var hayFavoritas = false
    lista.forEach { actividad ->
        if (actividad.favorita.value) {
            if (hayFavoritas) {
                textoFavoritas += ", "
            }
            textoFavoritas += actividad.nombre
            hayFavoritas = true
        }
    }
    if (!hayFavoritas) {
        Toast.makeText(context, context.getString(R.string.sin_favoritas), Toast.LENGTH_SHORT).show()
    } else {
        val mensaje = "\${context.getString(R.string.favoritas_msg)} $textoFavoritas"
        Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
    }
}

// Muestra con un Toast la cantidad total de actividades en la lista
private fun mostrarInformacionLista(lista: List<Actividad>, context: Context) {
    if (lista.isEmpty()) {
        Toast.makeText(context, context.getString(R.string.lista_vacia), Toast.LENGTH_SHORT).show()
    } else {
        val mensaje = "\${context.getString(R.string.total_actividades)} \${lista.size}"
        Toast.makeText(context, mensaje, Toast.LENGTH_SHORT).show()
    }
}`
      },
      {
        id: "t07-ej08-class",
        topic: "Tema 07",
        exercise: "EJ08Tema07",
        filename: "Actividad.kt",
        type: "class",
        path: "Tema07/EJ08Tema07/app/src/main/java/com/example/ej08tema07/Actividad.kt",
        summary: "Modelo de datos Actividad con MutableState<Boolean> reactivo para Jetpack Compose.",
        code: `package com.example.ej08tema07

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

// Representa una actividad con su nombre y su estado (si es favorita o no)
// Utilizo MutableState para que Jetpack Compose reaccione a los cambios al marcar/desmarcar el Checkbox
data class Actividad(
    var nombre: String,
    var favorita: MutableState<Boolean> = mutableStateOf(false)
)`
      }
    ];

    // =========================================================================
    // 2. ESTADO DE LA APLICACIÓN Y METADATOS
    // =========================================================================
    const TOPICS_META = {
      "Tema 03": { desc: "Fundamentos de Kotlin, Colecciones y Lógica", accent: "text-android border-android/30 bg-android/10" },
      "Tema 04": { desc: "Primeras pantallas Compose y Ciclo de vida", accent: "text-compose border-compose/30 bg-compose/10" },
      "Tema 05": { desc: "Layouts (Column, Row, Box), Temas y Botones", accent: "text-kotlin border-kotlin/30 bg-kotlin/10" },
      "Tema 06": { desc: "Estados, Formularios, Cards, Switches y Juegos", accent: "text-amberData border-amberData/30 bg-amberData/10" },
      "Tema 07": { desc: "LazyColumn, DropdownMenu, Scaffold y Modelos", accent: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" }
    };

    let activeTypeFilter = "all";
    let activeTopicFilter = "all";
    let searchQuery = "";
    let allCollapsed = false;
    let collapsedIds = new Set();

    // =========================================================================
    // 3. ICONOS SVG POR TIPO DE ARCHIVO
    // =========================================================================
    function getTypeMeta(type) {
      if (type === "main") {
        return {
          label: "MainActivity",
          badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-android border-emerald-500/30",
          dotClass: "bg-android",
          iconBg: "bg-android/15 text-emerald-600 dark:text-android border-android/30",
          svg: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.08 10.94 2.5 13.3 2.5 16h19c0-2.7-1.58-5.06-3.9-6.52zM8.5 13.75a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>`
        };
      }
      if (type === "color") {
        return {
          label: "Color.kt personalizado",
          badgeClass: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
          dotClass: "bg-kotlin",
          iconBg: "bg-kotlin/15 text-violet-600 dark:text-violet-300 border-kotlin/30",
          svg: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`
        };
      }
      return {
        label: "data class",
        badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
        dotClass: "bg-amberData",
        iconBg: "bg-amberData/15 text-amber-600 dark:text-amber-300 border-amberData/30",
        svg: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
      };
    }

    // =========================================================================
    // 4. RESALTADOR DE SINTAXIS KOTLIN (LIGERO Y EN UN SOLO PASE)
    // =========================================================================
    function escapeHtml(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function highlightKotlin(code) {
      const escaped = escapeHtml(code);
      const tokenRegex = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(&quot;(?:\\.|[^&]|&(?!quot;))*?&quot;)|(@[A-Za-z_]\w*)|\b(package|import|class|data|fun|val|var|override|private|public|return|if|else|when|for|while|in|until|by|null|true|false|is|as)\b|\b(0x[0-9A-Fa-f]+|\d+(?:\.\d+)?f?)\b|\b([A-Z][A-Za-z0-9_]*)\b/g;

      return escaped.replace(tokenRegex, (match, comment, str, annotation, keyword, number, typeName) => {
        if (comment) return `<span class="text-[#7e7a9e] italic">${comment}</span>`;
        if (str) return `<span class="text-emerald-700 dark:text-[#a9dc76]">${str}</span>`;
        if (annotation) return `<span class="text-amber-600 dark:text-[#ffd866] font-medium">${annotation}</span>`;
        if (keyword) return `<span class="text-[#C711E1] dark:text-[#ff79c6] font-semibold">${keyword}</span>`;
        if (number) return `<span class="text-[#F88909] dark:text-[#ffb86c]">${number}</span>`;
        if (typeName) return `<span class="text-[#7F52FF] dark:text-[#8be9fd]">${typeName}</span>`;
        return match;
      });
    }

    // =========================================================================
    // 5. RENDERIZADO DE ESTADÍSTICAS Y SIDEBAR
    // =========================================================================
    function renderStats() {
      const total = FILES_DATA.length;
      const topicsCount = Object.keys(TOPICS_META).length;
      const mainCount = FILES_DATA.filter(f => f.type === "main").length;
      const colorCount = FILES_DATA.filter(f => f.type === "color").length;
      const classCount = FILES_DATA.filter(f => f.type === "class").length;

      const stats = [
        { label: "Archivos totales", value: total, color: "text-slate-900 dark:text-white", border: "border-slate-200 dark:border-ideBorder", dot: "bg-compose" },
        { label: "Temas cubiertos", value: topicsCount, color: "text-blue-600 dark:text-compose", border: "border-compose/25", dot: "bg-compose" },
        { label: "MainActivity", value: mainCount, color: "text-emerald-600 dark:text-android", border: "border-android/25", dot: "bg-android" },
        { label: "Color.kt custom", value: colorCount, color: "text-violet-600 dark:text-kotlin", border: "border-kotlin/25", dot: "bg-kotlin" },
        { label: "data class", value: classCount, color: "text-amber-600 dark:text-amberData", border: "border-amberData/25", dot: "bg-amberData" }
      ];

      document.getElementById("stats-grid").innerHTML = stats.map(s => `
        <div class="p-3.5 rounded-xl bg-white/90 dark:bg-ideCard/90 border ${s.border} shadow-xs flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">${s.label}</span>
            <span class="w-2 h-2 rounded-full ${s.dot}"></span>
          </div>
          <div class="mt-2 text-2xl font-extrabold ${s.color}">${s.value}</div>
        </div>
      `).join("");
    }

    function renderSidebar() {
      const nav = document.getElementById("sidebar-nav");
      const grouped = groupByTopic(FILES_DATA);

      nav.innerHTML = Object.entries(grouped).map(([topic, files]) => `
        <div>
          <div class="px-2 py-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <a href="#sec-${topic.replace(/\s+/g, '-')}" onclick="toggleMobileSidebar(false)" class="hover:text-android transition">${topic}</a>
            <span class="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-ideCard text-[10px] font-mono">${files.length}</span>
          </div>
          <ul class="mt-1 space-y-0.5">
            ${files.map(file => {
              const meta = getTypeMeta(file.type);
              return `
                <li>
                  <a href="#card-${file.id}" onclick="jumpToFile('${file.id}')" class="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ideCard hover:text-slate-900 dark:hover:text-white transition group">
                    <span class="flex items-center gap-2 truncate">
                      <span class="w-1.5 h-1.5 rounded-full shrink-0 ${meta.dotClass}"></span>
                      <span class="font-medium truncate">${file.exercise}</span>
                    </span>
                    <span class="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0">${file.filename}</span>
                  </a>
                </li>
              `;
            }).join("")}
          </ul>
        </div>
      `).join("");
    }

    function groupByTopic(list) {
      return list.reduce((acc, item) => {
        if (!acc[item.topic]) acc[item.topic] = [];
        acc[item.topic].push(item);
        return acc;
      }, {});
    }

    // =========================================================================
    // 6. RENDERIZADO DE TARJETAS DE ARCHIVOS
    // =========================================================================
    function getFilteredFiles() {
      const q = searchQuery.trim().toLowerCase();
      return FILES_DATA.filter(file => {
        const matchType = activeTypeFilter === "all" || file.type === activeTypeFilter;
        const matchTopic = activeTopicFilter === "all" || file.topic === activeTopicFilter;
        const matchQuery = !q ||
          file.exercise.toLowerCase().includes(q) ||
          file.filename.toLowerCase().includes(q) ||
          file.topic.toLowerCase().includes(q) ||
          file.path.toLowerCase().includes(q) ||
          file.summary.toLowerCase().includes(q) ||
          file.code.toLowerCase().includes(q);
        return matchType && matchTopic && matchQuery;
      });
    }

    function renderFiles() {
      const container = document.getElementById("files-container");
      const emptyState = document.getElementById("empty-state");
      const counter = document.getElementById("results-counter");
      const filtered = getFilteredFiles();

      counter.textContent = `Mostrando ${filtered.length} de ${FILES_DATA.length}`;

      if (filtered.length === 0) {
        container.innerHTML = "";
        emptyState.classList.remove("hidden");
        return;
      }
      emptyState.classList.add("hidden");

      const grouped = groupByTopic(filtered);

      container.innerHTML = Object.entries(grouped).map(([topic, files]) => {
        const tMeta = TOPICS_META[topic] || { desc: "", accent: "" };
        return `
          <div id="sec-${topic.replace(/\s+/g, '-')}" class="scroll-mt-36">
            <!-- Cabecera del Tema -->
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-ideBorder">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 rounded-xl text-xs font-bold border ${tMeta.accent}">${topic}</span>
                <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">${tMeta.desc}</h2>
              </div>
              <span class="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-ideCard border border-slate-200 dark:border-ideBorder text-slate-600 dark:text-slate-300">
                ${files.length} ${files.length === 1 ? 'archivo' : 'archivos'}
              </span>
            </div>

            <!-- Tarjetas del Tema -->
            <div class="space-y-5">
              ${files.map(file => renderFileCard(file)).join("")}
            </div>
          </div>
        `;
      }).join("");
    }

    function renderFileCard(file) {
      const meta = getTypeMeta(file.type);
      const isCollapsed = collapsedIds.has(file.id);
      const lineCount = file.code.split("\n").length;

      // Barra de muestras de color para Color.kt
      const swatchesHtml = file.swatches && file.swatches.length > 0 ? `
        <div class="px-4 py-3 bg-slate-50 dark:bg-[#0f131b] border-b border-slate-200 dark:border-ideBorder flex flex-wrap items-center gap-2.5">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">Colores añadidos:</span>
          ${file.swatches.map(sw => `
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white dark:bg-ideCard border border-slate-200 dark:border-ideBorder shadow-2xs">
              <span class="w-4 h-4 rounded-md border border-black/15 dark:border-white/20 shrink-0" style="background-color: ${sw.hex};"></span>
              <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${sw.name}</span>
              <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400">${sw.hex}</span>
            </div>
          `).join("")}
        </div>
      ` : "";

      return `
        <article id="card-${file.id}" class="scroll-mt-36 rounded-2xl bg-white dark:bg-ideCard border border-slate-200 dark:border-ideBorder shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition overflow-hidden">
          <!-- Cabecera de tarjeta -->
          <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-ideBorder bg-slate-50/70 dark:bg-ideSurface/60">
            <div class="flex items-start gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl border ${meta.iconBg} flex items-center justify-center shrink-0 mt-0.5">
                ${meta.svg}
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">${file.exercise}</h3>
                  <span class="text-slate-400">·</span>
                  <code class="text-xs sm:text-sm font-mono font-semibold text-compose">${file.filename}</code>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${meta.badgeClass}">
                    ${meta.label}
                  </span>
                </div>
                <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">${file.summary}</p>
                <div class="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate">
                  <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span class="truncate" title="${file.path}">${file.path}</span>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span class="hidden md:inline-block text-[11px] font-mono text-slate-400 mr-1">${lineCount} líneas</span>
              <button
                onclick="copyCode('${file.id}', this)"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-ideBg border border-slate-200 dark:border-ideBorder hover:border-android/60 hover:text-emerald-600 dark:hover:text-android text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copiar</span>
              </button>
              <button
                onclick="toggleCard('${file.id}')"
                class="p-2 rounded-xl bg-white dark:bg-ideBg border border-slate-200 dark:border-ideBorder hover:border-compose/60 text-slate-600 dark:text-slate-300 transition"
                aria-label="Colapsar o expandir código"
              >
                <svg class="w-4 h-4 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- Cuerpo colapsable -->
          <div class="${isCollapsed ? 'hidden' : 'block'}">
            ${swatchesHtml}
            <div class="relative bg-[#eef0f8] dark:bg-[#090910] overflow-x-auto">
              <pre class="p-4 text-xs sm:text-[13px] leading-relaxed font-mono text-[#171625] dark:text-[#eae8f5]"><code>${highlightKotlin(file.code)}</code></pre>
            </div>
          </div>
        </article>
      `;
    }

    // =========================================================================
    // 7. INTERACTIVIDAD (FILTROS, COPIADO, TEMA, COLAPSO, NAVEGACIÓN)
    // =========================================================================
    function updateFilterButtonStyles() {
      document.querySelectorAll(".type-btn").forEach(btn => {
        const active = btn.dataset.type === activeTypeFilter;
        btn.className = active
          ? "type-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-android text-slate-950 shadow-xs"
          : "type-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-slate-100 dark:bg-ideCard text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-ideBorder hover:border-android/50";
      });
      document.querySelectorAll(".topic-btn").forEach(btn => {
        const active = btn.dataset.topic === activeTopicFilter;
        btn.className = active
          ? "topic-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold transition bg-compose text-white shadow-xs"
          : "topic-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold transition bg-slate-100 dark:bg-ideCard text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-ideBorder hover:border-compose/50";
      });
    }

    function setTypeFilter(type) {
      activeTypeFilter = type;
      updateFilterButtonStyles();
      renderFiles();
    }

    function setTopicFilter(topic) {
      activeTopicFilter = topic;
      updateFilterButtonStyles();
      renderFiles();
    }

    function clearSearch() {
      searchQuery = "";
      const input = document.getElementById("search-input");
      input.value = "";
      document.getElementById("clear-search").classList.add("hidden");
      renderFiles();
    }

    function resetAllFilters() {
      activeTypeFilter = "all";
      activeTopicFilter = "all";
      clearSearch();
      updateFilterButtonStyles();
      renderFiles();
    }

    function toggleCard(id) {
      if (collapsedIds.has(id)) {
        collapsedIds.delete(id);
      } else {
        collapsedIds.add(id);
      }
      renderFiles();
    }

    function toggleAllCards() {
      allCollapsed = !allCollapsed;
      if (allCollapsed) {
        FILES_DATA.forEach(f => collapsedIds.add(f.id));
        document.getElementById("toggle-all-text").textContent = "Expandir todo";
      } else {
        collapsedIds.clear();
        document.getElementById("toggle-all-text").textContent = "Colapsar todo";
      }
      renderFiles();
    }

    function jumpToFile(id) {
      toggleMobileSidebar(false);
      // Si el archivo estaba oculto por filtros, restablecemos para que sea visible
      const visible = getFilteredFiles().some(f => f.id === id);
      if (!visible) {
        activeTypeFilter = "all";
        activeTopicFilter = "all";
        searchQuery = "";
        document.getElementById("search-input").value = "";
        document.getElementById("clear-search").classList.add("hidden");
        updateFilterButtonStyles();
      }
      if (collapsedIds.has(id)) {
        collapsedIds.delete(id);
      }
      renderFiles();
      setTimeout(() => {
        const el = document.getElementById("card-" + id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }

    // Copiar al portapapeles usando execCommand('copy') para compatibilidad total en iframes
    let toastTimer = null;
    function showToast(message) {
      const toast = document.getElementById("toast-notification");
      document.getElementById("toast-text").textContent = message;
      toast.classList.remove("opacity-0", "translate-y-4");
      toast.classList.add("opacity-100", "translate-y-0");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-4");
        toast.classList.remove("opacity-100", "translate-y-0");
      }, 2200);
    }

    function copyCode(id, btnEl) {
      const file = FILES_DATA.find(f => f.id === id);
      if (!file) return;

      const textarea = document.createElement("textarea");
      textarea.value = file.code;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        const labelSpan = btnEl.querySelector("span");
        const originalText = labelSpan.textContent;
        labelSpan.textContent = "¡Copiado!";
        btnEl.classList.add("border-android", "text-emerald-600", "dark:text-android");
        showToast(`${file.exercise} — ${file.filename} copiado`);
        setTimeout(() => {
          labelSpan.textContent = originalText;
          btnEl.classList.remove("border-android", "text-emerald-600", "dark:text-android");
        }, 1600);
      } catch (err) {
        showToast("No se pudo copiar automáticamente");
      } finally {
        document.body.removeChild(textarea);
      }
    }

    // Tema claro / oscuro
    function applyTheme(t) {
      const isLight = t === "light";
      if (isLight) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.dataset.theme = "light";
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.dataset.theme = "dark";
      }
      try { localStorage.setItem("tema_apuntes", isLight ? "light" : "dark"); } catch (e) {}
    }
    window.applyTheme = applyTheme;

    function toggleTheme() {
      const isDark = document.documentElement.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    }

    // Sidebar móvil
    function toggleMobileSidebar(open) {
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("mobile-overlay");
      if (open) {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
      } else {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
      }
    }

    // Sidebar en escritorio: escondido por defecto y se despliega al pasar el ratón por el icono de Android
    let desktopSidebarHidden = true;
    let desktopHoverOpen = false;

    function updateDesktopSidebarUI() {
      const sidebar = document.getElementById("sidebar");
      const trigger = document.getElementById("sidebar-android-trigger");
      if (!sidebar || !trigger) return;

      if (desktopSidebarHidden) {
        if (desktopHoverOpen) {
          sidebar.classList.remove("desktop-collapsed");
          sidebar.classList.add("desktop-hover-open");
          trigger.classList.add("hidden");
          trigger.classList.remove("lg:flex");
        } else {
          sidebar.classList.add("desktop-collapsed");
          sidebar.classList.remove("desktop-hover-open");
          trigger.classList.remove("hidden");
          trigger.classList.add("lg:flex");
        }
      } else {
        sidebar.classList.remove("desktop-collapsed", "desktop-hover-open");
        trigger.classList.add("hidden");
        trigger.classList.remove("lg:flex");
      }
    }

    function toggleDesktopSidebar(forceState) {
      if (typeof forceState === "boolean") {
        desktopSidebarHidden = forceState;
      } else {
        desktopSidebarHidden = !desktopSidebarHidden;
      }
      desktopHoverOpen = false;
      updateDesktopSidebarUI();
    }

    function showSidebarFromHover() {
      desktopSidebarHidden = true;
      desktopHoverOpen = true;
      updateDesktopSidebarUI();
    }

    function handleSidebarMouseLeave() {
      desktopSidebarHidden = true;
      desktopHoverOpen = false;
      updateDesktopSidebarUI();
    }

    // =========================================================================
    // 8. INICIALIZACIÓN
    // =========================================================================
    document.addEventListener("DOMContentLoaded", () => {
      // Sincronizar tema guardado
      const savedTheme = localStorage.getItem("tema_apuntes") || "dark";
      applyTheme(savedTheme);

      // Si está dentro de iframe (visor.html), ocultar botones de tema redundantes
      if (window.self !== window.top) {
        document.querySelectorAll('button[onclick*="toggleTheme"]').forEach(b => {
          b.style.setProperty("display", "none", "important");
        });
      }

      updateDesktopSidebarUI();
      renderStats();
      renderSidebar();
      updateFilterButtonStyles();
      renderFiles();

      // Buscador en tiempo real
      const searchInput = document.getElementById("search-input");
      const clearBtn = document.getElementById("clear-search");
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        clearBtn.classList.toggle("hidden", searchQuery.length === 0);
        renderFiles();
      });

      // Botón volver arriba
      const backToTop = document.getElementById("back-to-top");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 380) {
          backToTop.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
          backToTop.classList.add("opacity-100", "translate-y-0");
        } else {
          backToTop.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
          backToTop.classList.remove("opacity-100", "translate-y-0");
        }
      });
    });
  
