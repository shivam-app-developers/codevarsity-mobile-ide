interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}

public class InterfaceImplementation {
    public static void main(String[] args) {
        Drawable d = new Circle();
        d.draw();
    }
}
