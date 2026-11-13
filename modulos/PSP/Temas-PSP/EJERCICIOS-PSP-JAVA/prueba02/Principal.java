/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package prueba2;

/**
 *
 * @author alumno
 */
public class Principal {
    public static void main(String[] args) {
        Cuenta cuenta = new Cuenta(50);
        Persona ana = new Persona("Ana", cuenta);
        Persona juan = new Persona("Juan", cuenta);
        ana.start();
        juan.start();
    }
}