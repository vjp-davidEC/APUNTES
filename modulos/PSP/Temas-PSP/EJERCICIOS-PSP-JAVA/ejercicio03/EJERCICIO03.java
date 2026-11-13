package ejercicio03;

/**
 *
 * @author alumno
 */
public class EJERCICIO03 {
        public static void main(String[] args) {
        Hora hora = new Hora();
        Sonido sonido = new Sonido();

        Thread thHora = new Thread(hora);
        Thread thSonido = new Thread(sonido);

        thHora.start();
        thSonido.start();
    }
}