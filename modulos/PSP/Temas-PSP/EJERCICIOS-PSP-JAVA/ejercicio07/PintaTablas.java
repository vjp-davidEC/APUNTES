package tarea07;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author alumno
 */
public class PintaTablas extends Thread{
    private int numero;

    public PintaTablas(int numero) {
        this.numero = numero;
    }
    
    public PintaTablas() {
        numero = 0;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }
    
    @Override
    public void run() {
        String rutaCarpeta = "TABLAS";
        File carpeta = new File(rutaCarpeta);
        
        if (!carpeta.exists()) {
            carpeta.mkdir();
        }
        
        String nombreFichero = rutaCarpeta + "/" + numero + ".txt";
        
        PrintWriter pw = null;
        
        try {
            pw = new PrintWriter(new FileWriter(nombreFichero));
            pw.println("La tabla del " + numero + " es:");
            pw.println("-----------------------\n");
            
            for (int i = 0; i <= 10; i++) {
                pw.println(numero + " x " + i  + " = " + (numero * i));
            }
        } catch (IOException e) {
            System.out.println("ERROR-1");
        } finally {
            if (pw != null) {
                pw.close();
            }
        }
    }
}