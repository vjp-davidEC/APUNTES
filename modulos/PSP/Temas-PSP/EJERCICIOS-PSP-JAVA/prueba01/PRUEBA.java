/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package prueba;

/**
 *
 * @author alumno
 */
public class PRUEBA {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        HiloA hiloa = new HiloA();
        HiloB hilob = new HiloB();
        
        Thread h1 = new Thread(hiloa);
        Thread h2 = new Thread(hilob);
        
        h1.start();
        h2.start();
    }
}