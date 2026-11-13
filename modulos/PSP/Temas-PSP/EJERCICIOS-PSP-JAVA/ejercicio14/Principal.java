package davidescuderococa_ut1.tarea14;

/**
 *
 * @author alumno
 */
public class Principal {
    public static void main(String[] args) {
        Token token = new Token();
        
        Tic hiloTic = new Tic(token);
        Tac hiloTac = new Tac(token);
        Toc hiloToc = new Toc(token);

        hiloTic.start();
        hiloTac.start();
        hiloToc.start();
    }
}