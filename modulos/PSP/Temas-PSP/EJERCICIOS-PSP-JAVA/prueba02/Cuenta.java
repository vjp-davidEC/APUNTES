package prueba2;

/**
 *
 * @author alumno
 */
public class Cuenta {

    private double saldo;

    public Cuenta(double saldo) {
        this.saldo = saldo;
    }

    public double getSaldo() {
        return saldo;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    public void retirar(double cantidad, String persona) {
        if (getSaldo() >= cantidad) {
            //Hay suficiente saldo
            System.out.println("Se va a retirar dinero. El saldo actual es de: "
                    + getSaldo() + "€");

            saldo = saldo - cantidad;
            System.out.println(persona + " retira " + cantidad +" €. (Saldo actual: "+ getSaldo()+"€)");
        } else {
            //no hay suficiente saldo
            System.out.println(persona + " no puede retirar " + cantidad + " € porque el saldo actual es insuficiente: "+ getSaldo()+"€");
        }
        if (getSaldo() < 0) {
            System.out.println("SALDO NEGATIVO:" + getSaldo());
        }
    }
}
