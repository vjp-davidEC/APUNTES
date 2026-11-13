package ut1.t9.davidescuderococa;

/**
 *
 * @author alumno
 */
public class Coche extends Thread {
    private String nombre;
    private Puente puente;

    public Coche(String nombre, Puente puente) {
        this.nombre = nombre;
        this.puente = puente;
    }

    @Override
    public void run() {
        for (int km = 1; km <= 5; km++) {
            System.out.println(nombre + " va por el km" + km + " de la carretera");
            try {
                sleep(200);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }

        puente.cruzar(6, 9, nombre);

        for (int km = 10; km <= 12; km++) {
            System.out.println(nombre + " va por el km" + km + " de la carretera");
            try {
                sleep(200);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }

        System.out.println(nombre + " ha llegado a Malpartida de Plasencia");
    }
}