package ejercicio02;

/**
 *
 * @author alumno
 */
public class Tac extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println("TAC");
            try {
                sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}