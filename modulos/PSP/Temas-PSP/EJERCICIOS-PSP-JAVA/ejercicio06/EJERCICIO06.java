package ejercicio06;

/**
 *
 * @author alumno
 */
public class EJERCICIO06 {
        public static void main(String[] args) {
        CorredorAnimal tortuga = new CorredorAnimal("Tortuga");
        CorredorAnimal liebre  = new CorredorAnimal("Liebre");
        CorredorAnimal guepardo = new CorredorAnimal("Guepardo");

        tortuga.setPriority(Thread.MIN_PRIORITY);
        liebre.setPriority(Thread.NORM_PRIORITY);
        guepardo.setPriority(Thread.MAX_PRIORITY);

        tortuga.start();
        liebre.start();
        guepardo.start();
    }
}