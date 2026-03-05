public class IntegerDivision {
    public static void main(String[] args) {
        int a = 5;
        int b = 2;
        double result = a / b; // BUG: result is 2.0, should be 2.5
        System.out.println("Result: " + result);
    }
}
