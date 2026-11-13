package davidescuderococa_ut1.tarea17;

/**
 *
 * @author DAVID
 */
public class Puente {
    private int peatonesDentro = 0;
    private boolean barcoQuierePasar = false;
    private boolean barcoCruza = false;
    
    public synchronized int get(String nombre) {
        while (barcoQuierePasar || barcoCruza) {
            try {
                wait();
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
        
        peatonesDentro++;
        System.out.println("Entra " + nombre + " por el puente. Hay " + peatonesDentro);
        System.out.println("    " + nombre + " esta en el puente");
        
        return peatonesDentro;
    }
    
    public synchronized void salirPeaton(String nombre) {
        peatonesDentro--;
        
        System.out.println("        =>Sale " + nombre + " del puente. Quedan " + peatonesDentro);
        
        if (peatonesDentro == 0) {
            notifyAll();
        }
    }
    
    public synchronized void put(String nombreBarco) {
        barcoQuierePasar = true;
        System.out.println("****************BARCO QUIERE PASAR****************");
        
        while (peatonesDentro > 0) {
            try {
                wait();
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }
        
        barcoCruza = true;
        barcoQuierePasar = false;
        System.out.println("    " + nombreBarco + " esta cruzando....<_P_>");
    }
    
    public synchronized void salirBarco(String nombreBarco) {
        barcoCruza = false;
        System.out.println("        El barco " + nombreBarco + " salio del puente");
        
        notifyAll();
    }
}