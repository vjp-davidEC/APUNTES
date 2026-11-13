package ut1.t9.davidescuderococa;

/**
 *
 * @author alumno
 */
public class UT1T9DavidEscuderoCoca {
    public static void main(String[] args) {
        Puente puente = new Puente();

        Coche c0 = new Coche("El coche-0", puente);
        Coche c1 = new Coche("El coche-1", puente);
        Coche c2 = new Coche("El coche-2", puente);
        Coche c3 = new Coche("El coche-3", puente);

        c0.start();
        c1.start();
        c2.start();
        c3.start();

        try {
            c0.join();
            c1.join();
            c2.join();
            c3.join();
        } catch (InterruptedException e) {
            System.out.println("ERROR");
        }

        System.out.println("Todos los coches han llegado a su destino");
    }
}