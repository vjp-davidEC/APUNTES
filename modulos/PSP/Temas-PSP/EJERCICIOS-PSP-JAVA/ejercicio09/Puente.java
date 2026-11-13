package ut1.t9.davidescuderococa;

/**
 *
 * @author alumno
 */
public class Puente {
    synchronized public void cruzar(int kmInicio, int kmFin, String nombreCoche) {
        for (int km = kmInicio; km <= kmFin; km++) {
            System.out.println("    ***" + nombreCoche + " esta atravesando el km " + km + " del puente");
            
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
    }
}