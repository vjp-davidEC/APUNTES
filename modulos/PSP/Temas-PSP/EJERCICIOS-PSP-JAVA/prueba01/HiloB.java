package prueba;

import static java.lang.Thread.sleep;

/**
 *
 * @author alumno
 */
public class HiloB implements Runnable{
    @Override
    public void run() {
        
        for(int i = 0; i < 100; i++) {
            System.out.println("Hola, soy el HiloA");
        
            try {
                sleep(1000);
            } catch(InterruptedException e) {
                e.printStackTrace();
            }
            
            System.out.println("Se te ha acabado el tiempo");
        }
    }
}