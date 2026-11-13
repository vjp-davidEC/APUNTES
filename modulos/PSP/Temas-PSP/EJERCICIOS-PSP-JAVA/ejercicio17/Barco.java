package davidescuderococa_ut1.tarea17;

/**
 *
 * @author DAVID
 */
public class Barco extends Thread{
    private String nombre;
    private Puente puente;

    public Barco(String nombre, Puente puente) {
        this.nombre = nombre;
        this.puente = puente;
    }
    
    public void run() {
        for (int i = 0; i < 5; i++) {
            try {
                sleep(2000);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
            
            puente.put(nombre);
            
            try {
                sleep(1500);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
            
            puente.salirBarco(nombre);
        }
    }
}