package davidescuderococa_ut1.tarea14;

/**
 *
 * @author alumno
 */
public class Tic extends Thread {
    private Token token;

    public Tic(Token token) {
        this.token = token;
    }

    @Override
    public void run() {
        while (true) {
            int valor = token.get(1, "TIC");
            
            try {
                sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}