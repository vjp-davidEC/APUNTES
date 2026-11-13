package davidescuderococa_ut1.tarea14;

/**
 *
 * @author alumno
 */
public class Token {
    private int turno = 1;

    public synchronized int get(int idHilo, String sonido) {

        while (this.turno != idHilo) {
            try {
                wait();
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }

        System.out.println(sonido);

        if (this.turno == 3) {
            this.turno = 1;
        } else {
            this.turno++;
        }

        notifyAll();

        return this.turno;
    }
}