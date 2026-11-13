package davidescuderococa_ut1.tarea14;

/**
 *
 * @author alumno
 */
public class Tac extends Thread {
    private Token token;

    public Tac(Token token) {
        this.token = token;
    }

    @Override
    public void run() {
        while (true) {
            int valor = token.get(2, "TAC");
            
            try {
                sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}