package ut1.t11.davidescuderococa;

/**
 *
 * @author alumno
 */
public class PilaFlyers {
    private int flyers;
    private boolean cogiendo;

    public PilaFlyers(int flyersIniciales) {
        this.flyers = flyersIniciales;
        this.cogiendo = false;
    }

    public synchronized boolean cogerFlyer() {

        while (cogiendo) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                System.out.println("ERROR");
            }
        }

        cogiendo = true;

        boolean hayFlyer;

        if (flyers > 0) {
            flyers--;
            hayFlyer = true;
        } else {
            hayFlyer = false;
        }

        cogiendo = false;

        return hayFlyer;
    }

    public int getFlyersRestantes() {
        return flyers;
    }
}