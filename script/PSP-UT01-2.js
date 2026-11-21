        // Data for all 18 Exercises
        const exercisesData = [
            {
                id: 1,
                title: "Ejercicio 1: Reloj con Hebra Avisadora de Tiempo",
                desc: "Añadir una hebra que escriba 'Se te está acabando el tiempo' en el terminal cada 5 segundos al programa del Reloj.",
                code: `// Clase Hebra Avisadora
public class Avisador extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 2; i++) {
            try {
                Thread.sleep(5000);
                System.out.println("--> Se te está acabando el tiempo");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Programa Principal Reloj
public class RelojConAviso {
    public static void main(String[] args) {
        Hora hora = new Hora();
        Sonido sonido = new Sonido();
        Avisador aviso = new Avisador();

        hora.start();
        sonido.start();
        aviso.start();
    }
}`
            },
            {
                id: 2,
                title: "Ejercicio 2: Bucle Infinito TIC y TAC con Sleep",
                desc: "Dos clases que extienden Thread para imprimir de forma continua TIC y TAC con sleep().",
                code: `public class HiloTic extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println("TIC");
            try { Thread.sleep(500); } catch (InterruptedException e) { e.printStackTrace(); }
        }
    }
}

public class HiloTac extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println("TAC");
            try { Thread.sleep(500); } catch (InterruptedException e) { e.printStackTrace(); }
        }
    }
}

public class MainTicTac {
    public static void main(String[] args) {
        new HiloTic().start();
        new HiloTac().start();
    }
}`
            },
            {
                id: 3,
                title: "Ejercicio 3: Transformación del Reloj a la Interfaz Runnable",
                desc: "Reimplementación del ejercicio del Reloj utilizando Runnable en lugar de heredar de Thread.",
                code: `public class HoraRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(java.time.LocalDateTime.now());
            try { Thread.sleep(1000); } catch (InterruptedException e) { e.printStackTrace(); }
        }
    }
}

public class SonidoRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Beep!!");
            java.awt.Toolkit.getDefaultToolkit().beep();
            try { Thread.sleep(1000); } catch (InterruptedException e) { e.printStackTrace(); }
        }
    }
}

public class RelojRunnableMain {
    public static void main(String[] args) {
        Thread tHora = new Thread(new HoraRunnable());
        Thread tSonido = new Thread(new SonidoRunnable());
        tHora.start();
        tSonido.start();
    }
}`
            },
            {
                id: 4,
                title: "Ejercicio 4: Hilos Runnable HOLA y ADIÓS",
                desc: "Dos clases Runnable imprimiendo 100 veces HOLA y ADIÓS observando el intercalado concurrente.",
                code: `public class HiloHola implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) System.out.println("HOLA");
    }
}

public class HiloAdios implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) System.out.println("ADIÓS");
    }
}

public class MainHolaAdios {
    public static void main(String[] args) {
        new Thread(new HiloHola()).start();
        new Thread(new HiloAdios()).start();
    }
}`
            },
            {
                id: 5,
                title: "Ejercicio 5: PintaDiezVeces con ID, Prioridad y Nombre",
                desc: "Arrancar 5 hilos que muestren su cadena, ID, prioridad y nombre 10 veces por pantalla.",
                code: `public class PintaDiezVeces extends Thread {
    private String cadena;

    public PintaDiezVeces(String cadena) {
        this.cadena = cadena;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Cadena: " + cadena + " | ID: " + getId() + 
                               " | Prioridad: " + getPriority() + " | Nombre: " + getName());
        }
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            PintaDiezVeces h = new PintaDiezVeces("Mensaje-" + i);
            h.setName("HiloPinta-" + i);
            h.setPriority(i);
            h.start();
        }
    }
}`
            },
            {
                id: 6,
                title: "Ejercicio 6: Fábula de la Tortuga, Liebre y Guepardo",
                desc: "Simulación de una carrera asignando prioridades mínima (Tortuga), media (Liebre) y máxima (Guepardo).",
                code: `public class CorredorAnimal extends Thread {
    public CorredorAnimal(String nombre) {
        super(nombre);
    }

    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            System.out.println(getName() + " recorre el metro " + i);
            Thread.yield(); // cede voluntariamente la CPU para suavizar la transición
        }
        System.out.println(">>> ¡LLEGO A LA META: " + getName() + "! <<<");
    }

    public static void main(String[] args) {
        CorredorAnimal tortuga = new CorredorAnimal("Tortuga");
        CorredorAnimal liebre = new CorredorAnimal("Liebre");
        CorredorAnimal guepardo = new CorredorAnimal("Guepardo");

        tortuga.setPriority(Thread.MIN_PRIORITY); // 1
        liebre.setPriority(Thread.NORM_PRIORITY);  // 5
        guepardo.setPriority(Thread.MAX_PRIORITY); // 10

        tortuga.start();
        liebre.start();
        guepardo.start();
    }
}`
            },
            {
                id: 7,
                title: "Ejercicio 7: Generador Concurrente de Tablas de Multiplicar",
                desc: "Clase PintaTabla que guarda las tablas de multiplicar en archivos en la carpeta TABLAS/N.txt.",
                code: `import java.io.*;
import java.util.Scanner;

public class PintaTabla extends Thread {
    private int numero;

    public PintaTabla(int numero) {
        this.numero = numero;
    }

    @Override
    public void run() {
        File dir = new File("TABLAS");
        if (!dir.exists()) dir.mkdir();

        try (PrintWriter writer = new PrintWriter(new FileWriter("TABLAS/" + numero + ".txt"))) {
            writer.println("La Tabla del " + numero + ":");
            writer.println("***************************");
            for (int i = 0; i <= 10; i++) {
                writer.println(numero + " x " + i + " = " + (numero * i));
            }
            System.out.println("--> Generado el fichero de la tabla del " + numero);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

public class GeneradorTablas {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int opc = -1;
        while (opc != 1) {
            System.out.println("Opciones:\\n 0: Generar una tabla\\n 1: Salir");
            opc = sc.nextInt();
            if (opc == 0) {
                System.out.print("Introduce el número del cual quieres generar la tabla: ");
                int num = sc.nextInt();
                new PintaTabla(num).start();
            }
        }
    }
}`
            },
            {
                id: 8,
                title: "Ejercicio 8: Suma de 3 Matrices Cuadradas con 9 Hilos",
                desc: "Creación de 9 hilos (uno por celda) que se duermen 1ms, realizan la suma parcial y aguardan con join().",
                code: `public class SumaMatricesConcurrente {
    public static int[][] matriz1 = {{1,2,3},{4,5,6},{7,8,9}};
    public static int[][] matriz2 = {{4,2,1},{9,8,1},{1,1,0}};
    public static int[][] matrizResultado = new int[3][3];

    static class HiloSuma extends Thread {
        private int fila, col;
        public HiloSuma(int fila, int col) {
            this.fila = fila;
            this.col = col;
        }
        @Override
        public void run() {
            try { Thread.sleep(1); } catch (InterruptedException e) {}
            matrizResultado[fila][col] = matriz1[fila][col] + matriz2[fila][col];
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread[][] hilos = new Thread[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                hilos[i][j] = new HiloSuma(i, j);
                hilos[i][j].start();
            }
        }

        // Esperar a que terminen los 9 hilos
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                hilos[i][j].join();
            }
        }

        // Imprimir matriz resultado
        System.out.println("Matriz Resultado:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(matrizResultado[i][j] + "\\t");
            }
            System.out.println();
        }
    }
}`
            },
            {
                id: 9,
                title: "Ejercicio 9: Carretera Plasencia-Malpartida y Puente Colgante",
                desc: "Simulación de 4 coches donde los km 6-9 son un puente colgante sincronizado que solo permite 1 coche a la vez.",
                code: `public class PuenteColgante {
    public synchronized void cruzarPuente(String coche) {
        for (int km = 6; km <= 9; km++) {
            System.out.println("*** El " + coche + " está atravesando el km " + km + " del puente");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        }
    }
}

public class Coche extends Thread {
    private String nombre;
    private PuenteColgante puente;

    public Coche(String nombre, PuenteColgante puente) {
        this.nombre = nombre;
        this.puente = puente;
    }

    @Override
    public void run() {
        for (int km = 1; km <= 5; km++) {
            System.out.println("El " + nombre + " va por el km" + km + " de la carretera");
            try { Thread.sleep(50); } catch (InterruptedException e) {}
        }
        puente.cruzarPuente(nombre);
        for (int km = 10; km <= 12; km++) {
            System.out.println("El " + nombre + " va por el km" + km + " de la carretera");
            try { Thread.sleep(50); } catch (InterruptedException e) {}
        }
    }

    public static void main(String[] args) {
        PuenteColgante puente = new PuenteColgante();
        for (int i = 0; i < 4; i++) {
            new Coche("coche-" + i, puente).start();
        }
    }
}`
            },
            {
                id: 10,
                title: "Ejercicio 10: Múltiplos de Hilo Ordenados sin Intercalación",
                desc: "Tres hilos con NAME '1', '2' y '3' imprimen sus 5 múltiplos utilizando un objeto monitor compartido.",
                code: `public class ImpresorMultiplos {
    public synchronized void imprimirTabla(String name) {
        int x = Integer.parseInt(name);
        System.out.println("Soy el hilo " + x + " los primeros múltiplos son:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Múltiplo[" + i + "]: " + (x * i));
        }
        System.out.println("Fin de los múltiplos de " + x);
    }
}

public class HiloMultiplo extends Thread {
    private ImpresorMultiplos impresor;

    public HiloMultiplo(String name, ImpresorMultiplos impresor) {
        super(name);
        this.impresor = impresor;
    }

    @Override
    public void run() {
        impresor.imprimirTabla(getName());
    }

    public static void main(String[] args) {
        ImpresorMultiplos monitor = new ImpresorMultiplos();
        new HiloMultiplo("1", monitor).start();
        new HiloMultiplo("2", monitor).start();
        new HiloMultiplo("3", monitor).start();
    }
}`
            },
            {
                id: 11,
                title: "Ejercicio 11: Repartidores de Flyers Publicitarios",
                desc: "Pila compartida de 1000 flyers repartida por 5 empleados en exclusión mutua con recuento final.",
                code: `public class PilaFlyers {
    private int flyers = 1000;

    public synchronized boolean cogerFlyer() {
        if (flyers > 0) {
            flyers--;
            return true;
        }
        return false;
    }

    public int getRestantes() { return flyers; }
}

public class Repartidor extends Thread {
    private PilaFlyers pila;
    private int repartidos = 0;

    public Repartidor(String nombre, PilaFlyers pila) {
        super(nombre);
        this.pila = pila;
    }

    public int getRepartidos() { return repartidos; }

    @Override
    public void run() {
        while (pila.cogerFlyer()) {
            repartidos++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        PilaFlyers pila = new PilaFlyers();
        Repartidor[] r = {
            new Repartidor("Juan", pila), new Repartidor("Marta", pila),
            new Repartidor("Pedro", pila), new Repartidor("María", pila),
            new Repartidor("Lucía", pila)
        };

        for (Repartidor rep : r) rep.start();
        for (Repartidor rep : r) rep.join();

        int suma = 0;
        for (Repartidor rep : r) {
            System.out.println("El repartidor " + rep.getName() + " ha repartido " + rep.getRepartidos() + " flyers.");
            suma += rep.getRepartidos();
        }
        System.out.println("La suma de repartidos entre todos es: " + suma);
        System.out.println("Al final quedan " + pila.getRestantes() + " flyers.");
    }
}`
            },
            {
                id: 12,
                title: "Ejercicio 12: Productor con Múltiples Consumidores",
                desc: "Adaptación del modelo Productor-Consumidor para dar soporte a varios consumidores sincronizados.",
                code: `public class ColaMultiplesConsumidores {
    // Código de Cola del Caso de Estudio (usando wait, notifyAll)
    // Permite que un Productor abastezca a varios hilos Consumidores
}`
            },
            {
                id: 13,
                title: "Ejercicio 13: TIC-TAC Alternado con Token / Testigo",
                desc: "Garantizar la alternancia estricta TIC -> TAC -> TIC -> TAC utilizando un testigo sincronizado.",
                code: `public class TokenReloj {
    private boolean turnoTic = true;

    public synchronized void pasoTic() {
        while (!turnoTic) {
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println("TIC");
        turnoTic = false;
        notifyAll();
    }

    public synchronized void pasoTac() {
        while (turnoTic) {
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println("TAC");
        turnoTic = true;
        notifyAll();
    }
}

public class RelojSincronizado {
    public static void main(String[] args) {
        TokenReloj token = new TokenReloj();
        
        new Thread(() -> {
            while (true) { token.pasoTic(); try { Thread.sleep(500); } catch (Exception e) {} }
        }).start();

        new Thread(() -> {
            while (true) { token.pasoTac(); try { Thread.sleep(500); } catch (Exception e) {} }
        }).start();
    }
}`
            },
            {
                id: 14,
                title: "Ejercicio 14: iReloj Triple Hilo (TIC -> TAC -> TOC)",
                desc: "Cronometración de 3 hilos coordinados mediante wait(), notify() y notifyAll().",
                code: `public class MonitorIReloj {
    private int estado = 0; // 0: TIC, 1: TAC, 2: TOC

    public synchronized void tic() {
        while (estado != 0) { try { wait(); } catch (InterruptedException e) {} }
        System.out.print("TIC -> ");
        estado = 1;
        notifyAll();
    }

    public synchronized void tac() {
        while (estado != 1) { try { wait(); } catch (InterruptedException e) {} }
        System.out.print("TAC -> ");
        estado = 2;
        notifyAll();
    }

    public synchronized void toc() {
        while (estado != 2) { try { wait(); } catch (InterruptedException e) {} }
        System.out.println("TOC");
        estado = 0;
        notifyAll();
    }

    public static void main(String[] args) {
        MonitorIReloj reloj = new MonitorIReloj();
        new Thread(() -> { while(true) reloj.tic(); }).start();
        new Thread(() -> { while(true) reloj.tac(); }).start();
        new Thread(() -> { while(true) reloj.toc(); }).start();
    }
}`
            },
            {
                id: 15,
                title: "Ejercicio 15: Pintor de Cadenas 'A' y 'B' Sincronizado",
                desc: "Regla: Tantas 'A' seguidas como se desee; solo se pinta una 'B' tras una 'A'. Límite total: 20 letras.",
                code: `public class ControladorLetras {
    private int total = 0;
    private boolean ultimaFueA = false;
    private int numA = 0, numB = 0;

    public synchronized boolean pintarA() {
        if (total >= 20) return false;
        System.out.print("A");
        total++; numA++;
        ultimaFueA = true;
        notifyAll();
        return true;
    }

    public synchronized boolean pintarB() {
        while (!ultimaFueA && total < 20) {
            try { wait(); } catch (InterruptedException e) {}
        }
        if (total >= 20) return false;
        System.out.print("B");
        total++; numB++;
        ultimaFueA = false;
        notifyAll();
        return true;
    }

    public void mostrarTotales() {
        System.out.println("\\nA's: " + numA + " | B's: " + numB);
    }
}`
            },
            {
                id: 16,
                title: "Ejercicio 16: Baño Único del IES Valle del Jerte",
                desc: "Aforo máximo de 3 personas simultáneas en el baño. Simulación para 5 personas.",
                code: `public class CuartoBano {
    private int personasDentro = 0;

    public synchronized void entrar(String persona) {
        while (personasDentro >= 3) {
            System.out.println("¡" + persona + " espera porque el baño está lleno!");
            try { wait(); } catch (InterruptedException e) {}
        }
        personasDentro++;
        System.out.println("Entra " + persona + " --- Hay " + personasDentro);
    }

    public synchronized void salir(String persona) {
        personasDentro--;
        System.out.println("Sale " + persona + " --- Hay " + personasDentro);
        notifyAll();
    }
}`
            },
            {
                id: 17,
                title: "Ejercicio 17: Puente Levadizo Peatones vs Barco",
                desc: "Los barcos tienen prioridad absoluta. Si un barco quiere pasar, no entran más peatones y se vacía el puente.",
                code: `public class ControladorPuente {
    private int peatones = 0;
    private boolean barcoEsperando = false;

    public synchronized void entrarPeaton(String nombre) {
        while (barcoEsperando) {
            try { wait(); } catch (InterruptedException e) {}
        }
        peatones++;
        System.out.println("Entra " + nombre + " por el puente. Hay " + peatones);
    }

    public synchronized void salirPeaton(String nombre) {
        peatones--;
        System.out.println("=> Sale " + nombre + " del puente. Quedan " + peatones);
        if (peatones == 0) notifyAll();
    }

    public synchronized void pasarBarco(String nombreBarco) {
        barcoEsperando = true;
        System.out.println("*************** BARCO QUIERE PASAR ****************");
        while (peatones > 0) {
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println(nombreBarco + " está cruzando....<P>");
        System.out.println("El barco " + nombreBarco + " salió del puente.");
        barcoEsperando = false;
        notifyAll();
    }
}`
            },
            {
                id: 18,
                title: "Ejercicio 18: Alumnos Fumadores de 2º DAM y el Estanquero",
                desc: "Problema clásico de los fumadores (1=tabaco, 2=cerillas, 3=papel) y el estanquero que coloca 2 ingredientes en la repisa.",
                code: `public class BanoEstanco {
    // repisa: 0=vacía, 1=falta tabaco, 2=falta cerillas, 3=falta papel
    private int repisa = 0;

    public synchronized void ponerIngredientes(int faltaIngrediente) {
        while (repisa != 0) {
            try { wait(); } catch (InterruptedException e) {}
        }
        repisa = faltaIngrediente;
        String txt = (faltaIngrediente == 1) ? "CERILLAS Y PAPEL" :
                     (faltaIngrediente == 2) ? "TABACO Y PAPEL" : "TABACO Y CERILLAS";
        System.out.println("=> El estanquero repone ingredientes: en la repisa hay " + txt);
        notifyAll();
    }

    public synchronized void fumar(int idFumador) {
        while (repisa != idFumador) {
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println("El fumador " + idFumador + " coge ingredientes y empieza a fumar");
        repisa = 0;
        notifyAll();
    }
}`
            }
        ];

        // Quiz Questions Data
        const quizQuestions = [
            {
                id: "q1",
                type: "vf",
                text: "1. Una clase no puede tener métodos sincronizados y no sincronizados a la vez.",
                correct: "F",
                exp: "Falso. Una clase puede combinar ambos tipos. Únicamente los métodos protegidos con synchronized estarán restringidos por el cerrojo."
            },
            {
                id: "q2",
                type: "vf",
                text: "2. A un método no sincronizado pueden acceder muchos hilos al mismo tiempo.",
                correct: "V",
                exp: "Verdadero. Al no estar protegido por un cerrojo, la JVM permite el acceso concurrente de múltiples hilos."
            },
            {
                id: "q3",
                type: "vf",
                text: "3. Si un hilo ejecuta el método wait(), pierde el bloqueo del monitor en el caso de que lo tenga.",
                correct: "V",
                exp: "Verdadero. wait() libera el cerrojo permitiendo que otros hilos entren en secciones sincronizadas."
            },
            {
                id: "q4",
                type: "vf",
                text: "4. Si un hilo ejecuta el método sleep(), pierde el bloqueo del monitor en caso de que lo tenga.",
                correct: "F",
                exp: "Falso. sleep() pasa el hilo al estado Dormido pero MANTIENE los cerrojos adquiridos."
            },
            {
                id: "q5",
                type: "vf",
                text: "5. Los métodos wait(), notify() y notifyAll() siempre deben ejecutarse dentro de bloques de código sincronizado.",
                correct: "V",
                exp: "Verdadero. Si se invocan fuera de un contexto synchronized, la JVM lanzará IllegalMonitorStateException."
            },
            {
                id: "q6",
                type: "fill",
                text: "6. Completa el enunciado con las palabras correspondientes:",
                sentence: "Si dos [h1] quieren ejecutar un método [h2] de una clase y los dos usan la misma [h3] de la clase para llamar al método, únicamente uno de los dos podrá [h4] el código en un momento determinado. El otro hilo deberá [h5] a que el primero termine.",
                corrects: { h1: "hilos", h2: "sincronizado", h3: "instancia", h4: "ejecutar", h5: "esperar" },
                options: ["hilos", "sincronizado", "instancia", "ejecutar", "esperar", "bloquear", "proceso"]
            },
            {
                id: "q7",
                type: "matching",
                text: "7. Relaciona los conceptos de forma correcta:",
                pairs: [
                    { label: "1. Palabra reservada para sincronizar", correct: "synchronized" },
                    { label: "2. Runnable es una...", correct: "interfaz" },
                    { label: "3. yield() envía el hilo al estado de...", correct: "preparado" },
                    { label: "4. Bloqueo cruzado entre dos hilos es un...", correct: "interbloqueo" },
                    { label: "5. wait() envía al hilo al estado de...", correct: "en espera" }
                ],
                options: ["synchronized", "interfaz", "preparado", "interbloqueo", "en espera"]
            }
        ];

        // Modo claro / modo oscuro
        function applyTheme(theme) {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);

            const icon = document.getElementById('theme-icon');
            const label = document.getElementById('theme-label');
            const button = document.getElementById('theme-toggle');

            if (icon && label && button) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
                label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
                button.setAttribute(
                    'aria-label',
                    isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                );
            }
        }

        function toggleTheme() {
            const nextTheme = document.documentElement.classList.contains('dark')
                ? 'light'
                : 'dark';
            applyTheme(nextTheme);
            try {
                localStorage.setItem('psp-theme', nextTheme);
            } catch (e) {
                // La página sigue funcionando aunque el navegador no permita guardar la preferencia.
            }
        }

        // Recuperar la preferencia guardada; por defecto se usa el modo claro.
        try {
            applyTheme(localStorage.getItem('psp-theme') || 'light');
        } catch (e) {
            applyTheme('light');
        }

        // Switch Tabs Logic
        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));

            document.getElementById(`tab-${tabId}`).classList.add('active');
            document.getElementById(`content-${tabId}`).classList.remove('hidden');
        }

        // Render All Exercises
        function renderExercises() {
            const container = document.getElementById('exercises-container');
            container.innerHTML = exercisesData.map(ex => `
                <div class="exercise-card bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4" data-title="${ex.title.toLowerCase()} ${ex.desc.toLowerCase()}">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                        <h3 class="font-bold text-slate-900 text-base">${ex.title}</h3>
                        <button onclick="copyCode('code-ex-${ex.id}', this)" class="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all">
                            <i class="fa-regular fa-copy"></i> Copiar Código Java
                        </button>
                    </div>
                    <p class="text-xs text-slate-600">${ex.desc}</p>
                    <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code id="code-ex-${ex.id}">${escapeHtml(ex.code)}</code></pre>
                </div>
            `).join('');
        }

        function filterExercises() {
            const query = document.getElementById('exercise-search').value.toLowerCase();
            document.querySelectorAll('.exercise-card').forEach(card => {
                const text = card.getAttribute('data-title');
                card.style.display = text.includes(query) ? 'block' : 'none';
            });
        }

        function escapeHtml(text) {
            return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        // Copy Code Functionality
        function copyCode(elementId, btn) {
            const codeText = document.getElementById(elementId).innerText;
            const textArea = document.createElement("textarea");
            textArea.value = codeText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i> ¡Copiado!`;
            btn.classList.add('bg-emerald-50', 'text-emerald-700');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('bg-emerald-50', 'text-emerald-700');
            }, 2000);
        }

        // Render Quiz
        function renderQuiz() {
            const container = document.getElementById('quiz-container');
            container.innerHTML = quizQuestions.map((q, idx) => {
                if (q.type === 'vf') {
                    return `
                        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" id="card-${q.id}">
                            <p class="font-bold text-xs text-slate-800">${q.text}</p>
                            <div class="flex gap-4 text-xs font-semibold">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="${q.id}" value="V" class="text-brand-600"> Verdadero (V)
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="${q.id}" value="F" class="text-brand-600"> Falso (F)
                                </label>
                            </div>
                            <div class="exp-box hidden text-xs p-3 rounded-lg mt-2 bg-slate-50 border border-slate-200"></div>
                        </div>
                    `;
                } else if (q.type === 'fill') {
                    return `
                        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" id="card-${q.id}">
                            <p class="font-bold text-xs text-slate-800">${q.text}</p>
                            <p class="text-xs text-slate-700 leading-relaxed">
                                Si dos 
                                <select id="${q.id}-h1" class="bg-slate-100 border p-1 rounded font-semibold text-xs">${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>
                                quieren ejecutar un método 
                                <select id="${q.id}-h2" class="bg-slate-100 border p-1 rounded font-semibold text-xs">${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>
                                de una clase y los dos usan la misma 
                                <select id="${q.id}-h3" class="bg-slate-100 border p-1 rounded font-semibold text-xs">${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>
                                para llamar al método, únicamente uno de los dos podrá 
                                <select id="${q.id}-h4" class="bg-slate-100 border p-1 rounded font-semibold text-xs">${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>
                                el código en un momento determinado. El otro hilo deberá 
                                <select id="${q.id}-h5" class="bg-slate-100 border p-1 rounded font-semibold text-xs">${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>
                                a que el primero termine.
                            </p>
                            <div class="exp-box hidden text-xs p-3 rounded-lg mt-2 bg-slate-50 border border-slate-200"></div>
                        </div>
                    `;
                } else if (q.type === 'matching') {
                    return `
                        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" id="card-${q.id}">
                            <p class="font-bold text-xs text-slate-800">${q.text}</p>
                            <div class="space-y-2 text-xs">
                                ${q.pairs.map((p, pIdx) => `
                                    <div class="flex items-center justify-between gap-4 bg-slate-50 p-2 rounded border border-slate-200">
                                        <span>${p.label}</span>
                                        <select id="${q.id}-pair-${pIdx}" class="bg-white border p-1 rounded font-semibold">
                                            ${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                                        </select>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="exp-box hidden text-xs p-3 rounded-lg mt-2 bg-slate-50 border border-slate-200"></div>
                        </div>
                    `;
                }
            }).join('');
        }

        // Evaluate Quiz
        function evaluateQuiz() {
            let score = 0;
            let total = 7;

            // Q1 - Q5 (VF)
            for (let i = 1; i <= 5; i++) {
                const q = quizQuestions[i - 1];
                const selected = document.querySelector(`input[name="${q.id}"]:checked`);
                const card = document.getElementById(`card-${q.id}`);
                const expBox = card.querySelector('.exp-box');
                expBox.classList.remove('hidden');

                if (selected && selected.value === q.correct) {
                    score++;
                    card.className = "bg-emerald-50 p-5 rounded-xl border border-emerald-300 shadow-sm space-y-3";
                    expBox.innerHTML = `<span class="text-emerald-800 font-bold">¡Correcto!</span> ${q.exp}`;
                } else {
                    card.className = "bg-rose-50 p-5 rounded-xl border border-rose-300 shadow-sm space-y-3";
                    expBox.innerHTML = `<span class="text-rose-800 font-bold">Incorrecto.</span> ${q.exp}`;
                }
            }

            // Q6 (Fill)
            const q6 = quizQuestions[5];
            const card6 = document.getElementById(`card-${q6.id}`);
            const expBox6 = card6.querySelector('.exp-box');
            expBox6.classList.remove('hidden');
            let q6Ok = true;
            Object.keys(q6.corrects).forEach(key => {
                if (document.getElementById(`${q6.id}-${key}`).value !== q6.corrects[key]) q6Ok = false;
            });
            if (q6Ok) {
                score++;
                card6.className = "bg-emerald-50 p-5 rounded-xl border border-emerald-300 shadow-sm space-y-3";
                expBox6.innerHTML = `<span class="text-emerald-800 font-bold">¡Correcto!</span> Frase completada a la perfección.`;
            } else {
                card6.className = "bg-rose-50 p-5 rounded-xl border border-rose-300 shadow-sm space-y-3";
                expBox6.innerHTML = `<span class="text-rose-800 font-bold">Incorrecto.</span> El orden correcto es: hilos, sincronizado, instancia, ejecutar, esperar.`;
            }

            // Q7 (Matching)
            const q7 = quizQuestions[6];
            const card7 = document.getElementById(`card-${q7.id}`);
            const expBox7 = card7.querySelector('.exp-box');
            expBox7.classList.remove('hidden');
            let q7Ok = true;
            q7.pairs.forEach((p, pIdx) => {
                if (document.getElementById(`${q7.id}-pair-${pIdx}`).value !== p.correct) q7Ok = false;
            });
            if (q7Ok) {
                score++;
                card7.className = "bg-emerald-50 p-5 rounded-xl border border-emerald-300 shadow-sm space-y-3";
                expBox7.innerHTML = `<span class="text-emerald-800 font-bold">¡Correcto!</span> Todas las parejas coinciden.`;
            } else {
                card7.className = "bg-rose-50 p-5 rounded-xl border border-rose-300 shadow-sm space-y-3";
                expBox7.innerHTML = `<span class="text-rose-800 font-bold">Incorrecto.</span> Revisa los pares de conceptos.`;
            }

            // Show Score
            document.getElementById('quiz-score').classList.remove('hidden');
            document.getElementById('score-val').innerText = `${score} / ${total}`;
        }

        function resetQuiz() {
            renderQuiz();
            document.getElementById('quiz-score').classList.add('hidden');
        }

        // Initialize on Load
        window.onload = function () {
            renderExercises();
            renderQuiz();
        };
    
