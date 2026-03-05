public class MethodOverloading {
    static void display(int i) {
        System.out.println("Integer: " + i);
    }

    static void display(double d) {
        System.out.println("Double: " + d);
    }

    public static void main(String[] args) {
        display(10.5); // Double: 10.5
        display(10); // Integer: 10
    }
}
