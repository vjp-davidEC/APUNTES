package davidescuderococa_ut1.tarea17;

/**
 *
 * @author DAVID
 */
public class Principal {
    public static void main(String[] args) {
        Puente puente = new Puente();
        
        Peaton p1 = new Peaton("Maria", puente);
        Peaton p2 = new Peaton("Ana", puente);
        Peaton p3 = new Peaton("Marcos", puente);
        Peaton p4 = new Peaton("Juan", puente);
        Peaton p5 = new Peaton("Pedro", puente);
        
        Barco barco = new Barco("Titanic", puente);
        
        p1.start();
        p2.start();
        p3.start();
        p4.start();
        p5.start();
        barco.start();
    }
}