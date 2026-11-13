package prueba03;

/**
 *
 * @author alumno
 */
public class Productor extends Thread {
    private Cola cola;

    public Productor(Cola cola) {
        this.cola = cola;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            cola.put(i);
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
    }
}