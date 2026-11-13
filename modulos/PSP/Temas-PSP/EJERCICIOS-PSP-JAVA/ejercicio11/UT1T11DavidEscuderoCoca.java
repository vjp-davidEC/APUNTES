package ut1.t11.davidescuderococa;

/**
 *
 * @author alumno
 */
public class UT1T11DavidEscuderoCoca {
    public static void main(String[] args) {

        PilaFlyers pila = new PilaFlyers(1000);

        Repartidor juan  = new Repartidor("Juan",  pila);
        Repartidor marta = new Repartidor("Marta", pila);
        Repartidor pedro = new Repartidor("Pedro", pila);
        Repartidor maria = new Repartidor("Maria", pila);
        Repartidor lucia = new Repartidor("Lucia", pila);

        juan.start();
        marta.start();
        pedro.start();
        maria.start();
        lucia.start();

        try {
            juan.join();
            marta.join();
            pedro.join();
            maria.join();
            lucia.join();
        } catch (InterruptedException e) {
            System.out.println("ERROR");
        }

        int sumaTotal = juan.getRepartidos() + marta.getRepartidos() + pedro.getRepartidos() + maria.getRepartidos() + lucia.getRepartidos();

        System.out.println("La suma de repartidos entre todos es: " + sumaTotal);
        System.out.println("Al final quedan " + pila.getFlyersRestantes() + " flyers");
    }
}