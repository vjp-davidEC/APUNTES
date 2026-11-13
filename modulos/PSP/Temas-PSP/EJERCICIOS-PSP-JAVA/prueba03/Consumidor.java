package prueba03;

/**
 *
 * @author alumno
 */
public class Consumidor extends Thread {
    private Cola cola;

    public Consumidor(Cola cola) {
        this.cola = cola;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            int valor = cola.get();
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
    }
}