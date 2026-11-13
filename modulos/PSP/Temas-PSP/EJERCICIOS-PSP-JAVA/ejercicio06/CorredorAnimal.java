package ejercicio06;

/**
 *
 * @author alumno
 */
public class CorredorAnimal extends Thread {

    public CorredorAnimal(String nombre) {
        super(nombre);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName());
            try {
                sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(">>> " + getName() + " HA LLEGADO A LA META <<<");
    }
}