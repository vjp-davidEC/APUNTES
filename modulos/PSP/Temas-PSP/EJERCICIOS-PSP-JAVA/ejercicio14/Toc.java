package davidescuderococa_ut1.tarea14;

/**
 *
 * @author alumno
 */
public class Toc extends Thread {
    private Token token;

    public Toc(Token token) {
        this.token = token;
    }

    @Override
    public void run() {
        while (true) {
            int valor = token.get(3, "TOC");
            
            try {
                sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}