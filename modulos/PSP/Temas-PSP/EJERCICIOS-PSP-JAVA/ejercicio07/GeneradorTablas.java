package tarea07;

import java.util.Scanner;

/**
 *
 * @author alumno
 */
public class GeneradorTablas {    
    public static void generarTabla() {
        try {
            int numero = pedirNumero();
            
            PintaTablas pintaTablas = new PintaTablas(numero);
            pintaTablas.start();
        } catch (NumberFormatException e) {
            System.out.println("ERROR-1");
        }
    }
    
    public static int pedirNumero() {
        Scanner entrada = new Scanner(System.in);
        System.out.print("Introduce el numero del cual quieres generar la tabla: ");
        return entrada.nextInt();
    }
}