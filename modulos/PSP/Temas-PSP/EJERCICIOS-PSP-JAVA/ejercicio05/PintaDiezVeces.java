package ejercicio05;

/**
 *
 * @author alumno
 */
public class PintaDiezVeces extends Thread {
    private String cadena;

    public PintaDiezVeces(String cadena) {
        this.cadena = cadena;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(
                cadena +
                " | ID: " + getId() +
                " | Nombre: " + getName() +
                " | Prioridad: " + getPriority()
            );
        }
    }
}