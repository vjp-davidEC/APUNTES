package ejercicio04;

/**
 *
 * @author alumno
 */
public class EJERCICIO04 {
    public static void main(String[] args) {
        Hola hola = new Hola();
        Adios adios = new Adios();

        Thread th1 = new Thread(hola);
        Thread th2 = new Thread(adios);

        th1.start();
        th2.start();
    }
}