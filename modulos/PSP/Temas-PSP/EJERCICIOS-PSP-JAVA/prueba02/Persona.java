package prueba2;

/**
 *
 * @author alumno
 */
public class Persona extends Thread {

    private String nombre;
    private Cuenta cuenta;

    public Persona(String nombre, Cuenta cuenta) {
        this.nombre = nombre;
        this.cuenta = cuenta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void run() {
        for (int i = 0; i < 4; i++) {
            this.cuenta.retirar(10, getNombre());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}
