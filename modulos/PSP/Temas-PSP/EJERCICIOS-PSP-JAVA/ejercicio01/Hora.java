package ejercicio01;

import java.time.LocalDateTime;

/**
 *
 * @author alumno
 */
public class Hora extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(LocalDateTime.now().toString());
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}