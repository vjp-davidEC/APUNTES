package ejercicio01;

/**
 *
 * @author alumno
 */
public class Reloj {
    public static void main(String[] args) {
        Hora hora = new Hora();
        Sonido sonido = new Sonido();
        Aviso aviso = new Aviso();

        hora.start();
        sonido.start();
        aviso.start();
    }
}