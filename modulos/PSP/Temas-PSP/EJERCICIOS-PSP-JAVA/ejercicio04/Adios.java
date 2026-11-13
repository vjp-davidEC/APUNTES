package ejercicio04;

/**
 *
 * @author alumno
 */
public class Adios implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("ADIÓS");
        }
    }
}