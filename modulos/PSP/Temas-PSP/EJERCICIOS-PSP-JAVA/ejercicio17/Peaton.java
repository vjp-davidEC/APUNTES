package davidescuderococa_ut1.tarea17;

/**
 *
 * @author DAVID
 */
public class Peaton extends Thread{
    private String nombre;
    private Puente puente;

    public Peaton(String nombre, Puente puente) {
        this.nombre = nombre;
        this.puente = puente;
    }
    
    public void run() {
        for (int i = 0; i < 5; i++) {
            int valor = puente.get(nombre);
            
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
            
            puente.salirPeaton(nombre);
            
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
    }
}