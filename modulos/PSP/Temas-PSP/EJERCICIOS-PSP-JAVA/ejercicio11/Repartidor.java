package ut1.t11.davidescuderococa;


/**
 *
 * @author alumno
 */
public class Repartidor extends Thread {
    private String nombre;
    private PilaFlyers pila;
    private int repartidos;

    public Repartidor(String nombre, PilaFlyers pila) {
        this.nombre = nombre;
        this.pila = pila;
        this.repartidos = 0;
    }

    @Override
    public void run() {
        while (pila.cogerFlyer()) {
            repartidos++;
            try {
                sleep(1);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
        System.out.println("El repartidor " + nombre + " ha repartido " + repartidos + " flyers");
    }

    public int getRepartidos() {
        return repartidos;
    }

    public String getNombre() {
        return nombre;
    }
}