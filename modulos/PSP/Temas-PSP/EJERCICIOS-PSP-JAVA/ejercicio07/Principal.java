package tarea07;

import java.util.Scanner;

/**
 *
 * @author alumno
 */
public class Principal {
    public static void main(String[] args) {
        int opcion;
        
        do {
            mostrarMenu();
            opcion = pedirOpcion();
            
            switch (opcion) {
                case 0 -> GeneradorTablas.generarTabla();
                case 1 -> System.out.println("Fin del programa");
                default -> System.out.println("Error: Debe ser el 0 o el 1");
            }
        } while (opcion != 1);
    }
    
    public static void mostrarMenu() {
        System.out.println("--------------");
        System.out.println("Opciones:");
        System.out.println(" - 0: Generar una tabla:");
        System.out.println(" - 1: Salir");
        System.out.print("Introduce una opcion: ");
    }
    
    
    public static int pedirOpcion() {
        Scanner entrada = new Scanner(System.in);
        return entrada.nextInt();
    }
}
