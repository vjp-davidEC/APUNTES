package ejercicio01;

/**
 *
 * @author alumno
 */
public class Aviso extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 2; i++) {
            System.out.println("Se te está acabando el tiempo");
            try {
                sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}