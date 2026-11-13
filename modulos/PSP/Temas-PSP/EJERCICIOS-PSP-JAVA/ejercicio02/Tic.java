package ejercicio02;

/**
 *
 * @author alumno
 */
public class Tic extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println("TIC");
            try {
                sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}