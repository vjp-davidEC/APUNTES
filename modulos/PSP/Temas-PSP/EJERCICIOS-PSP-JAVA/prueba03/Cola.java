package prueba03;

/**
 *
 * @author alumno
 */
public class Cola {
    private int numero;
    private boolean disponible = false;

    public synchronized void put(int valor) {
        while (disponible) {
            try {
                wait();
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
        numero = valor;
        disponible = true;
        System.out.println("=> Productor produce: " + valor);
        notifyAll();
    }

    public synchronized int get() {
        while (!disponible) {
            try {
                wait();
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
        disponible = false;
        System.out.println("<== Consumidor consume: " + numero);
        notifyAll();
        return numero;
    }
}