package ejercicio05;

/**
 *
 * @author alumno
 */
public class EJERCICIO05 {
        public static void main(String[] args) {
        PintaDiezVeces h1 = new PintaDiezVeces("Hilo A");
        PintaDiezVeces h2 = new PintaDiezVeces("Hilo B");
        PintaDiezVeces h3 = new PintaDiezVeces("Hilo C");
        PintaDiezVeces h4 = new PintaDiezVeces("Hilo D");
        PintaDiezVeces h5 = new PintaDiezVeces("Hilo E");

        h1.start();
        h2.start();
        h3.start();
        h4.start();
        h5.start();
    }
}